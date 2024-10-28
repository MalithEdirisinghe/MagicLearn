import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importing the images
import FatherImage from '../assets/signWord/Family Relations/father.png';
import MotherImage from '../assets/signWord/Family Relations/mother.png';
import ILoveYouImage from '../assets/signWord/Family Relations/I love you.jpg';
import HelloImage from '../assets/signWord/Actions/hello.png';
import SeeImage from '../assets/signWord/Actions/see.png';
import ThankYouImage from '../assets/signWord/Actions/thankyou.png';
import HelpImage from '../assets/signWord/Social Manners/help.jpg';
import MoreImage from '../assets/signWord/Social Manners/more.png';
import PleaseImage from '../assets/signWord/Social Manners/please.png';
import WrongImage from '../assets/signWord/Social Manners/Wrong.jpg';

// Importing the camera icon image
import CameraIcon from '../assets/capture.png';
import CorrectCheck from '../assets/correct_check.png';
import IncorrectCross from '../assets/incorrect_check.png';

const SignWordScreen = ({ route, navigation }) => {
    const { range } = route.params;

    // Define words and images for each range
    const categories = {
        'Family Relations': {
            'Father': FatherImage,
            'Mother': MotherImage,
            'Love': ILoveYouImage,
        },
        'Actions': {
            'Hello': HelloImage,
            'See': SeeImage,
            'Thank You': ThankYouImage,
        },
        'Social Manners': {
            'Help': HelpImage,
            'More': MoreImage,
            'Please': PleaseImage,
            'Wrong': WrongImage,
        },
    };

    // API URLs for each range
    const apiUrls = {
        'Family Relations': 'http://51.21.134.249/sign/word/family/predict',
        'Actions': 'http://51.21.134.249/sign/word/action/predict',
        'Social Manners': 'http://51.21.134.249/sign/word/greeting/predict',
    };

    const wordsWithImages = categories[range] || {};
    const words = Object.keys(wordsWithImages);

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [imageUri, setImageUri] = useState(null); // State to store captured image URI
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(''); // State to store feedback message
    const [showInstructionModal, setShowInstructionModal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false); // State to manage quiz mode
    const [quizStarted, setQuizStarted] = useState(false); // State to manage quiz start
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [isCorrect, setIsCorrect] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [results, setResults] = useState([]); // Stores the correctness of each answer
    const [showResultsModal, setShowResultsModal] = useState(false); // State to show the results modal
    const [quizFinished, setQuizFinished] = useState(false); // Track if the quiz is finished


    const currentWord = words[currentWordIndex];

    // Instruction text to be displayed in the modal
    const instructionText = `
        1. Stand in front of the camera 
            with proper lighting.
        2. Make sure your hand gestures 
            are clear and visible.
        3. Use a plain, distraction-free 
            background.
        4. Focus on showing the complete 
            sign clearly.
        5. Take the photo and submit it for 
            verification.
    `;

    // Start the quiz
    const handleQuizStart = () => {
        setShowInstructionModal(true);
        setCurrentWordIndex(0); // Reset to first word
    };

    // Handle pressing "Okay" in the instruction modal
    const handleStartFirstQuestion = () => {
        setShowInstructionModal(false);
        setShowQuiz(true); // Enable quiz mode
        setQuizStarted(true); // Mark quiz as started
    };

    // Capture or select image
    const handleImageCapture = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); // Store captured image URI
        } else {
            console.log('Image capture canceled');
        }
    };

    const handleSubmitImage = async () => {
        if (!imageUri) return;

        const apiUrl = apiUrls[range]; // Get the API URL based on the current range

        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            name: 'image.jpg',
            type: 'image/jpg',
        });

        try {
            setIsLoading(true); // Start loading
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const { percentage, result } = data;
                console.log("Current: ", currentWord);

                // Check if the result matches the current word
                if (currentWord.toLowerCase() === result.toLowerCase()) {
                // if (currentWord.toLowerCase() === currentWord.toLowerCase()) {
                    setFeedbackMessage(`Your answer is correct!\nPredicted: ${result}\nConfidence: ${percentage}`);
                    setIsCorrect(true);
                    setIsIncorrect(false);
                    setResults(prevResults => [...prevResults, { word: currentWord, correct: true }]);
                } else {
                    setFeedbackMessage(`Your answer is incorrect.\nIt' s alright. Do Your Best Next Time.\nThe correct word is: ${currentWord}`);
                    setIsIncorrect(true);
                    setIsCorrect(false);
                    setResults(prevResults => [...prevResults, { word: currentWord, correct: false }]);
                }

                setShowFeedbackModal(true); // Show the feedback modal
            } else {
                Alert.alert('Error', 'Failed to submit image.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while submitting the image.');
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const feedbackOkay = () => {
        setShowFeedbackModal(false);
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            setImageUri(null); // Clear the captured image for the next word
        } else {
            setQuizFinished(true); // Set quizFinished to true when quiz is completed
            setShowQuiz(false); // End the quiz
            setQuizStarted(false); // Reset quiz state
        }
        if (quizFinished) {
            setShowResultsModal(true); // Show the results modal if the quiz is finished
            setQuizFinished(false); // Reset the quizFinished state
        }
    };


    // Retake image action
    const handleRetakeImage = () => {
        setImageUri(null); // Clear the current image URI to allow retaking
    };


    // Handle next word (for learning mode)
    const handleNextWord = () => {
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            setImageUri(null);
        } else {
            Alert.alert('Range Completed', 'Now, let\'s take a quiz for this range.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{range.toUpperCase()}</Text>

            {/* Display word or captured image based on quiz state */}
            {quizStarted ? (
                <>
                    <Text style={styles.quizWordText}>{currentWord}</Text>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.wordImage1} />
                    ) : (
                        <Image source={CameraIcon} style={styles.wordImage} />
                    )}
                    {/* Display "Open Camera", "Submit", and "Retake Image" buttons based on state */}
                    {!imageUri ? (
                        <TouchableOpacity style={styles.cameraButton} onPress={handleImageCapture}>
                            <Text style={styles.buttonText}>Open Camera</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitImage}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeImage}>
                                <Text style={styles.buttonText}>Retake Image</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            ) : (
                <>
                    <Text style={styles.wordText}>{currentWord}</Text>
                    <Image source={wordsWithImages[currentWord]} style={styles.wordImage1} />
                </>
            )}

            {/* Display "Next Word" button only when the quiz hasn't started */}
            {!quizStarted && currentWordIndex < words.length - 1 && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNextWord}>
                    <Text style={styles.buttonText}>Next Word</Text>
                </TouchableOpacity>
            )}

            {/* Display "Start Quiz" button only when the quiz hasn't started */}
            {!quizStarted && currentWordIndex === words.length - 1 && (
                <TouchableOpacity style={styles.quizButton} onPress={handleQuizStart}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            )}

            {/* Instruction Modal */}
            <Modal visible={showInstructionModal} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Quiz Instructions</Text>
                        <ScrollView>
                            <Text style={styles.modalText}>{instructionText}</Text>
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleStartFirstQuestion}
                        >
                            <Text style={styles.buttonText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Feedback Modal */}
            <Modal visible={showFeedbackModal} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {isCorrect && (
                            <Image source={CorrectCheck} style={styles.correctCheckImage} /> // Show the check mark image if correct
                        )}
                        {isIncorrect && (
                            <Image source={IncorrectCross} style={styles.feedbackImage} /> // Show red cross if incorrect
                        )}
                        <Text style={styles.modalText}>{feedbackMessage}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={feedbackOkay}>
                            <Text style={styles.buttonText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Submitting...</Text>
                </View>
            )}
            {/* Results Modal */}
            <Modal visible={showResultsModal} transparent={true} animationType="slide">
                <View style={styles.resultsModalContainer}>
                    <View style={styles.resultsModalContent}>
                        <Text style={styles.resultsTitle}>RESULT</Text>

                        {/* List of results */}
                        {results.map((item, index) => (
                            <View key={index} style={styles.resultItem}>
                                <Text style={styles.resultWord}>{item.word}</Text>
                                <Image
                                    source={item.correct ? CorrectCheck : IncorrectCross}
                                    style={styles.resultIcon}
                                />
                            </View>
                        ))}

                        {/* Score */}
                        <Text style={styles.scoreText}>
                            {results.filter(item => item.correct).length} OUT OF {results.length}
                        </Text>

                        {/* Conditional Try Again or Next button */}
                        {results.filter(item => item.correct).length < 2 ? (
                            <TouchableOpacity
                                style={styles.tryAgainButton}
                                onPress={() => {
                                    // Reset the quiz state
                                    setCurrentWordIndex(0);
                                    setResults([]);
                                    setShowResultsModal(false);
                                    setQuizStarted(true);
                                    setShowQuiz(true);
                                }}
                            >
                                <Text style={styles.buttonText}>Try Again</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.nextButton}
                                    onPress={async () => {
                                        // Determine the next range to unlock
                                        let nextRange = '';
                                        if (range === 'Family Relations') nextRange = 'Actions';
                                        else if (range === 'Actions') nextRange = 'Social Manners';

                                        // Unlock the next range in AsyncStorage
                                        if (nextRange) {
                                            await AsyncStorage.setItem(`unlocked_${nextRange}`, 'true');
                                        }

                                        // Navigate back to the WordRange screen
                                        setShowResultsModal(false);
                                        navigation.navigate('WordRange');
                                    }}
                                >
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7C4FFF',
        alignItems: 'center',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
    },
    wordText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 20,
    },
    quizWordText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF', // White text for better contrast
        marginVertical: 20,
    },
    wordImage: {
        width: 250,
        height: 230,
        borderRadius: 10,
        marginBottom: 20,
    },
    wordImage1: {
        width: 300,
        height: 350,
        borderRadius: 10,
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#FF7F50', // Orange color
        padding: 15,
        borderRadius: 10,
        position: 'absolute',
        bottom: 80,
        width: '80%',
        alignItems: 'center',
    },
    quizButton: {
        backgroundColor: '#4CAF50', // Green color for quiz
        padding: 15,
        borderRadius: 10,
        position: 'absolute',
        bottom: 30,
        width: '80%',
        alignItems: 'center',
    },
    cameraButton: {
        backgroundColor: '#FF7F50', // Orange color for camera button
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#4CAF50', // Green color for submit button
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    retakeButton: {
        backgroundColor: '#FF0000', // Red color for retake button
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'left',
        fontWeight: '500',
    },
    closeButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: 150,
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    }, 
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2, // Higher than other components
    },
    loadingText: {
        color: '#FFF',
        fontSize: 18,
        marginTop: 10,
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
    resultsModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    resultsModalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    resultsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    resultWord: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultIcon: {
        width: 30,
        height: 30,
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    nextButton: {
        backgroundColor: '#FF7F50',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tryAgainButton: {
        backgroundColor: '#FF7F50', // Orange color for Try Again button
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },

});

export default SignWordScreen;
