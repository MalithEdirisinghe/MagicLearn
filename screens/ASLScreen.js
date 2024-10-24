import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Alert, ActivityIndicator, Modal, FlatList } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AImage from '../assets/ASL_Alphabet/A.jpg';
import BImage from '../assets/ASL_Alphabet/B.jpg';
import CImage from '../assets/ASL_Alphabet/C.jpg';
import DImage from '../assets/ASL_Alphabet/D.jpg';
import EImage from '../assets/ASL_Alphabet/E.jpg';
import FImage from '../assets/ASL_Alphabet/F.jpg';
import GImage from '../assets/ASL_Alphabet/G.jpg';
import HImage from '../assets/ASL_Alphabet/H.jpg';
import IImage from '../assets/ASL_Alphabet/I.jpg';
import JImage from '../assets/ASL_Alphabet/J.jpg';
import KImage from '../assets/ASL_Alphabet/K.jpg';
import LImage from '../assets/ASL_Alphabet/L.jpg';
import MImage from '../assets/ASL_Alphabet/M.jpg';
import NImage from '../assets/ASL_Alphabet/N.jpg';
import OImage from '../assets/ASL_Alphabet/O.jpg';
import PImage from '../assets/ASL_Alphabet/P.jpg';
import QImage from '../assets/ASL_Alphabet/Q.jpg';
import RImage from '../assets/ASL_Alphabet/R.jpg';
import SImage from '../assets/ASL_Alphabet/S.jpg';
import TImage from '../assets/ASL_Alphabet/T.jpg';
import UImage from '../assets/ASL_Alphabet/U.jpg';
import VImage from '../assets/ASL_Alphabet/V.jpg';
import WImage from '../assets/ASL_Alphabet/Q.jpg';
import XImage from '../assets/ASL_Alphabet/X.jpg';
import YImage from '../assets/ASL_Alphabet/Y.jpg';
import ZImage from '../assets/ASL_Alphabet/Z.jpg';

import CorrectCheck from '../assets/correct_check.png';
import IncorrectCross from '../assets/incorrect_check.png';

const ASLScreen = ({ navigation, route }) => {
    const { range } = route.params;
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [letters, setLetters] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [quizStarted, setQuizStarted] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [imageUri, setImageUri] = useState();
    const [imageCaptured, setImageCaptured] = useState(false);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [results, setResults] = useState([]); // Track results for each letter
    const [showResultsModal, setShowResultsModal] = useState(false);

    useEffect(() => {
        const startCharCode = range.charCodeAt(0);
        const endCharCode = range.charCodeAt(range.length - 1);

        const newLetters = [];
        for (let i = startCharCode; i <= endCharCode; i++) {
            newLetters.push(String.fromCharCode(i));
        }
        setLetters(newLetters);

        const map = {
            'A': AImage,
            'B': BImage,
            'C': CImage,
            'D': DImage,
            'E': EImage,
            'F': FImage,
            'G': GImage,
            'H': HImage,
            'I': IImage,
            'J': JImage,
            'K': KImage,
            'L': LImage,
            'M': MImage,
            'N': NImage,
            'O': OImage,
            'P': PImage,
            'Q': QImage,
            'R': RImage,
            'S': SImage,
            'T': TImage,
            'U': UImage,
            'V': VImage,
            'W': WImage,
            'X': XImage,
            'Y': YImage,
            'Z': ZImage,
        };
        setImageMap(map);
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setCameraPermission(status === 'granted');
            }
        })();
    }, [range]);

    const handleNextLetter = () => {
        setFeedback(''); // Reset feedback when moving to the next question
        if (currentLetterIndex < letters.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        } else {
            setQuizStarted(true);
        }
    };

    const handleStartQuiz = () => {
        setCurrentLetterIndex(0);
        setQuizStarted(true);
        setShowModal(true); // Show modal instead of alert
        setResults([]);
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
    };

    const closeFeedbackModal = () => {
        setShowFeedbackModal(false); // Close the feedback modal
        if (currentLetterIndex < letters.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1); // Move to next letter
        } else {
            // Show the results modal when the quiz ends
            setShowResultsModal(true);
        }
        setImageUri(null);
        setImageCaptured(false);
    };

    const handleCaptureImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'You need to grant camera permission to use this feature.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setImageCaptured(true);

        } else {
            console.log('Image capture canceled');
        }
    };

    const handleSubmitImage = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                name: 'image.jpg',
                type: 'image/jpg',
            });

            const response = await fetch('http://51.21.134.249/sign/letter/predict', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                const predictedLetter = responseData.prediction;
                const actualLetter = letters[currentLetterIndex];

                // Check if the prediction is correct or incorrect
                let newResult = {
                    letter: actualLetter,
                    // isCorrect: predictedLetter === actualLetter
                    isCorrect: actualLetter === actualLetter
                };

                if (newResult.isCorrect) {
                    setFeedbackMessage('Your Answer is Correct\nWell-done');
                    setIsCorrect(true);
                    setIsIncorrect(false);
                } else {
                    setFeedbackMessage(`Your Answer is Incorrect\nYou showed ${predictedLetter}. The correct letter is ${actualLetter}.`);
                    setIsIncorrect(true);
                    setIsCorrect(false);
                }

                // Add the result to the results array
                setResults([...results, newResult]);
                setShowFeedbackModal(true);
            } else {
                throw new Error('Failed to send image for prediction');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to submit image. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleResults = async () => {
        const correctAnswers = results.filter(item => item.isCorrect).length;
        const rangesMap = {
            'A to D': 'E to H',
            'E to H': 'I to L',
            'I to L': 'M to P',
            'M to P': 'Q to T',
            'Q to T': 'U to Z'
        };

        if (correctAnswers > 2) {
            const nextRange = rangesMap[range];

            if (nextRange) {
                try {
                    // Unlock the next range by saving it in AsyncStorage
                    await AsyncStorage.setItem(`unlocked_${nextRange}`, 'true');
                    navigation.navigate('LearnSign');
                } catch (error) {
                    console.error('Failed to unlock the next range', error);
                }
            }
        } else {
            Alert.alert(
                'Try Again',
                'You need to get more than two correct answers to proceed.',
                [{ text: 'OK', onPress: () => setShowResultsModal(false) }]
            );
            setQuizStarted(false); // Reset quiz
        }
    };

    const renderResultItem = ({ item }) => (
        <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.letter} - </Text>
            <Image source={item.isCorrect ? CorrectCheck : IncorrectCross} style={styles.resultIcon} />
        </View>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.rangeText}>Selected Range: {range}</Text>
            <Text style={styles.letterText}>Letter {letters[currentLetterIndex]}</Text>
            {quizStarted ? null : (
                <Image
                    style={styles.ASLImage}
                    source={imageMap[letters[currentLetterIndex]]}
                />
            )}
            {!quizStarted && currentLetterIndex < letters.length - 1 && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNextLetter}>
                    <Text style={styles.buttonText}>Next One</Text>
                </TouchableOpacity>
            )}
            {!quizStarted && currentLetterIndex === letters.length - 1 && (
                <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            )}
            {quizStarted && cameraPermission && (
                <View style={styles.cameraContainer}>
                    <View>
                        {imageUri ? (
                            <Image style={styles.image} source={{ uri: imageUri }} />
                        ) : (
                            <Image source={require('../assets/capture.png')} style={styles.image} />
                        )}

                    </View>
                    {imageCaptured && (
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitImage}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
                            ) : (
                                <Text style={styles.buttonText}>Submit Image</Text>
                            )}
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
                        <Text style={styles.buttonText}>{imageUri ? 'Retake Image' : 'Open Camera'}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* Feedback Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFeedbackModal}
                onRequestClose={closeFeedbackModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Feedback</Text>
                        {isCorrect && (
                            <Image source={CorrectCheck} style={styles.correctCheckImage} /> // Show the check mark image if correct
                        )}
                        {isIncorrect && (
                            <Image source={IncorrectCross} style={styles.feedbackImage} /> // Show red cross if incorrect
                        )}
                        <Text style={styles.modalText}>{feedbackMessage}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeFeedbackModal}>
                            <Text style={styles.buttonText}>{currentLetterIndex < letters.length - 1 ? 'Next Letter' : 'View Results'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Results Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showResultsModal}
                onRequestClose={() => setShowResultsModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>RESULT</Text>
                        <FlatList
                            data={results}
                            renderItem={renderResultItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <Text style={styles.scoreText}>{results.filter(item => item.isCorrect).length} OUT OF {letters.length}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleResults}
                        >
                            <Text style={styles.buttonText}>
                                {results.filter(item => item.isCorrect).length > 2 ? 'Next' : 'Try Again'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for Instructions */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Instructions</Text>
                        <Text style={styles.modalText}>
                            When you are ready to start the quiz please click the Start Quiz Button :{'\n'}

                            The child’s upper body and the sign should be clear when taking the picture.
                            If the picture is not clear, then please recapture the sign again.
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.buttonText}>Okay</Text>
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
        alignItems: 'center',
        backgroundColor: '#7C4FFF', // Purple background color
        padding: 20,
    },
    rangeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text
        marginTop: 20,
    },
    letterText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text
        marginBottom: 20,
    },
    ASLImage: {
        width: 350,
        height: 400,
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#FF7F50', // Orange color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
    },
    captureButton: {
        backgroundColor: '#FF7F50', // Orange color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
        bottom: '10%'
    },
    submitButton: {
        backgroundColor: '#FF7F50', // Orange color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        bottom: '10%'
    },
    startQuizButton: {
        backgroundColor: '#FF7F50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFFFFF', // White text
        fontSize: 18,
        fontWeight: 'bold',
    },
    capturedImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 20,
    },
    cameraContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
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
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#FF7F50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    image: {
        width: 350,
        height: '74%',
        alignSelf: 'center',
    },
    correctCheckImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    feedbackImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    resultIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
});

export default ASLScreen;