import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BlindLessonScreen = ({ navigation }) => {

    const handleButtonPress = (category) => {
        navigation.navigate('LessonCat', { category });
        console.log('cat: ', category);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.coverImg} source={require('../assets/blindkids.jpg')}></Image>
            <Text style={styles.subText}>Please choose a Category:</Text>
            <View style={styles.tile}>
                <Text style={styles.catText}>Category</Text>
                <TouchableOpacity style={styles.button1} onPress={() => handleButtonPress('Animals')}>
                    <Text style={styles.buttonText}>Animals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => handleButtonPress('Human Body')}>
                    <Text style={styles.buttonText}>Human Body</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button3} onPress={() => handleButtonPress('Transportation')}>
                    <Text style={styles.buttonText}>Transportation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button4} onPress={() => handleButtonPress('Fruits/Vegetables')}>
                    <Text style={styles.buttonText}>Fruits/Vegetables</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#ffff',
    },
    coverImg: {
        alignSelf: 'center',
        width: '100%',
        height: '25%',
        borderWidth: 1,
    },
    subText: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: '700',
        top: '2%'
    },
    catText: {
        fontSize: 25,
        marginBottom: 20,
        fontWeight: '900',
        alignSelf: 'center',
        top: '5%'
    },
    button1: {
        backgroundColor: '#4D86F7',
        width: '35%',
        height: '20%',
        borderRadius: 8,
        left: '10%',
        top: '10%'
    },
    button2: {
        backgroundColor: '#4D86F7',
        width: '35%',
        height: '20%',
        borderRadius: 8,
        left: '55%',
        top: '-10%'
    },
    button3: {
        backgroundColor: '#4D86F7',
        width: '35%',
        height: '20%',
        borderRadius: 8,
        left: '10%',
    },
    button4: {
        backgroundColor: '#4D86F7',
        width: '35%',
        height: '20%',
        borderRadius: 8,
        left: '55%',
        top: '-20%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center',
        top: '25%'
    },
    tile: {
        backgroundColor: '#ADD8E6',
        alignSelf: 'center',
        height: '50%',
        width: '95%',
        borderRadius: 20,
        top: '5%'
    },
});

export default BlindLessonScreen;
