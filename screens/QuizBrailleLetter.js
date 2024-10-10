// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as Speech from 'expo-speech';
// import {Base_url1} from './baseUrl'

// const QuizScreen = ({ route, navigation }) => {
//     const { questions, range } = route.params;
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const [loading, setLoading] = useState(false);

//     // API URLs for each range
//     const apiUrls = {
//         "A to E": Base_url1+"/blind/word/predict",
//         "F to J": Base_url1 + "/blind/word/fj/predict",
//         "K to O": Base_url1 + "/blind/word/ko/predict",
//         "P to T": Base_url1 + "/blind/word/pt/predict",
//         "U to Z": Base_url1 + "/blind/word/uz/predict"
//     };

//     // Function to speak the question 3 times when the screen opens or when the question changes
//     const speakQuestion = (question) => {
//         for (let i = 0; i < 3; i++) {
//             Speech.speak(question);
//         }
//     };

//     // Use useEffect to trigger speech when the component loads or the current question changes
//     useEffect(() => {
//         const currentQuestion = questions[currentQuestionIndex];
//         speakQuestion(currentQuestion);
//     }, [currentQuestionIndex]);

//     const handleOpenCamera = async () => {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Permission Denied', 'You need to grant camera permission to use this feature.');
//             return;
//         }

//         const result = await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setCapturedImage(result.assets[0].uri); // Save the captured image URI
//         } else {
//             console.log('Image capture canceled');
//         }
//     };

//     const handleRetakeImage = () => {
//         setCapturedImage(null); // Reset the captured image, so the user can retake the image
//     };

//     const handleSubmitAnswer = async () => {
//         if (!capturedImage) return;

//         setLoading(true);
//         const apiUrl = apiUrls[range]; // Get the API URL based on the range

//         const formData = new FormData();
//         formData.append('image', {
//             uri: capturedImage,
//             name: 'image.jpg',
//             type: 'image/jpeg',
//         });

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.ok) {
//                 const responseData = await response.json();
//                 const predictedClass = responseData.predicted_class;

//                 // Compare the predicted class with the current question
//                 const currentQuestion = questions[currentQuestionIndex];

//                 if (predictedClass.toLowerCase() === currentQuestion.toLowerCase()) {
//                     Alert.alert('Correct', 'Your answer is correct!');
//                 } else {
//                     Alert.alert('Incorrect', `Your answer is incorrect. The correct answer is: ${currentQuestion}`);
//                 }
//             } else {
//                 throw new Error('Failed to submit the image.');
//             }
//         } catch (error) {
//             Alert.alert('Error', error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleNextQuestion = () => {
//         setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
//         setCapturedImage(null); // Clear the previous image
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.quizTitle}>Quiz for {range}</Text>

//             <Text style={styles.questionText}>
//                 {questions[currentQuestionIndex]}
//             </Text>

//             {/* Display the captured image if available */}
//             {capturedImage ? (
//                 <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
//             ) : null}

//             {/* Display "Open Camera" or "Retake Image" Button based on whether an image has been captured */}
//             <TouchableOpacity
//                 style={styles.cameraButton}
//                 onPress={capturedImage ? handleRetakeImage : handleOpenCamera}
//             >
//                 <Text style={styles.buttonText}>
//                     {capturedImage ? 'Retake Image' : 'Open Camera'}
//                 </Text>
//             </TouchableOpacity>

//             {/* Submit Answer Button (only visible after image is captured) */}
//             {capturedImage && (
//                 <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
//                     {loading ? (
//                         <ActivityIndicator size="small" color="#FFF" />
//                     ) : (
//                         <Text style={styles.buttonText}>Submit Answer</Text>
//                     )}
//                 </TouchableOpacity>
//             )}

//             {/* Next Question Button */}
//             {currentQuestionIndex < questions.length - 1 && capturedImage && (
//                 <TouchableOpacity
//                     style={styles.nextButton}
//                     onPress={handleNextQuestion}
//                 >
//                     <Text style={styles.buttonText}>Next Question</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#EFEAFF',
//     },
//     quizTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     questionText: {
//         fontSize: 20,
//         marginBottom: 20,
//     },
//     cameraButton: {
//         backgroundColor: '#4CAF50',
//         paddingVertical: 12,
//         paddingHorizontal: 40,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     submitButton: {
//         backgroundColor: '#FFA500',
//         paddingVertical: 12,
//         paddingHorizontal: 40,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     nextButton: {
//         backgroundColor: '#FF7F50',
//         paddingVertical: 12,
//         paddingHorizontal: 40,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     capturedImage: {
//         width: 300,
//         height: 300,
//         marginTop: 20,
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#FF7F50',
//     },
// });

// export default QuizScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import { Base_url1 } from './baseUrl';

const QuizScreen = ({ route, navigation }) => {
    const { questions, range } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [capturedImage, setCapturedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // API URLs for each range
    const apiUrls = {
        "A to E": Base_url1 + "/blind/word/predict",
        "F to J": Base_url1 + "/blind/word/fj/predict",
        "K to O": Base_url1 + "/blind/word/ko/predict",
        "P to T": Base_url1 + "/blind/word/pt/predict",
        "U to Z": Base_url1 + "/blind/word/uz/predict"
    };

    // Function to speak the question 3 times when the screen opens or when the question changes
    const speakQuestion = (question) => {
        for (let i = 0; i < 3; i++) {
            Speech.speak(question);
        }
    };

    // Use useEffect to trigger speech when the component loads or the current question changes
    useEffect(() => {
        const currentQuestion = questions[currentQuestionIndex];
        speakQuestion(currentQuestion);
    }, [currentQuestionIndex]);

    const handleOpenCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'You need to grant camera permission to use this feature.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setCapturedImage(result.assets[0].uri); // Save the captured image URI
        } else {
            console.log('Image capture canceled');
        }
    };

    const handleOpenGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'You need to grant gallery access permission to use this feature.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setCapturedImage(result.assets[0].uri); // Save the selected image URI from the gallery
        } else {
            console.log('Image selection canceled');
        }
    };

    const handleRetakeImage = () => {
        setCapturedImage(null); // Reset the captured image, so the user can retake the image
    };

    const handleSubmitAnswer = async () => {
        if (!capturedImage) return;

        setLoading(true);
        const apiUrl = apiUrls[range]; // Get the API URL based on the range

        const formData = new FormData();
        formData.append('image', {
            uri: capturedImage,
            name: 'image.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                const predictedClass = responseData.predicted_class;

                // Compare the predicted class with the current question
                const currentQuestion = questions[currentQuestionIndex];

                if (predictedClass.toLowerCase() === currentQuestion.toLowerCase()) {
                    Alert.alert('Correct', 'Your answer is correct!');
                } else {
                    Alert.alert('Incorrect', `Your answer is incorrect. The correct answer is: ${currentQuestion}`);
                }
            } else {
                throw new Error('Failed to submit the image.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
        setCapturedImage(null); // Clear the previous image
    };

    return (
        <View style={styles.container}>
            <Text style={styles.quizTitle}>Quiz for {range}</Text>

            <Text style={styles.questionText}>
                {questions[currentQuestionIndex]}
            </Text>

            {/* Display the captured image if available */}
            {capturedImage ? (
                <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
            ) : null}

            {/* Display "Open Camera" or "Retake Image" Button based on whether an image has been captured */}
            <TouchableOpacity
                style={styles.cameraButton}
                onPress={capturedImage ? handleRetakeImage : handleOpenCamera}
            >
                <Text style={styles.buttonText}>
                    {capturedImage ? 'Retake Image' : 'Open Camera'}
                </Text>
            </TouchableOpacity>

            {/* Add "Open Gallery" Button */}
            {!capturedImage && (
                <TouchableOpacity
                    style={styles.galleryButton}
                    onPress={handleOpenGallery}
                >
                    <Text style={styles.buttonText}>Open Gallery</Text>
                </TouchableOpacity>
            )}

            {/* Submit Answer Button (only visible after image is captured or selected) */}
            {capturedImage && (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Submit Answer</Text>
                    )}
                </TouchableOpacity>
            )}

            {/* Next Question Button */}
            {currentQuestionIndex < questions.length - 1 && capturedImage && (
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNextQuestion}
                >
                    <Text style={styles.buttonText}>Next Question</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEAFF',
    },
    quizTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
    },
    cameraButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    galleryButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#FF7F50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    capturedImage: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FF7F50',
    },
});

export default QuizScreen;
