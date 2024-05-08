import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MuteHomeScreen = ({ navigation }) => {
    const handleButton1Press = () => {
        navigation.navigate('GifWord');
    };

    const handleButton2Press = () => {
        // navigation.navigate('BlindQuiz');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.coverImg} source={require('../assets/mute.jpg')}></Image>
            <Text style={styles.instructionText}>Let's learn sign language for words</Text>
            <Text style={styles.subText}>Please choose an option:</Text>
            <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
                <Text style={styles.buttonText}>Capture the Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
                <Text style={styles.buttonText}>Math Question</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    instructionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subText: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4D86F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    coverImg: {
        width: '100%',
        height: '20%',
        alignSelf: 'center',
    },
});

export default MuteHomeScreen;
