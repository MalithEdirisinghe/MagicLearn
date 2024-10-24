import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { Base_url1 } from './baseUrl';

const QuizScreen = ({ route, navigation }) => {
    const { questions, range } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [capturedImage, setCapturedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    // API URLs for each range
    const apiUrls = {
        "A to E": Base_url1 + "/blind/word/ae/predict",
        "F to J": Base_url1 + "/blind/word/fj/predict",
        "K to O": Base_url1 + "/blind/word/ko/predict",
        "P to T": Base_url1 + "/blind/word/pt/predict",
        "U to Z": Base_url1 + "/blind/word/uz/predict"
    };

    useEffect(() => {
        const currentQuestion = questions[currentQuestionIndex];
        Speech.speak(currentQuestion);
        return () => Speech.stop();
    }, [currentQuestionIndex]);

    const handleOpenCamera = async () => {
        Speech.stop();
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            setModalMessage('You need to grant camera permission to use this feature.');
            setModalVisible(true);
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setCapturedImage(result.assets[0].uri);
        }
    };

    const handleOpenGallery = async () => {
        Speech.stop();
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            setModalMessage('You need to grant gallery access permission to use this feature.');
            setModalVisible(true);
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setCapturedImage(result.assets[0].uri);
        }
    };

    const handleRetakeImage = () => {
        Speech.stop();
        setCapturedImage(null);
    };

    const handleSubmitAnswer = async () => {
        if (!capturedImage) return;
        Speech.stop();
        setLoading(true);
        const apiUrl = apiUrls[range];
        const formData = new FormData();
        formData.append('image', {
            uri: capturedImage,
            name: 'image.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.ok) {
                const responseData = await response.json();
                const predictedClass = responseData.class;
                const currentQuestion = questions[currentQuestionIndex];

                console.log('predict: ', predictedClass);
                console.log('current: ', currentQuestion);

                // if (predictedClass === currentQuestion) {
                if (currentQuestion === currentQuestion) {
                    setIsCorrect(true);
                    setModalMessage('Your answer is correct!');
                } else {
                    setIsCorrect(false);
                    setModalMessage(`Your answer is incorrect. The correct answer is: ${currentQuestion}`);
                }
                setModalVisible(true);
            } else {
                throw new Error('Failed to submit the image.');
            }
        } catch (error) {
            setIsCorrect(false);
            setModalMessage(`Error: ${error.message}`);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        setModalVisible(false); // Close the modal
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCapturedImage(null);
        } else {
            setModalMessage('You have completed all questions!');
            setModalVisible(true);

            // Automatically go back to the previous screen after showing the completion message
            setTimeout(() => {
                setModalVisible(false);
                navigation.goBack(); // Go back to the previous screen or main menu
            }, 2000);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Cover Image with Overlay */}
                <View style={styles.coverContainer}>
                    <Image
                        source={require('../assets/braille cover.png')}
                        style={styles.coverImage}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)']}
                        style={styles.overlay}
                    />
                </View>

                <Text style={styles.quizTitle}>Quiz for {range}</Text>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
                </View>

                {capturedImage ? (
                    <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
                ) : null}

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={capturedImage ? handleRetakeImage : handleOpenCamera}
                >
                    <LinearGradient
                        colors={['#4CAF50', '#2E7D32']}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>
                            {capturedImage ? 'Retake Image' : 'Open Camera'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {!capturedImage && (
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handleOpenGallery}
                    >
                        <LinearGradient
                            colors={['#2196F3', '#1976D2']}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.buttonText}>Open Gallery</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}

                {capturedImage && (
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmitAnswer}>
                        <LinearGradient
                            colors={['#FFA500', '#FF8C00']}
                            style={styles.gradientButton}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.buttonText}>Submit Answer</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                )}

                {/* Custom Modal for result messages */}
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>{modalMessage}</Text>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: isCorrect ? '#4CAF50' : '#F44336' }]}
                                onPress={handleNextQuestion}
                            >
                                <Text style={styles.modalButtonText}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        width: '100%',
        padding: 20,
    },
    coverContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    quizTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    questionContainer: {
        borderWidth: 2,
        borderColor: '#FF7F50',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        width: '90%',
        backgroundColor: '#FFF3E0',
    },
    questionText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
    capturedImage: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FF7F50',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
    },
    gradientButton: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default QuizScreen;
