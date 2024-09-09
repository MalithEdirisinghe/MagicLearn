import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const VoiceLearnHome = ({ route, navigation }) => {
    // Get the level from the route params
    const { level } = route.params;

    // State to store the greeting message
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    const handleOptionPress = (option) => {
        // Navigate to the corresponding screen based on the option
        navigation.navigate(option);
    };

    return (
        <View style={styles.container}>
            {/* Header section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Ready, set, learn!</Text>
            </View>

            {/* Level Card */}
            <View style={styles.levelCard}>
                <View>
                    <Text style={styles.greetingText}>{greeting}</Text>
                    <Text style={styles.levelText}>Level {level}</Text>
                </View>
            </View>

            {/* Options section */}
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.chooseText}>Choose your option!</Text>

                {/* Daily Routines */}
                <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory')}>
                    <Image source={require('../assets/daily-routines.png')} style={styles.optionImage} />
                    <Text style={styles.optionText}>Daily Routines</Text>
                </TouchableOpacity>

                {/* Animals */}
                <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('Animals')}>
                    <Image source={require('../assets/Animals.png')} style={styles.optionImage} />
                    <Text style={styles.optionText}>Animals</Text>
                </TouchableOpacity>

                {/* Basic Hygiene */}
                <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('BasicHygiene')}>
                    <Image source={require('../assets/basic-hygiene.png')} style={styles.optionImage} />
                    <Text style={styles.optionText}>Basic Hygiene</Text>
                </TouchableOpacity>

                {/* Guidelines */}
                <Text style={styles.guidelinesText}>Guidelines</Text>
            </ScrollView>
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
        marginBottom: 30,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'center',
        top: '10%',
        right: '150%'
    },
    backArrow: {
        width: 24,
        height: 24,
    },
    levelCard: {
        flexDirection: 'row',
        backgroundColor: '#F8CACB',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        top: '10%'
    },
    greetingText: {
        fontSize: 16,
        color: '#B57B7B',
    },
    levelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8B0000',
    },
    profileIcon: {
        width: 50,
        height: 50,
    },
    scrollContainer: {
        marginTop: 10,
    },
    chooseText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    optionCard: {
        height: 100,
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    optionImage: {
        width: '100%',
        height: 150,
        borderRadius: 15,
    },
    optionText: {
        position: 'absolute',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center'
    },
    guidelinesText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: '#6C6C6C',
    },
});

export default VoiceLearnHome;
