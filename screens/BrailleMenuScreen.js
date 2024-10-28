import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Speech from 'expo-speech';

const BrailleMenuScreen = ({ navigation }) => {

    const instructionsText = `Great! Let's choose a lesson. The first lesson covers the letters A to E. The second lesson covers F to J. The third lesson covers K to O. The fourth lesson covers P to T. The fifth lesson covers U to Z. Tap the screen to select the lesson you want to start with.`;

    const [showQuizButton, setShowQuizButton] = useState(false);
    const [currentRange, setCurrentRange] = useState('');

    useEffect(() => {
        // Speak the instructions when the screen loads
        Speech.speak(instructionsText);

        // Cleanup function to stop speech when component unmounts
        return () => {
            Speech.stop();
        };
    }, []);

    const handleRangeComplete = (range) => {
        setCurrentRange(range); // Set the current range as completed
        setShowQuizButton(true); // Show the quiz button after a range is completed
    }

    const handleAtoE = () => {
        Speech.stop(); // Stop the speech before navigating
        Speech.speak('A to E'); // Speak the button text
        navigation.navigate('Letter', { range: 'A to E' });
        handleRangeComplete('A to E');
    }

    const handleFtoJ = () => {
        Speech.stop(); // Stop the speech before navigating
        Speech.speak('F to J'); // Speak the button text
        navigation.navigate('Letter', { range: 'F to J' });
        handleRangeComplete('F to J');
    }

    const handleKtoO = () => {
        Speech.stop(); // Stop the speech before navigating
        Speech.speak('K to O'); // Speak the button text
        navigation.navigate('Letter', { range: 'K to O' });
        handleRangeComplete('K to O');
    }

    const handlePtoT = () => {
        Speech.stop(); // Stop the speech before navigating
        Speech.speak('P to T'); // Speak the button text
        navigation.navigate('Letter', { range: 'P to T' });
        handleRangeComplete('P to T');
    }

    const handleUtoZ = () => {
        Speech.stop(); // Stop the speech before navigating
        Speech.speak('U to Z'); // Speak the button text
        navigation.navigate('Letter', { range: 'U to Z' });
        handleRangeComplete('U to Z');
    }

    const handleGetQuiz = () => {
        Speech.stop(); // Stop the speech before starting the quiz
        Speech.speak(`Get Quiz for ${currentRange}`); // Speak the quiz button text

        let questions = [];

        // Assign questions based on the current range
        if (currentRange === 'A to E') {
            questions = ['BED', 'BEE', 'CAB', 'DAD'];
        } else if (currentRange === 'F to J') {
            questions = ['CAFE', 'CAGE', 'CHIEF', 'FACE'];
        } else if (currentRange === 'K to O') {
            questions = ['LAKE', 'LOOK', 'MOON', 'NAIL'];
        } else if (currentRange === 'P to T') {
            questions = ['PET', 'POST', 'STAR', 'TEAR'];
        } else if (currentRange === 'U to Z') {
            questions = ['AXE', 'USE', 'WAVE', 'ZOOM'];
        }

        // Navigate to the Quiz screen with the questions for the current range
        navigation.navigate('Quiz', { range: currentRange, questions });
        setShowQuizButton(false); // Hide the button once the quiz starts
    }

    return (
        <View style={styles.container}>
            <Image style={styles.speaker} source={require('../assets/speaker.png')} />

            <TouchableOpacity style={styles.list} onPress={handleAtoE}>
                <Text style={styles.text1}>1.                           A to E</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.list} onPress={handleFtoJ}>
                <Text style={styles.text1}>2.                           F to J</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.list} onPress={handleKtoO}>
                <Text style={styles.text1}>3.                           K to O</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.list} onPress={handlePtoT}>
                <Text style={styles.text1}>4.                           P to T</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.list} onPress={handleUtoZ}>
                <Text style={styles.text1}>5.                           U to Z</Text>
            </TouchableOpacity>

            {/* Instructions positioned at the bottom */}
            <View style={styles.instructionBox}>
                <Text style={styles.instructions}>
                    {instructionsText}
                </Text>
            </View>

            {/* Conditionally render the "Get Quiz" button after completing each range */}
            {showQuizButton && (
                <TouchableOpacity style={styles.quizButton} onPress={handleGetQuiz}>
                    <Text style={styles.quizButtonText}>Get Quiz for {currentRange}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up the whole screen
        justifyContent: 'space-between', // Ensure the content is spaced out
        backgroundColor: '#ffff',
    },
    speaker: {
        width: '35%',
        height: '15%',
        alignSelf: 'center',
        marginTop: '8%',
    },
    list: {
        backgroundColor: '#ADD8E6',
        alignSelf: 'center',
        height: '7.5%',
        width: '95%',
        borderRadius: 10,
        marginBottom: 10, // Add some spacing between buttons
    },
    text1: {
        fontSize: 20,
        fontWeight: '500',
        left: '5%',
        paddingTop: 15,
    },
    instructionBox: {
        backgroundColor: '#E0F7FA',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 20, // Add some space at the bottom of the screen
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        lineHeight: 24,
    },
    quizButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    quizButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BrailleMenuScreen;
