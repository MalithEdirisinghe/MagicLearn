import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Speech from 'expo-speech';

const BrailleMenuScreen = ({ navigation }) => {

    const instructionsText = `Great! Let's choose a lesson. The first lesson covers the letters A to E. The second lesson covers F to J. The third lesson covers K to O. The fourth lesson covers P to T. The fifth lesson 
    covers U to Z. Tap the screen to select the lesson you want to start with.`;

    useEffect(() => {
        // Speak the instructions when the screen loads
        Speech.speak(instructionsText);
    }, []);

    const handleAtoE = () => {
        navigation.navigate('Letter', { range: 'A to E' });
    }

    const handleFtoJ = () => {
        navigation.navigate('Letter', { range: 'F to J' });
    }

    const handleKtoO = () => {
        navigation.navigate('Letter', { range: 'K to O' });
    }

    const handlePtoT = () => {
        navigation.navigate('Letter', { range: 'P to T' });
    }

    const handleUtoZ = () => {
        navigation.navigate('Letter', { range: 'U to Z' });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.speaker} source={require('../assets/speaker.png')}></Image>

            <TouchableOpacity style={styles.list} onPress={handleAtoE}>
                <Text style={styles.text1}>1.                           A to E</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.list} onPress={handleFtoJ}>
                <Text style={styles.text1}>2.                           F to J</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.list} onPress={handleKtoO}>
                <Text style={styles.text1}>3.                           K to O</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.list} onPress={handlePtoT}>
                <Text style={styles.text1}>4.                           P to T</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.list} onPress={handleUtoZ}>
                <Text style={styles.text1}>5.                           U to Z</Text>
            </TouchableOpacity>

            {/* Instructions positioned at the bottom */}
            <View style={styles.instructionBox}>
                <Text style={styles.instructions}>
                    {instructionsText}
                </Text>
            </View>
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
});

export default BrailleMenuScreen;
