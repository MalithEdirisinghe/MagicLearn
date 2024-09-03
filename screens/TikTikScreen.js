import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const TikTikScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(65); // Example progress state

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Good Morning</Text>
                <Text style={styles.username}>Aadhil</Text>
            </View>

            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>PROGRESS</Text>
                <Text style={styles.levelText}>Level 01</Text>
                <View style={styles.progressBarContainer}>
                    <View style={{ ...styles.progressBar, width: `${progress}%` }} />
                </View>
                <Text style={styles.progressPercentage}>{`${progress}%`}</Text>
            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>What time is it?</Text>
                <View style={styles.hintAndSkip}>
                    <TouchableOpacity style={styles.hintButton}>
                        <Text style={styles.hintText}>GET A HINT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.skipButton}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.answerOptionsContainer}>
                <Text style={styles.answerOptionsHeader}>ANSWER OPTIONS</Text>
                <TouchableOpacity style={styles.answerOption}>
                    <Text style={styles.answerOptionText}>Type the Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerOption}>
                    <Text style={styles.answerOptionText}>Choose the answer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerOption}>
                    <Text style={styles.answerOptionText}>White Board</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A5ACD',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    greeting: {
        fontSize: 16,
        color: '#FFF',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    progressContainer: {
        backgroundColor: '#FFB6C1',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    progressText: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 5,
    },
    levelText: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    progressBarContainer: {
        width: '100%',
        height: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FF4500',
    },
    progressPercentage: {
        fontSize: 14,
        color: '#FFF',
    },
    questionContainer: {
        backgroundColor: '#9370DB',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    clockImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    hintAndSkip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    hintButton: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    hintText: {
        color: '#9370DB',
        fontSize: 14,
    },
    skipButton: {
        backgroundColor: '#FF4500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    skipText: {
        color: '#FFF',
        fontSize: 14,
    },
    answerOptionsContainer: {
        marginTop: 20,
    },
    answerOptionsHeader: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 15,
    },
    answerOption: {
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    answerOptionText: {
        fontSize: 16,
        color: '#6A5ACD',
    },
});

export default TikTikScreen;
