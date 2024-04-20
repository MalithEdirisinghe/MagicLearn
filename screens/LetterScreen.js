import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { speak } from "expo-speech";
import { TouchableOpacity } from "react-native-gesture-handler";

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

    const filteredMappings = Object.fromEntries(
        Object.entries(brailleMappings).filter(([key]) => {
            const firstLetter = range.charAt(0);
            const lastLetter = range.charAt(range.length - 1);
            return key >= firstLetter && key <= lastLetter;
        })
    );

    useEffect(() => {
        speakLetter(letter);
        checkLastLetter(letter);
    }, [letter]);

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
            for (let i = 0; i < 3; i++) {
                speak(speech, { language: "en", rate: 0.7 });
            }
        }
    };

    const checkLastLetter = (currentLetter) => {
        const lastLetter = range.charAt(range.length - 1);
        setIsLastLetter(currentLetter === lastLetter);
    };

    const nextButton = () => {
        const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
        setLetter(nextLetter);
    }

    return (
        <View style={styles.container}>
            {Object.keys(filteredMappings).map((key) => (
                <TouchableOpacity
                    key={key}
                    style={styles.letterButton}
                    onPress={() => setLetter(key)}
                >
                </TouchableOpacity>
            ))}
            <Text style={styles.letter}>
                Letter <Text style={{ color: "red", fontSize: 45 }}>{letter}</Text>
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
            {isLastLetter ? null : (
                <TouchableOpacity style={styles.nextButton} onPress={nextButton}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "auto",
        height: "100%",
        backgroundColor: "#ffff",
    },
    letter: {
        fontSize: 25,
        color: "#4D86F7",
        alignSelf: "center",
        top: "8%",
        fontWeight: "bold",
    },
    speaker: {
        width: "35%",
        height: "15%",
        alignSelf: "center",
        top: "8%",
    },
    brailleTxt: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 70,
    },
    brailleRow: {
        flexDirection: "column",
    },
    brailleDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "gray",
        margin: 15,
    },
    activeDot: {
        backgroundColor: "blue",
    },
    nextButton: {
        top: '20%',
        alignSelf: 'center',
        backgroundColor: '#4D86F7',
        borderRadius: 15,
        height: '25%',
        width: '40%',
    },
    nextText: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        paddingTop: 15,
    },
});

export default LetterScreen;