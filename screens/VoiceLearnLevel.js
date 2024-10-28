import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Speech from 'expo-speech'; // Import the Speech module

const VoiceLearnLevel = ({ navigation }) => {

    const handleLevelPress = (level) => {
        navigation.navigate('VoiceLearnHome', { level });
    };

    // Function to speak the text
    const speak = (text) => {
        Speech.speak(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Ready, set, learn!</Text>
            </View>

            {/* Level List */}
            <TouchableOpacity
                style={styles.levelButton}
                onPress={() => {
                    speak('Level 1');
                    handleLevelPress(1);
                }}
            >
                <Text style={styles.levelText}>Level 1</Text>
                <View style={[styles.badge, styles.easyBadge]}>
                    <Text style={styles.badgeText}>EASY</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.levelButton}
                onPress={() => {
                    speak('Level 2');
                    handleLevelPress(2);
                }}
            >
                <Text style={styles.levelText}>Level 2</Text>
                <View style={[styles.badge, styles.mediumBadge]}>
                    <Text style={styles.badgeText}>MEDIUM</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.levelButton}
                onPress={() => {
                    speak('Level 3');
                    handleLevelPress(3);
                }}
            >
                <Text style={styles.levelText}>Level 3</Text>
                <View style={[styles.badge, styles.hardBadge]}>
                    <Text style={styles.badgeText}>HARD</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E9FF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'center',
        top: '40%',
        right: '150%'
    },
    backArrow: {
        top: 10,
        width: 30,
        height: 30,
    },
    levelButton: {
        backgroundColor: '#F8CACB',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: '50%'
    },
    levelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    badge: {
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    easyBadge: {
        backgroundColor: '#6FCF97',
    },
    mediumBadge: {
        backgroundColor: '#F2994A',
    },
    hardBadge: {
        backgroundColor: '#EB5757',
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default VoiceLearnLevel;
