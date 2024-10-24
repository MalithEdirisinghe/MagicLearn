import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const VoiceLearnHome = ({ route, navigation }) => {
    const { level } = route.params;
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

    const handleOptionPress = (option, category) => {
        navigation.navigate(option, { category });
    };

    const renderOptions = () => {
        if (level === 1) {
            return (
                <>
                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'daily-routines')}>
                        <Image source={require('../assets/daily-routines.png')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Daily Routines</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'animals')}>
                        <Image source={require('../assets/Animals.png')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Animals</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'basic-hygiene')}>
                        <Image source={require('../assets/basic-hygiene.png')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Basic Hygiene</Text>
                    </TouchableOpacity>
                </>
            );
        } else if (level === 2) {
            return (
                <>
                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'vegetables-fruits')}>
                        <Image source={require('../assets/Level 2/vegetables-fruits.jpg')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Vegetables and Fruits</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'patterns-sequences')}>
                        <Image source={require('../assets/Level 2/patterns-sequences.jpg')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Patterns and Sequences</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'human-body')}>
                        <Image source={require('../assets/Level 2/human-body.jpg')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Human Body</Text>
                    </TouchableOpacity>
                </>
            );
        } else if (level === 3) {
            return (
                <>
                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'mathematics')}>
                        <Image source={require('../assets/Level 3/mathematics.jpg')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Mathematics</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'time-and-days')}>
                        <Image source={require('../assets/Level 3/time-days-week.jpg')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Time and Days of the Week</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('LessonCategory', 'geography')}>
                        <Image source={require('../assets/Level 3/geography.jpg')} style={styles.optionImage} />
                        <View style={styles.overlay} />
                        <Text style={styles.optionText}>Geography</Text>
                    </TouchableOpacity>
                </>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Ready, set, learn!</Text>
            </View>

            <View style={styles.levelCard}>
                <View>
                    <Text style={styles.greetingText}>{greeting}</Text>
                    <Text style={styles.levelText}>Level {level}</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.chooseText}>Choose your option!</Text>

                {renderOptions()}

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
        right: '150%',
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
        top: '10%',
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
        position: 'relative', // Add relative positioning for the overlay
    },
    optionImage: {
        width: '100%',
        height: 150,
        borderRadius: 15,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent overlay
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
        alignSelf: 'center',
    },
    guidelinesText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: '#6C6C6C',
    },
});

export default VoiceLearnHome;
