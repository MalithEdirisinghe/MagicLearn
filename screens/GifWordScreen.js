import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Button, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { Base_url2 } from './baseUrl'

const GifWordScreen = () => {

    const [imageUri, setImageUri] = useState();
    const [imageCaptured, setImageCaptured] = useState(false);
    const [showCorrectModal, setShowCorrectModal] = useState(false);
    const [showIncorrectModal, setShowIncorrectModal] = useState(false);
    const [currentGifIndex, setCurrentGifIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);

    const gifData = [
        { path: require('../assets/GIF/aunt.gif'), name: 'Aunt' },
        { path: require('../assets/GIF/brother.gif'), name: 'Brother' },
        { path: require('../assets/GIF/baby sister.gif'), name: 'Baby Sister' },
        { path: require('../assets/GIF/Beautiful.gif'), name: 'Beautiful' },
        { path: require('../assets/GIF/black.gif'), name: 'Black' },
        { path: require('../assets/GIF/blue.gif'), name: 'Blue' },
        { path: require('../assets/GIF/brown.gif'), name: 'Brown' },
        { path: require('../assets/GIF/children.gif'), name: 'Children' },
        { path: require('../assets/GIF/cold.gif'), name: 'Cold' },
        { path: require('../assets/GIF/daughter.gif'), name: 'Daughter' },
        { path: require('../assets/GIF/day.gif'), name: 'Day' },
        { path: require('../assets/GIF/wednesday.gif'), name: 'Wednesday' },
        { path: require('../assets/GIF/tuesday.gif'), name: 'Tuesday' },
        { path: require('../assets/GIF/tomorrow.gif'), name: 'Tomorrow' },
        { path: require('../assets/GIF/today.gif'), name: 'Today' },
        { path: require('../assets/GIF/sunday.gif'), name: 'Sunday' },
        { path: require('../assets/GIF/sun.gif'), name: 'Sun' },
        { path: require('../assets/GIF/spring(season).gif'), name: 'Spring (Season)' },
        { path: require('../assets/GIF/son.gif'), name: 'Son' },
        { path: require('../assets/GIF/sister.gif'), name: 'Sister' },
        { path: require('../assets/GIF/siblings.gif'), name: 'Siblings' },
        { path: require('../assets/GIF/saturday.gif'), name: 'Saturday' },
        { path: require('../assets/GIF/red.gif'), name: 'Red' },
        { path: require('../assets/GIF/rainbow.gif'), name: 'Rainbow' },
        { path: require('../assets/GIF/rain.gif'), name: 'Rain' },
        { path: require('../assets/GIF/pink.gif'), name: 'Pink' },
        { path: require('../assets/GIF/orange.gif'), name: 'Orange' },
        { path: require('../assets/GIF/movie.gif'), name: 'Movie' },
        { path: require('../assets/GIF/mother.gif'), name: 'Mother' },
        { path: require('../assets/GIF/love.gif'), name: 'Love' },
        { path: require('../assets/GIF/lipstick.gif'), name: 'Lipstick' },
        { path: require('../assets/GIF/late.gif'), name: 'Late' },
        { path: require('../assets/GIF/january.gif'), name: 'January' },
        { path: require('../assets/GIF/hot.gif'), name: 'Hot' },
        { path: require('../assets/GIF/home.gif'), name: 'Home' },
        { path: require('../assets/GIF/green.gif'), name: 'Green' },
        { path: require('../assets/GIF/friday.gif'), name: 'Friday' },
        { path: require('../assets/GIF/father.gif'), name: 'Father' },
        { path: require('../assets/GIF/family.gif'), name: 'Family' },
        { path: require('../assets/GIF/everyday.gif'), name: 'Everyday' },
    ];

    const levels = [
        gifData.slice(0, 10),
        gifData.slice(10, 20),
        gifData.slice(20, 30),
        gifData.slice(30, 40),
    ];

    const questionsForCurrentLevel = levels[currentLevel - 1];

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'You need to grant camera permission to use this feature.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setImageCaptured(true);
        } else {
            console.log('Image capture canceled');
        }
    };

    const handleRetake = () => {
        setImageUri(null);
        setImageCaptured(false);
    };
    const handleNext = () => {
        handleSkip();
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                name: 'image.jpg',
                type: 'image/jpg',
            });
            formData.append('actual_text', questionsForCurrentLevel[currentGifIndex].name); // Include actual text

            const response = await fetch(Base_url2 + '/deaf/extractedText', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                const currentGifName = questionsForCurrentLevel[currentGifIndex].name;
                const apiResponse = responseData.extracted_text;
                console.log('api response: ', apiResponse);
                console.log('current: ', currentGifName);

                if (currentGifName.toLocaleLowerCase() === apiResponse) {
                // if (currentGifName === currentGifName) {
                    setShowCorrectModal(true);
                    setShowIncorrectModal(false);
                } else {
                    setShowIncorrectModal(true);
                    setShowCorrectModal(false);
                }
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error.message);
            Alert.alert('Error', 'Failed to submit image. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        if (currentGifIndex < 9) {
            // Move to the next question within the same level
            setCurrentGifIndex(currentGifIndex + 1);
        } else {
            // Move to the next level if all 10 questions in the current level are completed
            if (currentLevel < 4) {
                setCurrentLevel(currentLevel + 1);
                setCurrentGifIndex(0); // Reset to first question of the next level
                Alert.alert('Next Level', `You have advanced to Level ${currentLevel + 1}`);
            } else {
                Alert.alert('Congratulations!', 'You have completed all levels!');
            }
        }
        setImageUri(null);
        setImageCaptured(false);
    };

    const handleCloseCorrectModal = () => {
        setShowCorrectModal(false);
        setImageUri(null);
        setImageCaptured(false); // Reset image state

        if (currentGifIndex < 9) {
            // Move to the next question within the same level
            setCurrentGifIndex(currentGifIndex + 1);
        } else {
            // Move to the next level if all 10 questions in the current level are completed
            if (currentLevel < 4) {
                setCurrentLevel(currentLevel + 1);
                setCurrentGifIndex(0); // Reset to the first question of the next level
                Alert.alert('Next Level', `You have advanced to Level ${currentLevel + 1}`);
            } else {
                Alert.alert('Congratulations!', 'You have completed all levels!');
            }
        }
    };


    const handleCloseIncorrectModal = () => {
        setShowIncorrectModal(false);
        handleRetake(); // Retake image after showing incorrect answer
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.levelText}>Level {currentLevel}</Text>
                {/* Progress bar */}
                <View style={styles.progressBarContainer}>
                    <Text style={styles.questionText}>Question {currentGifIndex + 1}</Text>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progress,
                                { width: `${((currentGifIndex + 1) / 10) * 100}%` }, // Updated calculation
                            ]}
                        ></View>
                    </View>
                </View>

                {/* GIF/Sign Image */}
                <View style={styles.signContainer}>
                    <Text style={styles.signLabel}>Write the Correct word</Text>
                    <Image
                        source={imageUri ? { uri: imageUri } : gifData[currentGifIndex].path}
                        style={imageUri ? styles.capturedImage : styles.gifImage}
                    />
                </View>

                {!imageCaptured && (
                    <>
                        {/* Instructions */}
                        <View style={styles.instructionsContainer}>
                            <Text style={styles.instructionsTitle}>Instructions</Text>
                            <Text style={styles.instructions}>
                                1. Watch GIF: Observe the sign language GIF to understand the word.{'\n\n'}
                                2. Write Word: Write the corresponding English word on paper, clearly and legibly.{'\n\n'}
                                3. Take Photo: Use your camera to capture a clear image of the written word.{'\n\n'}
                                4. Upload Photo: Click "Capture" and upload the photo to submit.{'\n\n'}
                                5. Receive Feedback: The app will check your answer and provide feedback on correctness.
                            </Text>
                        </View>

                        {/* Capture Button */}
                        <TouchableOpacity style={styles.captureButton} onPress={openCamera}>
                            <Text style={styles.captureButtonText}>Capture</Text>
                        </TouchableOpacity>

                        {/* Skip Button */}
                        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                            <Text style={styles.skipButtonText}>Skip</Text>
                        </TouchableOpacity>
                    </>
                )}

                {imageCaptured && (
                    <>
                        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                            <Text style={styles.captureButtonText}>Retake</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
                            ) : (
                                <Text style={styles.captureButtonText}>Submit Image</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.retakeButton} onPress={handleNext}>
                            <Text style={styles.captureButtonText}>Next</Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* Success Modal */}
                <Modal isVisible={showCorrectModal}>
                    <View style={styles.modalContainer}>
                        <Image source={require('../assets/correct.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitleCorrect}>Your answer is correct!</Text>
                        <TouchableOpacity style={styles.okButton} onPress={handleCloseCorrectModal}>
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* Incorrect Modal */}
                <Modal isVisible={showIncorrectModal}>
                    <View style={styles.modalContainer}>
                        <Image source={require('../assets/incorrect_check.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Incorrect Answer</Text>
                        <Text style={styles.modalMessage}>
                            Your answer does not match the GIF. Please try again.
                        </Text>
                        <TouchableOpacity style={styles.retryButton} onPress={handleCloseIncorrectModal}>
                            <Text style={styles.retryButtonText}>TRY AGAIN</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#EFEAFF',
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#EFEAFF',
        padding: 20,
    },
    levelText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    progressBar: {
        flex: 2,
        height: 8,
        backgroundColor: '#D3D3D3',
        borderRadius: 5,
        marginLeft: 10,
    },
    progress: {
        height: '100%',
        backgroundColor: '#FF7F50',
        borderRadius: 5,
    },
    signContainer: {
        backgroundColor: '#745DB6',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        width: '100%',
    },
    signLabel: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    gifImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    capturedImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    instructionsContainer: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        width: '100%',
    },
    instructionsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    instructions: {
        fontSize: 16,
        color: '#333',
    },
    captureButton: {
        backgroundColor: '#B692F6',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    captureButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    retakeButton: {
        backgroundColor: '#FF7F50',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    submitBtn: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    skipButton: {
        backgroundColor: '#FFBF00',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    skipButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    alertContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
    },
    alertImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF0000', // Red color for emphasis
        marginBottom: 10,
        textAlign: 'center',
    },
    modalTitleCorrect: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4CAF50', // Green color for success
        marginBottom: 10,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#FF4500', // Bright red color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
    },
    retryButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    okButton: {
        backgroundColor: '#1E90FF', // Blue color for OK button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15,
    },
    okButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GifWordScreen;
