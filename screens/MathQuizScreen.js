import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const MathQuizScreen = ({ navigation }) => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Ready, set, learn!</Text>
            <View style={styles.levelContainer}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.goodMorningText}>{greeting}</Text>
                </View>
            </View>
            <Text style={styles.subText}>Choose your option!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Addition', { operation: 'addition' })}>
                <ImageBackground source={require('../assets/Addition.png')} style={styles.imageBackground}>
                    <Text style={styles.buttonText}>ADDITION</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Addition', { operation: 'subtraction' })}>
                <ImageBackground source={require('../assets/Subtraction.png')} style={styles.imageBackground}>
                    <Text style={styles.buttonText}>SUBTRACTION</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TikTik')}>
                <ImageBackground source={require('../assets/Tik.png')} style={styles.imageBackground}>
                    <Text style={styles.buttonText}>Tik Tik Tik</Text>
                </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.guidelines}>Guidelines</Text>
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
    instructionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    levelContainer: {
        width: '90%',
        backgroundColor: '#FFC0CB',
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greetingContainer: {
        flexDirection: 'column',
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
        width: '90%',
        height: 100,
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    guidelines: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
    },
});

export default MathQuizScreen;