import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from 'react-native-vector-icons';
import * as Speech from 'expo-speech';
import {Base_url1} from './baseUrl'

const QuizScreen = ({ route }) => {
    const { nouns, verbs } = route.params; // Receiving nouns and verbs via route params
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false); // Track recording status
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
    const [recordedUri, setRecordedUri] = useState(null); // Store the URI of the recorded audio
    const [sound, setSound] = useState(null); // Sound object for playing the recording
    const [userAnswer, setUserAnswer] = useState([]); // Store user answers

    const questions = [
        'What are the Nouns of this lesson?',
        'What are the Verbs of this lesson?'
    ];

    const correctAnswers = [nouns, verbs]; // Store the correct answers (nouns and verbs)

    // Speak the current question when the question index changes
    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
            Speech.speak(questions[currentQuestionIndex]); // Speak the question
        }
    }, [currentQuestionIndex]); // UseEffect to watch currentQuestionIndex change

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === 'granted') {
                console.log('Starting recording..');
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                const recording = new Audio.Recording();
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                setRecording(recording);
                setIsRecording(true); // Set recording state to true
                console.log('Recording started');
            } else {
                console.log('Permission to record not granted');
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedUri(uri); // Store the recording URI
        console.log('Recording stopped and stored at', uri);
        setIsRecording(false); // Set recording state to false
    };

    const playRecording = async () => {
        if (recordedUri) {
            console.log('Playing recorded audio...');
            const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
            setSound(sound);
            await sound.playAsync(); // Play the recorded sound
        }
    };

    // Function to handle API call to submit the recorded audio
    const submitAudio = async () => {
        if (!recordedUri) {
            Alert.alert('No Recording', 'Please record your answer before submitting.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('audio', {
                uri: recordedUri,
                type: 'audio/m4a',
                name: 'audio_recording.m4a',
            });

            const response = await fetch(Base_url1+'/blind/transcribe', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();
            console.log('API Response:', result);
            console.log('Transcribed Text:', result.text); // Updated to access the 'text' field

            if (response.ok && result.text) { // Updated to check 'result.text'
                const userWords = result.text.split(' '); // Assuming the response has transcription text
                setUserAnswer(userWords);

                // Compare user's answer with the correct answer for the current question
                const correctWords = correctAnswers[currentQuestionIndex]; // nouns or verbs depending on the question
                const matchingWords = userWords.filter((word) => correctWords.includes(word.toLowerCase())); // Case-insensitive comparison
                const matchPercentage = (matchingWords.length / correctWords.length) * 100;

                console.log(`Matching Words: ${matchingWords}`);
                console.log(`Matching Percentage: ${matchPercentage}%`);

                if (matchingWords.length > 0) {
                    const message = 'Your answer is correct!';
                    Speech.speak(message); // Speech feedback
                    Alert.alert('Feedback', message);
                } else {
                    const message = 'Your answer is incorrect!';
                    Speech.speak(message); // Speech feedback
                    Alert.alert('Feedback', message);
                }

                // Move to the next question if available
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    Alert.alert('Congratulations', 'You have completed all the questions!');
                }
            } else {
                Alert.alert('Error', 'Failed to get transcription from the API.');
            }
        } catch (error) {
            console.error('Error submitting audio:', error);
            Alert.alert('Error', 'Something went wrong while submitting the audio.');
        }
    };



    // Cleanup sound when the component unmounts
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); // Cleanup the sound resource
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>

            {/* Display corresponding nouns or verbs */}
            <ScrollView style={styles.scrollContainer}>
                {currentQuestionIndex === 0 && nouns && nouns.length > 0 && (
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataTitle}>Nouns:</Text>
                        {nouns.map((noun, index) => (
                            <Text key={index} style={styles.dataItem}>
                                {noun}
                            </Text>
                        ))}
                    </View>
                )}

                {currentQuestionIndex === 1 && verbs && verbs.length > 0 && (
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataTitle}>Verbs:</Text>
                        {verbs.map((verb, index) => (
                            <Text key={index} style={styles.dataItem}>
                                {verb}
                            </Text>
                        ))}
                    </View>
                )}
            </ScrollView>

            <View style={styles.recordContainer}>
                {!isRecording ? (
                    <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
                        <FontAwesome name="microphone" size={60} color="#FFF" />
                        <Text style={styles.recordText}>Start Recording</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
                        <FontAwesome name="microphone-slash" size={60} color="#FFF" />
                        <Text style={styles.recordText}>Stop Recording</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Play Button for playing the recorded audio */}
            {recordedUri && (
                <View style={styles.recordContainer}>
                    <TouchableOpacity style={styles.playButton} onPress={playRecording}>
                        <FontAwesome name="play" size={60} color="#FFF" />
                        <Text style={styles.recordText}>Play Recording</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Submit Button for submitting the recorded audio */}
            <View style={styles.recordContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={submitAudio}>
                    <Text style={styles.submitText}>Submit Recording</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A5AE0',
        padding: 20,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    scrollContainer: {
        width: '100%',
        marginBottom: 20,
    },
    dataContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    dataTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
    },
    dataItem: {
        fontSize: 18,
        color: '#FFF',
    },
    recordContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    recordButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFA500',
        padding: 20,
        borderRadius: 100,
        marginBottom: 20,
    },
    stopButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF0000',
        padding: 20,
        borderRadius: 100,
        marginBottom: 20,
    },
    playButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#32CD32',
        padding: 20,
        borderRadius: 100,
        marginBottom: 20,
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000FF',
        padding: 20,
        borderRadius: 100,
        marginBottom: 20,
    },
    recordText: {
        color: '#FFF',
        fontSize: 18,
        marginTop: 10,
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default QuizScreen;
