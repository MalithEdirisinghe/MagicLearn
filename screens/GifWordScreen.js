import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Button, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';

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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                name: 'image.jpg',
                type: 'image/jpg',
            });

            const response = await fetch('http://13.50.16.208/extractedText/predict', {
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
                const apiResponse = responseData.extracted_text[0].toUpperCase();

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


    const handleCloseModal = () => {
        setShowAlert(false);
        handleRetake();
        setCurrentGifIndex((currentGifIndex + 1) % gifData.length);
    };


    return (
        <View style={styles.container}>
            <Image
                source={imageUri ? { uri: imageUri } : gifData[currentGifIndex].path}
                style={imageUri ? styles.capturedImage : styles.gifImage}
            />

            {!imageCaptured && (
                <>
                    <TouchableOpacity style={styles.button} onPress={openCamera}>
                        <Text style={styles.buttonText}>Open Camera</Text>
                    </TouchableOpacity>
                    <Text style={styles.instructTxt}>INSTRUCTIONS:</Text>
                    <View style={styles.instructStyle}>
                        <Text style={styles.instructions}>
                            1. Watch GIF: Observe the sign language GIF to understand the word.{'\n\n'}
                            2. Write Word: Write the corresponding English word on paper, clearly and legibly.{'\n\n'}
                            3. Take Photo: Use your camera to capture a clear image of the written word.{'\n\n'}
                            4. Upload Photo: Click "Upload" and select the photo to submit it.{'\n\n'}
                            5. Receive Feedback: The app uses OCR to check {'\n'}your answer and provides feedback on correctness.
                        </Text>

                    </View>
                </>
            )}

            {imageCaptured && (
                <TouchableOpacity style={styles.button} onPress={handleRetake}>
                    <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>
            )}

            {imageUri && (
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Submit Image</Text>
                    )}
                </TouchableOpacity>
            )}

            <Modal isVisible={showAlert}>
                <View style={styles.alertContainer}>
                    <Image source={require('../assets/correct.png')} style={styles.alertImage} />
                    <Text>Your answer is correct!</Text>
                    <Button title="OK" onPress={handleCloseModal} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    gifImage: {
        width: 250,
        height: 260,
        marginBottom: 20,
        top: '5%'
    },
    capturedImage: {
        width: '90%',
        height: '25%',
        marginBottom: 20,
        top: '5%'
    },
    button: {
        backgroundColor: '#4D86F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        top: '5%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    submitBtn: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        top: '10%'
    },
    instructTxt: {
        top: '10%',
        alignSelf: 'flex-start',
        left: '5%',
        fontSize: 20,
        fontWeight: '500',
    },
    instructStyle: {
        top: '10%',
        backgroundColor: '#ADD8E6',
        alignSelf: 'center',
        height: '35%',
        width: '95%',
        borderRadius: 20,
    },
    instructions: {
        left: '3%',
        fontWeight: '500',
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