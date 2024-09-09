import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For FontAwesome icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // For MaterialIcons
import * as Speech from 'expo-speech'; // For speech functionality

const ListenLesson = ({ route, navigation }) => {
    const { lessonTitle } = route.params;

    // This is the updated lesson content based on your provided data
    const lessonText = `
        Let’s have fun getting dressed in the morning! First, you get to choose your clothes. You might pick a soft t-shirt that feels smooth and a pair of comfy pants. Imagine how nice it will feel to wear them! Start by putting on your t-shirt; pull it over your head and slide your arms into the sleeves. Next, put on your pants, one leg at a time. How cozy do they feel? Finally, don’t forget your socks to keep your feet warm and shoes to protect your toes. Now you’re all dressed and ready for a great day!
    `;

    const [isPlaying, setIsPlaying] = useState(false);
    const [speechRate, setSpeechRate] = useState(1.0); // Default speech rate

    // Play or Pause Speech
    const handleSpeechPlayPause = () => {
        if (isPlaying) {
            Speech.stop();  // Stop the speech
            setIsPlaying(false);
        } else {
            Speech.speak(lessonText, { rate: speechRate });  // Speak the lesson text with the selected rate
            setIsPlaying(true);
        }
    };

    // Change the speech rate
    const changeSpeechRate = (rate) => {
        if (isPlaying) {
            Speech.stop();  // Stop the current speech
            setIsPlaying(false);
            setSpeechRate(rate);  // Update the speech rate
            Speech.speak(lessonText, { rate });  // Play with new rate
            setIsPlaying(true);
        } else {
            setSpeechRate(rate);  // Update the speech rate
        }
    };

    // Adjust to center the text based on the screen size
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.lessonTitle}>{lessonTitle}</Text>
            </View>

            {/* Audio Player Section */}
            <View style={styles.audioPlayer}>
                <Text style={styles.audioTitle}>{lessonTitle}</Text>

                <View style={styles.audioControls}>
                    <TouchableOpacity onPress={handleSpeechPlayPause}>
                        <MaterialIcon
                            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}  // Using MaterialIcons
                            size={50}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>

                {/* Speech Speed Controls */}
                <View style={styles.speedControls}>
                    <TouchableOpacity onPress={() => changeSpeechRate(0.5)}>
                        <Text style={[styles.speedText, speechRate === 0.5 && styles.activeSpeed]}>
                            0.5x
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeSpeechRate(0.75)}>
                        <Text style={[styles.speedText, speechRate === 0.75 && styles.activeSpeed]}>
                            0.75x
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeSpeechRate(1.0)}>
                        <Text style={[styles.speedText, speechRate === 1.0 && styles.activeSpeed]}>
                            1x
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeSpeechRate(1.5)}>
                        <Text style={[styles.speedText, speechRate === 1.5 && styles.activeSpeed]}>
                            1.5x
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeSpeechRate(2.0)}>
                        <Text style={[styles.speedText, speechRate === 2.0 && styles.activeSpeed]}>
                            2x
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Lesson Text Section */}
            <ScrollView contentContainerStyle={{ ...styles.lessonContent, minHeight: screenHeight }}>
                <Text style={styles.lessonText}>
                    {lessonText}
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A5AE0',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    lessonTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        right: '100%'
    },
    audioPlayer: {
        backgroundColor: '#9A8BF1',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    audioTitle: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    audioControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    speedControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    speedText: {
        fontSize: 18,
        color: '#fff',
        marginHorizontal: 10,
    },
    activeSpeed: {
        fontWeight: 'bold',
        color: '#FFD700',
    },
    lessonContent: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 15,
        alignItems: 'flex-start',  // Ensure the text is aligned to the left
    },
    lessonText: {
        fontSize: 18,
        color: '#333',
        lineHeight: 26,
        textAlign: 'left',  // Left-align text
    },
});

export default ListenLesson;
