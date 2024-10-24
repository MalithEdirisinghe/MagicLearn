import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Image, whiteBoardVisible } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import AnalogClock from './AnalogClock';
import Signature from "react-native-signature-canvas";
import { Base_url1 } from './baseUrl'

const MathOperationScreen = ({ route }) => {
    const { operation } = route.params;
    const [greeting, setGreeting] = useState('');
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [hint, setHint] = useState('');
    const [isTextMode, setIsTextMode] = useState(true);
    const [showTextInput, setShowTextInput] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [level, setLevel] = useState(1);
    const [chooseAnswerModalVisible, setChooseAnswerModalVisible] = useState(false);
    const [answerOptions, setAnswerOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [levelCompletedModalVisible, setLevelCompletedModalVisible] = useState(false);
    const [randomHour, setRandomHour] = useState(0);
    const [randomMinutes, setRandomMinutes] = useState(0);
    const [whiteBoardVisible, setWhiteBoardVisible] = useState(false); // Whiteboard Modal
    const [signature, setSignature] = useState(""); // Store signature data
    const [apiResponse, setApiResponse] = useState(""); // Store API response
    const [resultModalVisible, setResultModalVisible] = useState(false);
    const [resultMessage, setResultMessage] = useState(''); // Message to show in the result modal
    const [toastModalVisible, setToastModalVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState(''); // 'success' or 'error'

    
    let correct;

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good Morning');
        } else if (hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }

        if (operation !== 'Tik') {
            generateQuestion();
        } else {
            generateRandomTime();
        }
    }, []);

    const generateQuestion = () => {
        let num1, num2;

        do {
            num1 = Math.floor(Math.random() * 10) + 1; // Ensure num1 is between 1 and 10
            num2 = Math.floor(Math.random() * 10) + 1; // Ensure num2 is between 1 and 10

            if (operation === 'subtraction') {
                if (num2 > num1) {
                    [num1, num2] = [num2, num1];  // Ensure num1 is greater than or equal to num2
                }
            }

        } while (operation === 'addition' && num1 + num2 > 20); // Ensure sum is not greater than 20

        setNumber1(num1);
        setNumber2(num2);
        setHint('');
        setShowTextInput(false);
        setUserAnswer('');
    };

    const generateRandomTime = () => {
        const hour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
        const minutes = Math.floor(Math.random() * 12) * 5; // Random minutes between 0 and 55 (multiples of 5)

        setRandomHour(hour);
        setRandomMinutes(minutes);
    };

    const getHint = () => {
        if (operation === 'Tik') {
            setHint('Check the clock!');
        } else {
            const operationSign = operation === 'subtraction' ? '-' : '+';
            setHint(`Hint: ${number1} ${operationSign} ${number2} = ?`);
        }
    };

    const toggleMode = () => {
        setIsTextMode(!isTextMode);
    };

    const numberToText = (number) => {
        const textNumbers = [
            "ONE", "TWO", "THREE", "FOUR", "FIVE",
            "SIX", "SEVEN", "EIGHT", "NINE", "TEN",
            "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN",
            "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY"
        ];

        return textNumbers[number - 1];
    };

    const handleTypeAnswerPress = () => {
        setModalVisible(true);
    };

    const handleChooseAnswerPress = () => {

        if (operation === 'Tik') {
            // Format the correct time in HH:MM format
            correct = `${randomHour}:${randomMinutes < 10 ? '0' : ''}${randomMinutes}`;
        } else {
            // For other operations like addition or subtraction
            correct = operation === 'subtraction' ? number1 - number2 : number1 + number2;
        }

        // Set the correct answer in text mode or numerical mode
        setCorrectAnswer(isTextMode && operation !== 'Tik' ? numberToText(correct) : correct);

        let wrongAnswers = new Set();

        if (operation === 'Tik') {
            // Generate two random incorrect times for the Tik screen
            while (wrongAnswers.size < 2) {
                let wrongHour = Math.floor(Math.random() * 12) + 1;  // Random hour between 1 and 12
                let wrongMinutes = Math.floor(Math.random() * 12) * 5;  // Random minutes between 0 and 55 (multiples of 5)
                let wrongTime = `${wrongHour}:${wrongMinutes < 10 ? '0' : ''}${wrongMinutes}`;
                if (wrongTime !== correct) {
                    wrongAnswers.add(wrongTime);
                }
            }
        } else {
            // For non-Tik operations, generate two wrong answers
            while (wrongAnswers.size < 2) {
                let wrongAnswer = correct + (Math.floor(Math.random() * 10) - 5);  // Generate wrong answer close to correct answer
                if (wrongAnswer > 0 && wrongAnswer !== correct) {  // Ensure it's a positive and unique wrong answer
                    wrongAnswers.add(isTextMode ? numberToText(wrongAnswer) : wrongAnswer); // Convert wrong answers to text if in text mode
                }
            }
        }

        // Combine the correct answer and wrong answers into one array
        const options = [isTextMode && operation !== 'Tik' ? numberToText(correct) : correct, ...wrongAnswers];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);  // Shuffle the options

        // Set the shuffled options to state for rendering in the modal
        setAnswerOptions(shuffledOptions);
        setSelectedAnswer(null);  // Reset the selected answer
        setChooseAnswerModalVisible(true);  // Open the modal
    };

    const handleAnswerSelection = (selectedAnswer) => {
        setSelectedAnswer(selectedAnswer);  // Highlight the selected answer
    };

    const handleSubmitSelectedAnswer = () => {
    if (selectedAnswer === correctAnswer) {
        setToastMessage('Correct!');
        setToastType('success');
        setToastModalVisible(true);
        setCorrectAnswers(correctAnswers + 1);
        setChooseAnswerModalVisible(false);

        if (correctAnswers + 1 === 10) {
            setLevel(level + 1);
            setCorrectAnswers(0);
            setLevelCompletedModalVisible(true);
        }

        if (operation === 'Tik') {
            generateRandomTime();
        } else {
            generateQuestion();
        }
    } else {
        setToastMessage(`Wrong! The correct answer is ${correctAnswer}`);
        setToastType('error');
        setToastModalVisible(true);
        setChooseAnswerModalVisible(false);
    }
}

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleWhiteBoardOpen = () => {
        setWhiteBoardVisible(true); // Show the whiteboard modal
    };

    const handleWhiteBoardClose = () => {
        setWhiteBoardVisible(false); // Hide the whiteboard modal
    };

    const handleSignatureSave = async (signatureDataUrl) => {
        setSignature(signatureDataUrl); // Save the signature (sketch) data
        setWhiteBoardVisible(false); // Hide the whiteboard modal

        try {
            // Create FormData object to send file
            const formData = new FormData();
            formData.append("image", {
                uri: signatureDataUrl, // The 'signatureDataUrl' is a base64 URL
                type: "image/jpg", // Set the appropriate MIME type
                name: "signature.jpg", // Name of the file
            });

            // Send the FormData object to the API
            const response = await fetch(Base_url1 + "/deaf/digit/predict", {
                method: "POST",
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure correct header for form data
                },
            });

            // Handle the response
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                console.log('content', result);

                // Ensure both values are numbers and handle potential undefined values
                const apiResult = parseInt(result.result, 10);
                // const correctNum = parseInt(correctAnswer, 10);
                let correctNum;
                if (operation === 'subtraction') {
                    correctNum = number1 - number2;
                } else {
                    correctNum = number1 + number2;
                }
                console.log('result', apiResult);
                console.log('correct', correctNum);

                if (!isNaN(apiResult) && !isNaN(correctNum)) {
                    // Compare the API result with the correct answer
                    if (apiResult === correctNum) {
                    // if (correctNum === correctNum) {
                        setResultMessage('Correct! The answer is correct.');
                    } else {
                        setResultMessage(`Incorrect. The correct answer is: ${correctNum}`);
                    }
                } else {
                    setResultMessage("Failed to compare results. Please try again.");
                }

                setResultModalVisible(true); // Show the result modal
            } else {
                const text = await response.text();
                setResultMessage("Unexpected response format from server");
                setResultModalVisible(true);
            }
        } catch (error) {
            console.error("Error sending signature to API:", error);
            setResultMessage("Failed to send signature. Please check your connection or try again later.");
            setResultModalVisible(true);
        }
    };

    const handleSubmitAnswer = () => {
        if (userAnswer.trim() === '') {
            setToastMessage('Please enter the Answer');
            setToastType('error');
            setToastModalVisible(true);
        } else {
            let correctAnswer;

            if (operation === 'Tik') {
                correctAnswer = `${randomHour}:${randomMinutes < 10 ? '0' : ''}${randomMinutes}`;
            } else {
                correctAnswer = operation === 'subtraction' ? number1 - number2 : number1 + number2;
            }

            if (operation === 'Tik' && userAnswer.trim() === correctAnswer) {
                setToastMessage('Correct!');
                setToastType('success');
                setToastModalVisible(true);
                setCorrectAnswers(correctAnswers + 1);

                if (correctAnswers + 1 === 10) {
                    setLevel(level + 1);
                    setCorrectAnswers(0);
                    setLevelCompletedModalVisible(true);
                }

                handleCloseModal();
                generateRandomTime();
            } else if (parseInt(userAnswer) === correctAnswer) {
                setToastMessage('Correct!');
                setToastType('success');
                setToastModalVisible(true);
                setCorrectAnswers(correctAnswers + 1);

                if (correctAnswers + 1 === 10) {
                    setLevel(level + 1);
                    setCorrectAnswers(0);
                    setLevelCompletedModalVisible(true);
                }

                handleCloseModal();
                generateQuestion();
            } else {
                setToastMessage(`Wrong! The correct answer is ${correctAnswer}`);
                setToastType('error');
                setToastModalVisible(true);
                handleCloseModal();
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.greetingContainer}>
                <Text style={styles.goodMorningText}>{greeting}</Text>
                <Text style={styles.userName}>Aadhil</Text>
            </View>
            <View style={styles.progressContainer}>
                <Text style={styles.progressTitle}>PROGRESS</Text>
                <View style={styles.levelContainer}>
                    <Text style={styles.levelText}>Level {level < 10 ? `0${level}` : level}</Text>
                    <View style={styles.progressCircle}>
                        <Text style={styles.progressPercent}>{Math.min((correctAnswers / 10) * 100, 100)}%</Text>
                    </View>
                </View>
            </View>
            <View style={styles.questionContainer}>
                {operation !== 'Tik' && (
                    <TouchableOpacity style={styles.toggleModeButton} onPress={toggleMode}>
                        <Icon name={isTextMode ? "font" : "hashtag"} size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
                <Text style={styles.additionText}>{operation.toUpperCase()}</Text>
                {operation === 'Tik' ? (
                    <View style={styles.clockContainer}>
                        <AnalogClock
                            size={120}
                            colorClock="#fff"
                            colorNumber="#000"
                            colorCenter="#000"
                            hour={randomHour} // Use randomly generated hour
                            minutes={randomMinutes} // Use randomly generated minutes
                        />
                        {/* Add Skip button for Tik screen */}
                        <TouchableOpacity style={styles.skipButtonTik} onPress={generateRandomTime}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity style={styles.skipButton} onPress={generateQuestion}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                        <Text style={styles.questionText}>
                            {isTextMode ? `${numberToText(number1)} ${operation === 'subtraction' ? '-' : '+'} ${numberToText(number2)}` : `${number1} ${operation === 'subtraction' ? '-' : '+'} ${number2}`}
                        </Text>
                    </>
                )}
                <TouchableOpacity style={styles.hintButton} onPress={getHint}>
                    <Text style={styles.hintText}>GET A HINT</Text>
                </TouchableOpacity>
                {hint !== '' && <Text style={styles.hintDisplay}>{hint}</Text>}
            </View>

            <View style={styles.answerOptionsContainer}>
                <Text style={styles.answerOptionsTitle}>ANSWER OPTIONS</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton} onPress={handleTypeAnswerPress}>
                    <Icon name="keyboard-o" size={24} color="#6A5AE0" style={styles.icon} />
                    <Text style={styles.answerOption}>Type the Answer</Text>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton} onPress={handleChooseAnswerPress}>
                    <Icon name="list-ul" size={24} color="#6A5AE0" style={styles.icon} />
                    <Text style={styles.answerOption}>Choose the answer</Text>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>

                {/* Conditionally render the whiteboard button if the operation is not "Tik" */}
                {operation !== 'Tik' && (
                    <TouchableOpacity style={styles.answerButton} onPress={handleWhiteBoardOpen}>
                        <Icon name="pencil" size={24} color="#6A5AE0" style={styles.icon} />
                        <Text style={styles.answerOption}>Whiteboard</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                )}
            </View>


            {/* Modal for typing the answer */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalQuestionText}>
                            {operation === 'Tik'
                                ? 'Enter the Time'
                                : (isTextMode
                                    ? `${numberToText(number1)} ${operation === 'subtraction' ? '-' : '+'} ${numberToText(number2)}`
                                    : `${number1} ${operation === 'subtraction' ? '-' : '+'} ${number2}`)}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={operation === 'Tik' ? 'HH:MM' : 'Type your answer'}
                            value={userAnswer}
                            onChangeText={setUserAnswer}
                            keyboardType={operation === 'Tik' ? 'default' : 'numeric'}  // Use default for time input
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Whiteboard Modal */}
            <Modal visible={whiteBoardVisible} animationType="slide">
                <View style={styles.whiteboardContainer}>
                    <Text style={styles.whiteboardHeader}>Write on the Whiteboard</Text>
                    <Signature
                        style={styles.whiteboardSignature}
                        onOK={handleSignatureSave}
                        onEmpty={() => Toast.show({ type: 'info', text1: 'Whiteboard is empty' })}
                        onClear={() => Toast.show({ type: 'info', text1: 'Whiteboard cleared' })}
                        descriptionText="Use your finger to draw"
                        clearText="Clear"
                        confirmText="Submit"
                        penColor="black"
                        dotSize={3}
                        minWidth={3}
                        maxWidth={5}
                        backgroundColor="#FFFFFF"
                        webStyle={`.m-signature-pad { box-shadow: none; border: none; } 
                       .m-signature-pad--body { border: 1px solid #ccc; }`}
                    />
                    <View style={styles.whiteboardButtonContainer}>
                        <TouchableOpacity
                            style={styles.whiteboardButton}
                            onPress={handleWhiteBoardClose}
                        >
                            <Text style={styles.whiteboardButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Result Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={resultModalVisible}
                onRequestClose={() => setResultModalVisible(false)}
            >
                <View style={styles.toastModalContainer}>
                    <View style={[
                        styles.toastModalContent,
                        resultMessage.includes('Correct') ? styles.toastSuccess : styles.toastError
                    ]}>
                        <Text style={styles.toastModalText}>{resultMessage}</Text>
                        <TouchableOpacity
                            style={styles.toastModalButton}
                            onPress={() => setResultModalVisible(false)}
                        >
                            <Text style={styles.toastModalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for "Choose the answer" */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={chooseAnswerModalVisible}
                onRequestClose={() => setChooseAnswerModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalQuestionText}>
                            {operation === 'Tik'
                                ? 'Select the Time'  // Show 'Select the Time' for Tik operation
                                : (isTextMode
                                    ? `${numberToText(number1)} ${operation === 'subtraction' ? '-' : '+'} ${numberToText(number2)}`
                                    : `${number1} ${operation === 'subtraction' ? '-' : '+'} ${number2}`)}
                        </Text>
                        {answerOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.modalAnswerButton,
                                    selectedAnswer === option && styles.selectedAnswerButton
                                ]}
                                onPress={() => handleAnswerSelection(option)}
                            >
                                <Text style={[
                                    styles.modalAnswerText,
                                    selectedAnswer === option && styles.selectedAnswerText
                                ]}>
                                    {option} {/* Show the answer option */}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitSelectedAnswer}>
                            <Text style={styles.submitButtonText}>Submit Answer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setChooseAnswerModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for Level Completion */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={levelCompletedModalVisible}
                onRequestClose={() => setLevelCompletedModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentComplete}>
                        <Image style={styles.modalGif} source={require('../assets/tenor.gif')}></Image>
                        <Text style={styles.modalLevelCompletedText}>Level {level - 1} Completed!</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setLevelCompletedModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Toast Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={toastModalVisible}
                onRequestClose={() => setToastModalVisible(false)}
            >
                <View style={styles.toastModalContainer}>
                    <View style={[styles.toastModalContent,
                    toastType === 'success' ? styles.toastSuccess : styles.toastError]}>
                        <Text style={styles.toastModalText}>{toastMessage}</Text>
                        <TouchableOpacity
                            style={styles.toastModalButton}
                            onPress={() => setToastModalVisible(false)}
                        >
                            <Text style={styles.toastModalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#6A5AE0',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    greetingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    goodMorningText: {
        fontSize: 16,
        color: '#FFF',
    },
    userName: {
        fontSize: 16,
        color: '#FFF',
    },
    progressContainer: {
        position: 'absolute',
        width: 327,
        height: 84,
        top: 144,
        backgroundColor: '#FFC0CB',
        borderRadius: 15,
        padding: 10,
        justifyContent: 'center',
    },
    progressTitle: {
        fontSize: 14,
        color: '#D26A98',
        marginBottom: 5,
    },
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    levelText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8B0000',
    },
    progressCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF9EB3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressPercent: {
        fontSize: 16,
        color: '#FFF',
    },
    questionContainer: {
        width: '90%',
        backgroundColor: '#9A8BF1',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
        top: '18%'
    },
    toggleModeButton: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    additionText: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    skipButton: {
        position: 'absolute',
        width: 47,
        height: 44,
        right: '5%',
        top: 20,
        backgroundColor: '#FF9051',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: 'rgba(255, 161, 107, 0.6)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 32,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipButtonTik: {
        position: 'absolute',
        width: 47,
        height: 44,
        left: '75%',
        top: -10,
        backgroundColor: '#FF9051',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: 'rgba(255, 161, 107, 0.6)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 32,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipText: {
        fontSize: 14,
        color: '#FFF',
    },
    clockContainer: {
        marginTop: 20,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    hintButton: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    hintText: {
        fontSize: 16,
        color: '#6A5AE0',
    },
    hintDisplay: {
        marginTop: 10,
        fontSize: 16,
        color: '#FFF',
    },
    answerOptionsContainer: {
        width: '115%',
        height: '50%',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: '#F0F4FF',
        borderRadius: 50,
        marginTop: 200,
    },
    answerOptionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    seeAllButton: {
        position: 'absolute',
        right: 20,
        top: 30,
    },
    seeAllText: {
        fontSize: 14,
        color: '#8A75FF',
    },
    answerButton: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
        top: '3%'
    },
    answerOption: {
        fontSize: 18,
        color: '#6A5AE0',
        flex: 1,
    },
    arrow: {
        fontSize: 24,
        color: '#6A5AE0',
    },
    textInput: {
        width: '100%',
        borderColor: '#6A5AE0',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
        color: '#000'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modalContentComplete: {
        width: '80%',
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 20,
    },
    modalQuestionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    modalAnswerButton: {
        width: '100%',
        backgroundColor: '#6A5AE0',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#8257E5',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
    },
    selectedAnswerButton: {
        backgroundColor: '#FFA500',
    },
    modalAnswerText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    selectedAnswerText: {
        color: '#FFF',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#6A5AE0',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    modalLevelCompletedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    modalGif: {
        width: 150,
        height: 150,
        marginBottom: 20,
    }, whiteboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9F9', // Whiteboard-like background
        padding: 20,
    },
    whiteboardHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    whiteboardSignature: {
        width: '100%',
        height: '60%',
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    whiteboardButtonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        width: '100%',
    },
    whiteboardButton: {
        backgroundColor: '#6A5AE0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
    },
    whiteboardButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultModalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#32CD32', // LimeGreen for a correct answer
        textAlign: 'center',
        marginBottom: 20,
    },

    resultModalErrorText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF4500', // Red for an incorrect answer
        textAlign: 'center',
        marginBottom: 20,
    },

    resultButton: {
        marginTop: 20,
        backgroundColor: '#FF6347', // Vibrant Tomato color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#FF4500',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },

    resultButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    toastModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    toastModalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },

    toastSuccess: {
        backgroundColor: '#32CD32', // LimeGreen for success
    },

    toastError: {
        backgroundColor: '#FF6347', // Tomato Red for error
    },

    toastModalText: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 15,
    },

    toastModalButton: {
        marginTop: 10,
        backgroundColor: '#FFF',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },

    toastModalButtonText: {
        color: '#FF6347',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MathOperationScreen;