import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Base_url1} from './baseUrl'

const SignWordScreen = () => {
    const wordsWithImages = {
        'Father': require('../assets/signWord/father.png'),
        'Mother': require('../assets/signWord/mother.png'),
        'Hello': require('../assets/signWord/hello.png'),
        'Please': require('../assets/signWord/please.png'),
        'Thank You': require('../assets/signWord/thankyou.png'),
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedWord, setSelectedWord] = useState(''); // Track the word selected
    const [isUriImage, setIsUriImage] = useState(false);
    const [isImageTaken, setIsImageTaken] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to handle card press and show the corresponding image
    const handleCardPress = (word) => {
        const imageUri = wordsWithImages[word];
        if (imageUri) {
            setSelectedImage(imageUri);
            setSelectedWord(word); // Set the selected word
            setIsUriImage(false); // Local image
            setIsImageTaken(false); // Reset image status
            setIsModalVisible(true); // Open modal
        } else {
            Alert.alert("Error", "No image available for this word.");
        }
    };

    // Handle the "Take Image" button press, ask whether to open camera or gallery
    const handleTakeImagePress = () => {
        Alert.alert(
            'Choose Image Source',
            'Would you like to open the camera or select from the gallery?',
            [
                { text: 'Camera', onPress: openCamera },
                { text: 'Gallery', onPress: openGallery },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    // Open camera
    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission Denied", "You need to grant camera permissions to use this feature.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setIsUriImage(true); // Mark as URI image
            setIsImageTaken(true); // Mark as image taken
        }
    };

    // Open gallery
    const openGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission Denied", "You need to grant gallery permissions to use this feature.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setIsUriImage(true); // Mark as URI image
            setIsImageTaken(true); // Mark as image taken
        }
    };

    // Handle "Submit" button press
    const handleSubmit = async () => {
        if (isUriImage) {
            const formData = new FormData();
            formData.append('image', {
                uri: selectedImage,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });

            try {
                const response = await fetch(Base_url1+'/sign/word/predict', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    const predictedClass = result.predicted_class;

                    // Compare the predicted class with the selected word
                    if (predictedClass.toLowerCase() === selectedWord.toLowerCase()) {
                        Alert.alert("Correct", "Your answer is correct!", [{ text: "OK" }]);
                    } else {
                        Alert.alert("Incorrect", `Your answer is incorrect. The correct answer is ${predictedClass}.`, [{ text: "OK" }]);
                    }
                } else {
                    Alert.alert("Error", "Failed to submit image.");
                }
            } catch (error) {
                Alert.alert("Error", "An error occurred while submitting the image.");
                console.error(error);
            }
        }
        setIsModalVisible(false); // Close the modal
    };

    // Close modal
    const handleClose = () => {
        setIsModalVisible(false);
        setIsImageTaken(false); // Reset image taken status
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {Object.keys(wordsWithImages).map((word, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(word)}>
                    <Text style={styles.cardText}>{word}</Text>
                </TouchableOpacity>
            ))}

            {/* Modal to show image and buttons */}
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedImage && (
                            isUriImage ? (
                                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                            ) : (
                                <Image source={selectedImage} style={styles.imagePreview} />
                            )
                        )}
                        <View style={styles.buttonContainer}>
                            {isImageTaken ? (
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.button} onPress={handleTakeImagePress}>
                                    <Text style={styles.buttonText}>Take Image</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.button} onPress={handleClose}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    cardText: {
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        width: '80%',
    },
    imagePreview: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#6A5AE0',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default SignWordScreen;
