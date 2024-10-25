// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
// import { Audio } from 'expo-av';
// import { FontAwesome } from 'react-native-vector-icons';
// import * as Speech from 'expo-speech';
// import { Base_url1 } from './baseUrl';

// const QuizScreen = ({ route }) => {
//     const { nouns, verbs } = route.params;
//     const [recording, setRecording] = useState(null);
//     const [isRecording, setIsRecording] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [recordedUri, setRecordedUri] = useState(null);
//     const [nounsRecordedUri, setNounsRecordedUri] = useState(null);
//     const [verbsRecordedUri, setVerbsRecordedUri] = useState(null);
//     const [sound, setSound] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
//     const [apiResponse, setApiResponse] = useState(null); // State to store API response

//     const questions = [
//         'What are the Nouns of this lesson?',
//         'What are the Verbs of this lesson?'
//     ];

//     useEffect(() => {
//         if (currentQuestionIndex < questions.length) {
//             Speech.speak(questions[currentQuestionIndex]);
//         }
//     }, [currentQuestionIndex]);

//     const startRecording = async () => {
//         try {
//             console.log('Requesting permissions..');
//             const permission = await Audio.requestPermissionsAsync();
//             if (permission.status === 'granted') {
//                 console.log('Starting recording..');
//                 await Audio.setAudioModeAsync({
//                     allowsRecordingIOS: true,
//                     playsInSilentModeIOS: true,
//                 });
//                 const recording = new Audio.Recording();
//                 await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//                 await recording.startAsync();
//                 setRecording(recording);
//                 setIsRecording(true);
//                 console.log('Recording started');
//             } else {
//                 console.log('Permission to record not granted');
//             }
//         } catch (err) {
//             console.error('Failed to start recording', err);
//         }
//     };

//     const stopRecording = async () => {
//         console.log('Stopping recording..');
//         setRecording(undefined);
//         await recording.stopAndUnloadAsync();
//         const uri = recording.getURI();
//         setRecordedUri(uri);
//         console.log('Recording stopped and stored at', uri);
//         setIsRecording(false);

//         if (currentQuestionIndex === 0) {
//             setNounsRecordedUri(uri);
//         } else {
//             setVerbsRecordedUri(uri);
//         }
//     };

//     const playRecording = async () => {
//         if (recordedUri) {
//             console.log('Playing recorded audio...');
//             const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
//             setSound(sound);
//             await sound.playAsync();
//         }
//     };

//     const handleNextQuestion = () => {
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setRecordedUri(null);
//         }
//     };

//     const submitRecording = async () => {
//         if (!nounsRecordedUri || !verbsRecordedUri) {
//             Alert.alert('Error', 'Please record both nouns and verbs answers before submitting.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('nounsVoice', {
//             uri: nounsRecordedUri,
//             type: 'audio/m4a',
//             name: 'nouns_recording.m4a',
//         });
//         formData.append('verbsVoice', {
//             uri: verbsRecordedUri,
//             type: 'audio/m4a',
//             name: 'verbs_recording.m4a',
//         });
//         formData.append('nouns', JSON.stringify(nouns));
//         formData.append('verbs', JSON.stringify(verbs));

//         try {
//             const response = await fetch(`${Base_url1}/blind/voice/extract`, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             const result = await response.json();
//             console.log('API Response:', result);

//             if (response.ok) {
//                 setApiResponse(result); // Store API response
//                 setModalVisible(true); // Show the modal
//             } else {
//                 Alert.alert('Error', result.error || 'Failed to submit recordings.');
//             }
//         } catch (error) {
//             console.error('Error submitting recordings:', error);
//             Alert.alert('Error', 'Something went wrong while submitting the recordings.');
//         }
//     };

//     useEffect(() => {
//         return sound
//             ? () => {
//                 console.log('Unloading Sound');
//                 sound.unloadAsync();
//             }
//             : undefined;
//     }, [sound]);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>

//             <ScrollView style={styles.scrollContainer}>
//                 {nouns && nouns.length > 0 && (
//                     <View style={styles.dataContainer}>
//                         <Text style={styles.dataTitle}>Nouns:</Text>
//                         {nouns.map((noun, index) => (
//                             <Text key={index} style={styles.dataItem}>
//                                 {noun}
//                             </Text>
//                         ))}
//                     </View>
//                 )}

//                 {verbs && verbs.length > 0 && (
//                     <View style={styles.dataContainer}>
//                         <Text style={styles.dataTitle}>Verbs:</Text>
//                         {verbs.map((verb, index) => (
//                             <Text key={index} style={styles.dataItem}>
//                                 {verb}
//                             </Text>
//                         ))}
//                     </View>
//                 )}
//             </ScrollView>

//             <View style={styles.recordContainer}>
//                 {!isRecording ? (
//                     <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
//                         <FontAwesome name="microphone" size={60} color="#FFF" />
//                         <Text style={styles.recordText}>Start Recording</Text>
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
//                         <FontAwesome name="microphone-slash" size={60} color="#FFF" />
//                         <Text style={styles.recordText}>Stop Recording</Text>
//                     </TouchableOpacity>
//                 )}
//             </View>

//             {recordedUri && (
//                 <>
//                     <View style={styles.recordContainer}>
//                         <TouchableOpacity style={styles.playButton} onPress={playRecording}>
//                             <FontAwesome name="play" size={60} color="#FFF" />
//                             <Text style={styles.recordText}>Play Recording</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.recordContainer}>
//                         {currentQuestionIndex === 0 ? (
//                             <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
//                                 <Text style={styles.nextText}>Next Question</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity style={styles.submitButton} onPress={submitRecording}>
//                                 <Text style={styles.submitText}>Submit Recording</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </>
//             )}

//             {/* Modal for displaying API response */}
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContainer}>
//                         <Text style={styles.modalTitle}>Quiz Results</Text>
//                         {apiResponse && (
//                             <>
//                                 <Text style={styles.modalText}>Advice: {apiResponse.advice}</Text>
//                                 <Text style={styles.modalText}>Nouns Message: {apiResponse.nouns_message}</Text>
//                                 <Text style={styles.modalText}>Nouns Match: {apiResponse.nouns_percentage}</Text>
//                                 <Text style={styles.modalText}>Verbs Message: {apiResponse.verbs_message}</Text>
//                                 <Text style={styles.modalText}>Verbs Match: {apiResponse.verbs_percentage}</Text>
//                             </>
//                         )}
//                         <TouchableOpacity
//                             style={styles.closeButton}
//                             onPress={() => setModalVisible(false)}
//                         >
//                             <Text style={styles.closeButtonText}>Close</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#6A5AE0',
//         padding: 20,
//     },
//     questionText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#FFF',
//         marginBottom: 20,
//     },
//     scrollContainer: {
//         width: '100%',
//         marginBottom: 20,
//     },
//     dataContainer: {
//         paddingHorizontal: 20,
//         marginVertical: 10,
//     },
//     dataTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#FFF',
//         marginBottom: 10,
//     },
//     dataItem: {
//         fontSize: 18,
//         color: '#FFF',
//     },
//     recordContainer: {
//         marginTop: 30,
//         alignItems: 'center',
//     },
//     recordButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FFA500',
//         padding: 20,
//         borderRadius: 100,
//         marginBottom: 20,
//     },
//     stopButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FF0000',
//         padding: 20,
//         borderRadius: 100,
//         marginBottom: 20,
//     },
//     playButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#32CD32',
//         padding: 20,
//         borderRadius: 100,
//         marginBottom: 20,
//     },
//     nextButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#0000FF',
//         padding: 20,
//         borderRadius: 100,
//         marginBottom: 20,
//     },
//     submitButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#4B0082',
//         padding: 20,
//         borderRadius: 100,
//         marginBottom: 20,
//     },
//     recordText: {
//         color: '#FFF',
//         fontSize: 18,
//         marginTop: 10,
//     },
//     nextText: {
//         color: '#FFF',
//         fontSize: 18,
//     },
//     submitText: {
//         color: '#FFF',
//         fontSize: 18,
//     },
//     modalOverlay: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContainer: {
//         width: '80%',
//         padding: 20,
//         backgroundColor: '#FFF',
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     modalText: {
//         fontSize: 18,
//         marginVertical: 5,
//     },
//     closeButton: {
//         marginTop: 20,
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         backgroundColor: '#6A5AE0',
//         borderRadius: 10,
//     },
//     closeButtonText: {
//         color: '#FFF',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default QuizScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from 'react-native-vector-icons';
import * as Speech from 'expo-speech';
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
        <View style={styles.container}>
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
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    nextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000FF',
        padding: 20,
        borderRadius: 100,
        marginBottom: 20,
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B0082',
        padding: 20,
        borderRadius: 100,
        marginBottom: 20,
    },
    recordText: {
        color: '#FFF',
        fontSize: 18,
        marginTop: 10,
    },
    nextText: {
        color: '#FFF',
        fontSize: 18,
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginVertical: 5,
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
