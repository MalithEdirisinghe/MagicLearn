import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Button, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import {Base_url2} from './baseUrl'

const GifWordScreen = () => {

    const [imageUri, setImageUri] = useState();
    const [imageCaptured, setImageCaptured] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [currentGifIndex, setCurrentGifIndex] = useState(0);
    const [loading, setLoading] = useState(false);

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
        // Add more GIF paths here as needed
    ];

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

            const response = await fetch(Base_url2 +'/deaf/extractedText', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Response:', responseData);

                const currentGifName = gifData[currentGifIndex].name.toUpperCase();
                const apiResponse = responseData.predicted_class.toUpperCase();  // Access the correct key

                if (currentGifName === apiResponse) {
                    setShowAlert(true);
                } else {
                    Alert.alert('Incorrect Answer', 'Your answer does not match the GIF. Please try again.');
                }
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    // Handle skipping to the next question
    const handleSkip = () => {
        setImageUri(null);
        setImageCaptured(false);
        setCurrentGifIndex((currentGifIndex + 1) % gifData.length);
    };

    const handleCloseModal = () => {
        setShowAlert(false);
        handleSkip(); // Move to the next question after showing correct answer
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Progress bar */}
                <View style={styles.progressBarContainer}>
                    <Text style={styles.questionText}>Question {currentGifIndex + 1}</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress, { width: `${((currentGifIndex + 1) / gifData.length) * 100}%` }]}></View>
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
                <Modal isVisible={showAlert}>
                    <View style={styles.alertContainer}>
                        <Image source={require('../assets/correct.png')} style={styles.alertImage} />
                        <Text>Your answer is correct!</Text>
                        <Button title="OK" onPress={handleCloseModal} />
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
});

export default GifWordScreen;
