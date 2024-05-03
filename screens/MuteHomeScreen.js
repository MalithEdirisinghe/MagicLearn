import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MuteHomeScreen = ({ navigation }) => {
    const handleButton1Press = () => {
        navigation.navigate('LearnSign');
    };

    const handleButton2Press = () => {
        navigation.navigate('BlindQuiz');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Learn for Deaf & Mute Kids</Text>
            <Text style={styles.subText}>Please choose an option:</Text>
            <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
                <Text style={styles.buttonText}>Learn Sign Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
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
    },
    instructionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subText: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4D86F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default MuteHomeScreen;
