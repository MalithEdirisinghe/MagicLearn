import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech'; // Import Speech module
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const ScanLessonScreen = () => {
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation(); // Initialize navigation

    // Trigger speech when the screen loads
    useEffect(() => {
        Speech.speak("how to begin");
        const instructions = "Please select a small paragraph of text you'd like your child to learn. The app will scan the text, read it aloud, and generate questions about key nouns and verbs in the paragraph. This will help reinforce your child's understanding of the content. Tap 'Continue' to begin.";
        Speech.speak(instructions);
    }, []); // Run once when the component mounts

    // Function to handle image selection from camera or gallery
    const handleImageSelection = async (option) => {
        let permissionResult;

        // Request permissions based on the selected option
        if (option === 'camera') {
            permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        } else {
            permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        }

        // If permission is not granted, show an alert
        if (permissionResult.granted === false) {
            const alertMessage = "Permission Denied. You need to allow permission to access the camera or gallery.";
            Alert.alert("Permission Denied", alertMessage);
            Speech.speak(alertMessage); // Speak the alert message
            return;
        }

        // Open the camera or gallery to pick an image
        let result;
        if (option === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
        }

        // Log the entire result object to check its structure
        console.log("Image Picker Result:", result);

        // If user cancels, don't do anything
        if (!result.canceled) {
            const uri = result.assets[0].uri; // Access the uri from the first asset
            console.log("Image URI:", uri); // Log the image URI
            setImageUri(uri); // Save the selected image's URI
            navigation.navigate('DisplayImageScreen', { imageUri: uri }); // Navigate to new screen with image URI
        } else {
            console.log("Image selection was cancelled.");
        }
    };

    // Function to display a menu for choosing between camera or gallery
    const openImagePickerMenu = () => {
        Speech.speak('start your lesson');
        Alert.alert(
            "Select Image",
            "Choose an option to select an image",
            [
                { text: "Camera", onPress: () => handleImageSelection('camera') },
                { text: "Gallery", onPress: () => handleImageSelection('gallery') },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Placeholder for Learn Image */}
            <Image
                source={require('../assets/learn-english.png')} // Replace with your image or use placeholder
                style={styles.learnImage}
                resizeMode="cover"
            />

            {/* Instruction Section */}
            <LinearGradient colors={['#FFFFFF', '#D8EFFF']} style={styles.instructionContainer}>
                <Text style={styles.titleText}>How to begin</Text>
                <Text style={styles.instructionText}>
                    "Please select a small paragraph of text you'd like your child to learn. The app will scan the text, read it aloud, and generate questions about key nouns and verbs in the paragraph. This will help reinforce your child's understanding of the content. Tap 'Continue' to begin."
                </Text>

                {/* Start Button */}
                <TouchableOpacity style={styles.startButton} onPress={openImagePickerMenu}>
                    <Text style={styles.startButtonText}>Start Your Lesson</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A5AE0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    learnImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 20,
    },
    instructionContainer: {
        width: '100%',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: 20,
    },
    startButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    startButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ScanLessonScreen;
