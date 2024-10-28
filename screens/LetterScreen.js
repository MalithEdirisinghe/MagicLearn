import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { speak } from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const brailleMappings = {
    A: [[true, false, false], [false, false, false]],
    B: [[true, true, false], [false, false, false]],
    C: [[true, false, false], [true, false, false]],
    D: [[true, false, false], [true, true, false]],
    E: [[true, false, false], [false, true, false]],
    F: [[true, true, false], [true, false, false]],
    G: [[true, true, false], [true, true, false]],
    H: [[true, true, false], [false, true, false]],
    I: [[false, true, false], [true, false, false]],
    J: [[false, true, false], [true, true, false]],
    K: [[true, false, true], [false, false, false]],
    L: [[true, true, true], [false, false, false]],
    M: [[true, false, true], [true, false, false]],
    N: [[true, false, true], [true, true, false]],
    O: [[true, false, true], [false, true, false]],
    P: [[true, true, true], [true, false, false]],
    Q: [[true, true, true], [true, true, false]],
    R: [[true, true, true], [false, true, false]],
    S: [[false, true, true], [true, false, false]],
    T: [[false, true, true], [true, true, false]],
    U: [[true, false, true], [false, false, true]],
    V: [[true, true, true], [false, false, true]],
    W: [[false, true, false], [true, true, true]],
    X: [[true, false, true], [true, false, true]],
    Y: [[true, false, true], [true, true, true]],
    Z: [[true, false, true], [false, true, true]],
};

const BrailleDot = ({ isActive }) => (
    <View style={[styles.brailleDot, isActive ? styles.activeDot : null]} />
);

const LetterScreen = ({ route }) => {
    const { range } = route.params;
    const [letter, setLetter] = useState(range.charAt(0));
    const [isLastLetter, setIsLastLetter] = useState(false);
    const navigation = useNavigation();

    const filteredMappings = Object.fromEntries(
        Object.entries(brailleMappings).filter(([key]) => {
            const firstLetter = range.charAt(0);
            const lastLetter = range.charAt(range.length - 1);
            return key >= firstLetter && key <= lastLetter;
        })
    );

    useEffect(() => {
        repeatSpeechThreeTimes(letter);
        checkLastLetter(letter);
    }, [letter]);

    const repeatSpeechThreeTimes = (letter) => {
        for (let i = 0; i < 3; i++) {
            speakLetter(letter);
        }
    };

    const speakLetter = (letter) => {
        const braillePattern = filteredMappings[letter];
        if (braillePattern) {
            let speech = `${letter}. `;
            braillePattern.forEach((row, rowIndex) => {
                row.forEach((isActive, columnIndex) => {
                    if (isActive) {
                        speech += `${rowIndex * 3 + columnIndex + 1} `;
                    }
                });
            });
            speak(speech, { language: "en", rate: 0.7 });
        }
    };

    const checkLastLetter = (currentLetter) => {
        const lastLetter = range.charAt(range.length - 1);
        setIsLastLetter(currentLetter === lastLetter);
    };

    const nextButton = () => {
        const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
        setLetter(nextLetter);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleRepeat = () => {
        repeatSpeechThreeTimes(letter);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.letter}>
                Letter <Text style={styles.letterHighlight}>{letter}</Text>
            </Text>
            <Image
                style={styles.speaker}
                source={require("../assets/speaker1.png")}
            />
            <View style={styles.brailleTxt}>
                {filteredMappings[letter]?.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.brailleRow}>
                        {row.map((isActive, columnIndex) => (
                            <BrailleDot key={columnIndex} isActive={isActive} />
                        ))}
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.repeatButton} onPress={handleRepeat}>
                <Text style={styles.buttonText}>Repeat</Text>
            </TouchableOpacity>

            {!isLastLetter && (
                <TouchableOpacity style={styles.nextButton} onPress={nextButton}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            )}

            {isLastLetter && (
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6", // Light background
        padding: 20,
    },
    letter: {
        fontSize: 30,
        color: "#4A90E2", // Blue color
        fontWeight: "bold",
        marginBottom: 20,
    },
    letterHighlight: {
        color: "#FF6347", // Tomato color
        fontSize: 50,
        fontWeight: "bold",
    },
    speaker: {
        width: "50%",
        height: "20%",
        resizeMode: "contain",
        marginVertical: 20,
    },
    brailleTxt: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 40,
    },
    brailleRow: {
        flexDirection: "column",
    },
    brailleDot: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: "gray",
        margin: 10,
    },
    activeDot: {
        backgroundColor: "#4A90E2", // Active dot color
    },
    repeatButton: {
        width: "80%",
        paddingVertical: 15,
        backgroundColor: "#4A90E2",
        borderRadius: 25,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5, // Add shadow
    },
    nextButton: {
        width: "80%",
        paddingVertical: 15,
        backgroundColor: "#32CD32", // Lime green for Next button
        borderRadius: 25,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5, // Add shadow
    },
    buttonText: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        backgroundColor: "#FF6347", // Tomato color
        borderRadius: 25,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5, // Add shadow
    },
});

export default LetterScreen;
