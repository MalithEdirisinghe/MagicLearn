import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import * as Speech from 'expo-speech'; // Import Expo Speech module

const SavedTextScreen = ({ navigation }) => {
    const [savedTexts, setSavedTexts] = useState([]);

    useEffect(() => {
        // Fetch saved extracted texts from AsyncStorage when the screen loads
        const fetchSavedTexts = async () => {
            try {
                const texts = await AsyncStorage.getItem('extractedTexts');
                const parsedTexts = texts ? JSON.parse(texts) : [];
                setSavedTexts(parsedTexts);
            } catch (error) {
                console.error('Error fetching saved texts:', error);
                Alert.alert('Error', 'Failed to fetch saved texts.');
            }
        };

        fetchSavedTexts();
    }, []);

    // Handle selecting a saved text
    const handleSelectText = (textObj) => {
        // Start speech synthesis for the topic
        if (textObj.topic) {
            Speech.speak(textObj.topic, {
                rate: 1.0,
                onDone: () => {
                    // Navigate to the detail screen after speech finishes
                    navigation.navigate('TextDetail', {
                        topic: textObj.topic,
                        text: textObj.text,
                        nouns: textObj.nouns, // Pass nouns
                        verbs: textObj.verbs  // Pass verbs
                    });
                }
            });
        } else {
            // Navigate immediately if topic is not available
            navigation.navigate('TextDetail', {
                topic: 'Untitled',
                text: textObj.text,
                nouns: textObj.nouns, // Pass nouns
                verbs: textObj.verbs  // Pass verbs
            });
        }
    };

    // Handle deleting a saved text
    const handleDeleteText = (index) => {
        const updatedTexts = [...savedTexts];
        updatedTexts.splice(index, 1);
        setSavedTexts(updatedTexts);
        AsyncStorage.setItem('extractedTexts', JSON.stringify(updatedTexts));
        Alert.alert('Deleted', 'Text has been deleted.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Previous Lessons</Text>
            <ScrollView style={styles.scrollView}>
                {savedTexts.length > 0 ? (
                    savedTexts.map((textObj, index) => (
                        <View key={index} style={styles.cardContainer}>
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => handleSelectText(textObj)}
                            >
                                <Text style={styles.cardNumber}>{index + 1}</Text>
                                <Text style={styles.cardTitle}>{textObj.topic || 'Untitled'}</Text>
                                <Menu>
                                    <MenuTrigger>
                                        <Entypo name="dots-three-vertical" size={24} color="#6A5AE0" />
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption onSelect={() => handleDeleteText(index)}>
                                            <Text style={[styles.menuText, { color: 'red' }]}>Delete</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noText}>No saved texts available.</Text>
                )}
            </ScrollView>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#6A5AE0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6A5AE0',
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6A5AE0',
        flex: 1,
        textAlign: 'center'
    },
    menuText: {
        fontSize: 16,
        padding: 10,
    },
    noText: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#FFA500',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SavedTextScreen;
