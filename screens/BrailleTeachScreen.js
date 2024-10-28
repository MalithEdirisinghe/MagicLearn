import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Speech from 'expo-speech';

const BrailleTeachScreen = ({ navigation }) => {

    useEffect(() => {
        // Speech text to be read aloud
        const instructions = "Welcome to the Braille Learning App. This app will help you learn Braille step by step. Braille letters are made up of six dots. The top left dot is number 1, middle left is 2, bottom left is 3, top right is 4, middle right is 5, and bottom right is number 6.";

        // Initiate the speech
        Speech.speak(instructions);

        // Cleanup function to stop speech when component unmounts
        return () => {
            Speech.stop();
        };
    }, []);

    const handleStartBtn = () => {
        // Stop the speech when navigating to another screen
        Speech.stop();
        Speech.speak('START');
        navigation.navigate('Menu');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.topicText}>Braille Teaching</Text>
            <Image style={styles.topImg} source={require('../assets/desktop.png')} />
            <Text style={styles.textInstr}>Instructions</Text>
            <View style={styles.blueBox}>
                <Text style={styles.instructText}>
                    "Welcome to the Braille Learning App. This app will help you learn Braille step by step. Braille letters are made up of six dots. The top left dot is number 1, middle left is 2, bottom left is 3, top right is 4, middle right is 5, and bottom right is number 6."
                </Text>
            </View>
            <TouchableOpacity style={styles.startBtn} onPress={handleStartBtn}>
                <Text style={styles.startText}>START</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#ffff',
    },
    topicText: {
        alignSelf: 'center',
        top: '7%',
        fontSize: 35,
        color: '#4D86F7',
        fontWeight: '500'
    },
    topImg: {
        alignSelf: 'center',
        top: '10%',
        width: '93%',
        height: '25%',
    },
    blueBox: {
        top: '15%',
        backgroundColor: '#ADD8E6',
        alignSelf: 'center',
        height: '35%',
        width: '95%',
        borderRadius: 20,
        padding: 20, // Add padding inside the box for more space
    },
    textInstr: {
        top: '15%',
        left: '5%',
        fontSize: 22, // Adjusted for better readability
        fontStyle: 'italic',
        color: '#7C7878'
    },
    instructText: {
        textAlign: 'justify',
        fontSize: 18, // Adjusted font size
        color: '#000',
        marginTop: 20,
    },
    startBtn: {
        top: '20%',
        alignSelf: 'center',
        backgroundColor: '#4D86F7',
        borderRadius: 15,
        height: '5%',
        width: '40%',
    },
    startText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#ffff',
        paddingTop: 3,
    },
});

export default BrailleTeachScreen;
