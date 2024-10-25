import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from 'react-native-vector-icons';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { Base_url1 } from './baseUrl';

const QuizScreen = ({ route }) => {
    const { nouns, verbs } = route.params;
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [recordedUri, setRecordedUri] = useState(null);
    const [nounsRecordedUri, setNounsRecordedUri] = useState(null);
    const [verbsRecordedUri, setVerbsRecordedUri] = useState(null);
    const [sound, setSound] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    const navigation = useNavigation(); // Get navigation object

    const questions = [
        'What are the Nouns of this lesson?',
        'What are the Verbs of this lesson?'
    ];

    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
            Speech.speak(questions[currentQuestionIndex]);
        }
    }, [currentQuestionIndex]);

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === 'granted') {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                const recording = new Audio.Recording();
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                setRecording(recording);
                setIsRecording(true);
            } else {
                console.log('Permission to record not granted');
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedUri(uri);
        setIsRecording(false);

        if (currentQuestionIndex === 0) {
            setNounsRecordedUri(uri);
        } else {
            setVerbsRecordedUri(uri);
        }
    };

    const playRecording = async () => {
        if (recordedUri) {
            const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
            setSound(sound);
            await sound.playAsync();
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setRecordedUri(null);
        }
    };

    const submitRecording = async () => {
        if (!nounsRecordedUri || !verbsRecordedUri) {
            Alert.alert('Error', 'Please record both nouns and verbs answers before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('nounsVoice', {
            uri: nounsRecordedUri,
            type: 'audio/m4a',
            name: 'nouns_recording.m4a',
        });
        formData.append('verbsVoice', {
            uri: verbsRecordedUri,
            type: 'audio/m4a',
            name: 'verbs_recording.m4a',
        });
        formData.append('nouns', JSON.stringify(nouns));
        formData.append('verbs', JSON.stringify(verbs));

        try {
            const response = await fetch(`${Base_url1}/blind/voice/extract`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();

            if (response.ok) {
                setApiResponse(result);
                setModalVisible(true);
            } else {
                Alert.alert('Error', result.error || 'Failed to submit recordings.');
            }
        } catch (error) {
            console.error('Error submitting recordings:', error);
            Alert.alert('Error', 'Something went wrong while submitting the recordings.');
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <LinearGradient
            colors={['#6A5AE0', '#8A2BE2']}
            style={styles.container}
        >
            <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>

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

            {recordedUri && (
                <>
                    <View style={styles.recordContainer}>
                        <TouchableOpacity style={styles.playButton} onPress={playRecording}>
                            <FontAwesome name="play" size={60} color="#FFF" />
                            <Text style={styles.recordText}>Play Recording</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.recordContainer}>
                        {currentQuestionIndex === 0 ? (
                            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                                <Text style={styles.nextText}>Next Question</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.submitButton} onPress={submitRecording}>
                                <Text style={styles.submitText}>Submit Recording</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}

            {/* Modal for displaying API response */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Quiz Results</Text>
                        {apiResponse && (
                            <>
                                <Text style={styles.modalText}>Advice: {apiResponse.advice}</Text>
                                <Text style={styles.modalText}>Nouns Message: {apiResponse.nouns_message}</Text>
                                <Text style={styles.modalText}>Nouns Match: {apiResponse.nouns_percentage}</Text>
                                <Text style={styles.modalText}>Verbs Message: {apiResponse.verbs_message}</Text>
                                <Text style={styles.modalText}>Verbs Match: {apiResponse.verbs_percentage}</Text>
                            </>
                        )}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('CaptureLearn'); // Navigate to CaptureLearn.js
                            }}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    questionText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 30,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
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
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    stopButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF0000',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    playButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#32CD32',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    nextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000FF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B0082',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    recordText: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 10,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4B0082',
    },
    modalText: {
        fontSize: 20,
        marginVertical: 5,
        color: '#333',
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#6A5AE0',
        borderRadius: 10,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default QuizScreen;
