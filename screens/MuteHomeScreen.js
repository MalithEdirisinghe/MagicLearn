import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MuteHomeScreen = ({ navigation }) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good Morning');
        } else if (hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    const handleButton1Press = () => {
        navigation.navigate('LearnSign');
    };

    const handleButton2Press = () => {
        navigation.navigate('MuteGif');
    };
    const handleButton3Press = () => {
        navigation.navigate('SignWordScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.instructionText}>Learn for Deaf & Mute Kids</Text>
                <View style={styles.levelContainer}>
                    <Text style={styles.goodMorningText}>{greeting}</Text>
                    <View style={styles.profilePic} />
                </View>
            </View>
            <Text style={styles.subText}>Choose your option!</Text>
            <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
                <Text style={styles.buttonText}>Learn ASL ALPHABET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButton3Press}>
                <Text style={styles.buttonText}>Learn ASL Word</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
                <Text style={styles.buttonText}>Lesson & Quiz</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E8F9',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    instructionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    levelContainer: {
        width: '90%',
        backgroundColor: '#FFC0CB',
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    goodMorningText: {
        fontSize: 16,
        color: '#000',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8A2BE2',
    },
    subText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    guidelines: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
    },
});

export default MuteHomeScreen;
