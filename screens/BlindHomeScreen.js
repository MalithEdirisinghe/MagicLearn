import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BlindHomeScreen = ({ navigation }) => {
    const handleButton1Press = () => {
        navigation.navigate('Braille');
    };

    const handleButton2Press = () => {
        // navigation.navigate('BlindQuiz');
        navigation.navigate('VoiceLearnLevel');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Learn for Blind Kids</Text>
            <Text style={styles.subText}>Please choose an option:</Text>
            <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
                <Text style={styles.buttonText}>Learn Braille</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={handleButton2Press}>
                <Text style={styles.buttonText}>Lesson & Quiz</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F6F9', // Light background to match Figma theme
        paddingHorizontal: 20,
    },
    instructionText: {
        fontSize: 28, // Larger font size for the main instruction
        fontWeight: '700', // Bolder font weight
        color: '#333', // Darker color for contrast
        marginBottom: 15,
    },
    subText: {
        fontSize: 18,
        color: '#666', // Softer subtext color
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4D86F7', // Primary button color
        paddingVertical: 15, // More padding for better UX
        paddingHorizontal: 50,
        borderRadius: 30, // Rounded button for modern feel
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5, // Shadow for Android
    },
    buttonSecondary: {
        backgroundColor: '#FF6F61', // Secondary button with a different color
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#fff', // White text for better contrast
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default BlindHomeScreen;
