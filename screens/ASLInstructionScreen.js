import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ASLInstruction = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Learn ASL for Deaf & Mute Children</Text>
            <Text style={styles.subtitle}>Please choose one</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ASLAlphabet')} // Example of navigation to another screen
            >
                <Text style={styles.buttonText}>LEARN ASL ALPHABET</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LessonQuiz')} // Example of navigation to another screen
            >
                <Text style={styles.buttonText}>LESSON AND QUIZ</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B3CBB', // Matching purple background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#1C3D99', // Blue button color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ASLInstruction;
