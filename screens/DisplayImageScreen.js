import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import { Base_url1 } from './baseUrl';
import Slider from '@react-native-community/slider';

const DisplayImageScreen = ({ route, navigation }) => {
    const { imageUri } = route.params;
    const [extractedText, setExtractedText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
    const [topicModalVisible, setTopicModalVisible] = useState(false);
    const [isSpeechFinished, setIsSpeechFinished] = useState(false);
    const [topicName, setTopicName] = useState('')
    const [isQuizModalVisible, setIsQuizModalVisible] = useState(false); // State for quiz modal
    const [nouns, setNouns] = useState(''); // State for storing nouns
    const [verbs, setVerbs] = useState(''); // State for storing verbs
    const [loading, setLoading] = useState(false); // Loading state for progress
    const [speechRate, setSpeechRate] = useState(1.0);

    // Handle Submit button press
    const handleSubmit = async () => {
        if (!imageUri) {
            Alert.alert('No Image Selected', 'Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'uploaded_image.jpg',
        });

        try {
            setLoading(true); // Start the loading spinner
            const response = await fetch(Base_url1 + "/blind/readText", {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();
            console.log('API Response:', result);
            if (response.ok) {
                setExtractedText(result.extracted_text);
                setNouns(result.nouns); // Set nouns from the API response
                setVerbs(result.verbs); // Set verbs from the API response
                setIsModalVisible(true);
            } else {
                Alert.alert('Error', 'Failed to submit image.');
            }
        } catch (error) {
            console.error('Error submitting the image:', error);
            Alert.alert('Error', 'Something went wrong while submitting the image.');
        } finally {
            setLoading(false); // Stop the loading spinner
        }
    };

    // Handle Retake button press
    const handleRetake = () => {
        navigation.goBack();
    };

    const handleViewSavedText = () => {
        navigation.navigate('SavedText');
    };

    // Handle Play button press
    const handlePlay = () => {
        if (extractedText) {
            Speech.speak(extractedText, {
                rate: speechRate,
                onDone: () => {
                    setIsSpeaking(false);
                    setIsSpeechFinished(true);
                },
            });
            setIsSpeaking(true);
            setIsSpeechFinished(false);
        }
    };

    // Handle Pause button press
    const handlePause = () => {
        Speech.stop();
        setIsSpeaking(false);
    };

    const handleSave = async () => {
        if (!topicName.trim()) {
            Alert.alert('Error', 'Please enter a topic name before saving.');
            return;
        }

        try {
            const newEntry = { topic: topicName, text: extractedText };

            // Fetch the existing texts from AsyncStorage
            const existingTexts = await AsyncStorage.getItem('extractedTexts');
            let textsArray = existingTexts ? JSON.parse(existingTexts) : [];

            // Add the new entry with topic name to the array
            textsArray.push(newEntry);

            // Save the updated array to AsyncStorage
            await AsyncStorage.setItem('extractedTexts', JSON.stringify(textsArray));

            Alert.alert('Saved', 'Text saved successfully with topic name!');
            setTopicName(''); // Clear topic name input
        } catch (error) {
            console.error('Error saving text:', error);
            Alert.alert('Error', 'Failed to save text.');
        }
        setTopicModalVisible(false); // Close the topic input modal
        setIsOptionsModalVisible(false);
    };


    // Handle "Start the Quiz" button press
    const handleStartQuiz = () => {
        navigation.navigate('LessonQuiz', {
            nouns: nouns, // Pass nouns as a parameter
            verbs: verbs, // Pass verbs as a parameter
        });
    };


    // Handle Quiz Submission
    const handleSubmitQuiz = () => {
        Alert.alert('Quiz Submitted', `Nouns: ${nouns}\nVerbs: ${verbs}`);
        setIsQuizModalVisible(false); // Close quiz modal after submission
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan a lesson to listen</Text>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.selectedImage} />
            ) : (
                <Text>No image selected</Text>
            )}

            {/* Buttons for Submit and Retake */}
            <View style={styles.buttonContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#FFA500" />
                ) : (
                    <>
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                            <Text style={styles.retakeButtonText}>Retake</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* Modal for displaying extracted text */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.threeDotButton}
                            onPress={() => setIsOptionsModalVisible(true)}
                        >
                            <Entypo name="dots-three-vertical" size={24} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Extracted Text</Text>
                        <ScrollView>
                            <Text style={styles.extractedText}>{extractedText}</Text>
                        </ScrollView>

                        {/* Speech Speed Slider */}
                        <View style={styles.sliderContainer}>
                            <Text style={styles.sliderLabel}>Speech Speed: {speechRate.toFixed(1)}x</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0.5}
                                maximumValue={2.0}
                                value={speechRate}
                                onValueChange={(value) => setSpeechRate(value)}
                                minimumTrackTintColor="#FFA500"
                                maximumTrackTintColor="#000"
                                thumbTintColor="#FFA500"
                                step={0.1}
                            />
                        </View>

                        {/* Play and Pause buttons */}
                        <View style={styles.audioControls}>
                            {isSpeaking ? (
                                <TouchableOpacity onPress={handlePause}>
                                    <Icon name="pause" size={40} color="#FFA500" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handlePlay}>
                                    <Icon name="play" size={40} color="#FFA500" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {/* Start Quiz Button */}
                        <TouchableOpacity
                            style={[styles.startQuizButton, { opacity: isSpeechFinished ? 1 : 0.5 }]}
                            disabled={!isSpeechFinished}
                            onPress={handleStartQuiz}
                        >
                            <Text style={styles.startQuizButtonText}>Start the Quiz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                setIsModalVisible(false);
                                Speech.stop();
                            }}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for Save with Topic Name */}
            <Modal
                visible={topicModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setTopicModalVisible(false)}
            >
                <View style={styles.optionsModalContainer}>
                    <View style={styles.optionsModalContent}>
                        <Text style={styles.optionText}>Enter Topic Name:</Text>
                        <TextInput
                            style={styles.input}
                            value={topicName}
                            onChangeText={(text) => setTopicName(text)}
                            placeholder="Topic name"
                        />
                        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                            <Text style={styles.optionText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTopicModalVisible(false)}>
                            <Text style={styles.optionText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Options Modal */}
            <Modal
                visible={isOptionsModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsOptionsModalVisible(false)}
            >
                <View style={styles.optionsModalContainer}>
                    <View style={styles.optionsModalContent}>
                        <TouchableOpacity onPress={() => setTopicModalVisible(true)}>
                            <Text style={styles.optionText}>Save with Topic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsOptionsModalVisible(false)}>
                            <Text style={styles.optionText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A5AE0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    selectedImage: {
        width: 300,
        height: 400,
        borderRadius: 15,
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    submitButton: {
        width: '90%',
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    retakeButton: {
        width: '90%',
        backgroundColor: '#A389F4',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    retakeButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    extractedText: {
        fontSize: 16,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    audioControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    threeDotButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    optionsModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionsModalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    startQuizButton: {
        width: '90%',
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
    },
    startQuizButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quizModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    quizModalContent: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    quizTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    submitQuizButton: {
        width: '90%',
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    submitQuizButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sliderContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    sliderLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    slider: {
        width: '90%',
        height: 40,
    },
    viewSavedButton: {
        width: '90%',
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
    },
    viewSavedButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        padding: 10,
    },

});

export default DisplayImageScreen;