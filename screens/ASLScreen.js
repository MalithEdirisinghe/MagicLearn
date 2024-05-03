import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

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

const ASLScreen = ({ navigation, route }) => {
    const { range } = route.params;
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [letters, setLetters] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [quizStarted, setQuizStarted] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [imageUri, setImageUri] = useState();

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
        if (currentLetterIndex < letters.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        } else {
            setQuizStarted(true);
        }
    };

    const handleStartQuiz = () => {
        setCurrentLetterIndex(0);
        setQuizStarted(true);
        showInstructions();
    };

    const showInstructions = () => {
        Alert.alert(
            'Instructions',
            'Here are the instructions for the quiz:\n1. Look at the letter displayed.\n2. If you are ready to proceed, press "Next".\n3. Once you reach the end, press "Start Quiz".\n4. After starting the quiz, you can capture images of each letter using the camera.'
        );
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


        } else {
            console.log('Image capture canceled');
        }
    };

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
                    <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
                        <Text style={styles.buttonText}>{imageUri ? 'Retake Image' : 'Open Camera'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    rangeText: {
        fontSize: 20,
        marginBottom: 10,
    },
    letterText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    ASLImage: {
        width: '90%',
        height: '60%',
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    startQuizButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
    },
    cameraPreview: {
        flex: 1,
    },
    captureButton: {
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    captureButtonText: {
        color: 'white',
        fontSize: 18,
    },
    image: {
        width: '90%',
        height: '70%',
        alignSelf: 'center',
    },
});

export default ASLScreen;