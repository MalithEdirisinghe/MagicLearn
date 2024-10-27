import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // For arrow icon
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import { useNavigation } from '@react-navigation/native'; // Import navigation
import * as Speech from 'expo-speech';;

const screenHeight = Dimensions.get('window').height; // Declare screenHeight globally

const CaptureLearn = () => {
    const [greeting, setGreeting] = useState('Good Morning'); // State to hold the greeting
    const navigation = useNavigation(); // Initialize navigation

    // Function to get the current greeting based on the time of day
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good Morning';
        } else if (currentHour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    const handleViewSavedText = () => {
        Speech.speak("Do a previous lesson");
        navigation.navigate('SavedText');
    }; 
    
    const handleScanLesson = () => {
        Speech.speak("Scan new lesson");
        navigation.navigate('ScanLessonScreen');
    };

    // Use useEffect to set the greeting when the component mounts
    useEffect(() => {
        const currentGreeting = getGreeting();
        setGreeting(currentGreeting);
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.greetingContainer}>
                    <Icon name="sun-o" size={18} color="#FFF" />
                    <Text style={styles.greetingText}>{greeting}</Text>
                </View>
                <Text style={styles.headText}>Capture & Learn</Text>
            </View>

            {/* Learn Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/learn-english.png')} // Replace with your image path
                    style={styles.learnImage}
                    resizeMode="cover"
                />
            </View>

            {/* Gradient Background with Choose Options */}
            <LinearGradient
                colors={['#FFFFFF', '#D8EFFF']} // Adjust gradient colors if needed
                style={styles.gradientContainer}
            >
                <Text style={styles.chooseText}>CHOOSE OPTIONS</Text>

                {/* Option Buttons */}
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={handleScanLesson} // Navigate to ScanLessonScreen
                >
                    <View style={styles.optionContent}>
                        <Icon name="barcode" size={24} color="#4A4A4A" />
                        <Text style={styles.optionText}>Scan new lesson</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#4A4A4A" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={handleViewSavedText}>
                    <View style={styles.optionContent}>
                        <Icon name="book" size={24} color="#4A4A4A" />
                        <Text style={styles.optionText}>Do a previous lesson</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#4A4A4A" />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A5AE0',
        padding: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headText: {
        fontSize: 30,
        fontWeight: '800',
        color: '#FFFF',
        top: '20%',
        right: '300%'
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greetingText: {
        fontSize: 14,
        color: '#FFF',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    profilePicContainer: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    profileImage: {
        width: 40,
        height: 40,
    },
    imageContainer: {
        marginTop: 20,
        borderRadius: 15,
        overflow: 'hidden',
        top: '10%',
    },
    learnImage: {
        width: '100%',
        height: screenHeight * 0.3, // Adjust height according to screen size
    },
    gradientContainer: {
        marginTop: 30,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        top: '15%'
    },
    chooseText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5, // For Android shadow
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#4A4A4A',
        fontWeight: 'bold',
    },
});

export default CaptureLearn;
