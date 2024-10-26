import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient'; // Import for gradient effect

const TextDetailScreen = ({ route, navigation }) => {
    const { topic, text, nouns, verbs } = route.params;
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechRate, setSpeechRate] = useState(1.0);

    // Automatically start reading the text when the screen opens
    useEffect(() => {
        handlePlay();
        return () => {
            Speech.stop();
        };
    }, []);

    // Handle Play button press
    const handlePlay = () => {
        if (text) {
            Speech.speak(text, {
                rate: speechRate,
                onStart: () => setIsSpeaking(true),
                onDone: () => setIsSpeaking(false),
            });
        }
    };

    // Handle Pause button press
    const handlePause = () => {
        Speech.stop();
        setIsSpeaking(false);
    };

    // Handle speech speed change
    const handleSpeechRateChange = (value) => {
        setSpeechRate(value);
        if (isSpeaking) {
            Speech.stop();
            Speech.speak(text, { rate: value });
        }
    };

    // Handle Start Quiz button press
    const handleStartQuiz = () => {
        navigation.navigate('LessonQuiz', { nouns, verbs });
    };

    return (
        <LinearGradient
            colors={['#6A5AE0', '#8A2BE2']} // Gradient background
            style={styles.container}
        >
            <Text style={styles.title}>{topic}</Text>
            <View style={styles.textContainer}>
                <Text style={styles.detailText}>{text}</Text>
            </View>

            {/* Slider for controlling speech speed */}
            <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Speech Speed: {speechRate.toFixed(1)}x</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0.5}
                    maximumValue={2.0}
                    value={speechRate}
                    onValueChange={handleSpeechRateChange}
                    minimumTrackTintColor="#FFD700"
                    maximumTrackTintColor="#FFF"
                    thumbTintColor="#FFD700"
                    step={0.1}
                />
            </View>

            {/* Play and Pause buttons */}
            <View style={styles.buttonContainer}>
                {isSpeaking ? (
                    <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
                        <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
                        <Text style={styles.buttonText}>Play</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Start Quiz button */}
            <TouchableOpacity
                style={styles.startQuizButton}
                onPress={handleStartQuiz}
            >
                <Text style={styles.startQuizButtonText}>Start Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    Speech.stop();
                    navigation.goBack();
                }}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    textContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        borderRadius: 15,
        marginBottom: 20,
        elevation: 5, // For subtle shadow
    },
    detailText: {
        fontSize: 16,
        color: '#4B0082', // Deep purple color for contrast
    },
    sliderContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    sliderLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    slider: {
        width: '90%',
        height: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    playButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#32CD32',
        borderRadius: 30,
        alignItems: 'center',
        elevation: 5,
    },
    pauseButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#FF4500',
        borderRadius: 30,
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    startQuizButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#FFD700',
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    startQuizButtonText: {
        color: '#4B0082',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#FFA500',
        borderRadius: 30,
        alignItems: 'center',
        elevation: 5,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TextDetailScreen;
