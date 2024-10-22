import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, RefreshControl } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // For lock icon
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // For screen focus

const SignWordRangeScreen = ({ navigation }) => {
    // State to manage unlocked ranges
    const [unlockedRanges, setUnlockedRanges] = useState({
        'Family Relations': true,  // Initially unlocked
        'Actions': false,
        'Social Manners': false
    });

    // State to handle refresh
    const [refreshing, setRefreshing] = useState(false);

    // State to force a screen update
    const [isUpdated, setIsUpdated] = useState(false);

    // Load unlocked ranges from AsyncStorage
    const loadUnlockedRanges = async () => {
        try {
            const ranges = ['Actions', 'Social Manners'];
            const newUnlockedRanges = { ...unlockedRanges };

            // Loop through each range and check if it is unlocked
            for (const range of ranges) {
                const isUnlocked = await AsyncStorage.getItem(`unlocked_${range}`);
                if (isUnlocked === 'true') {
                    newUnlockedRanges[range] = true;
                }
            }

            // Update state with the loaded unlocked ranges
            setUnlockedRanges(newUnlockedRanges);
            setIsUpdated(prev => !prev); // Toggle state to force re-render
        } catch (error) {
            console.error('Failed to load unlocked ranges', error);
        }
    };

    // Use focus effect to reload unlocked ranges when the screen is focused
    useFocusEffect(
        useCallback(() => {
            loadUnlockedRanges(); // Reload unlocked ranges when screen is focused
        }, [])
    );

    // Handler for each range press
    const handleRangePress = (range, isLocked) => {
        if (isLocked) {
            // Show alert if the range is locked
            Alert.alert("Range Locked", "You need to complete the previous ranges to unlock this one.");
        } else {
            // Navigate to the ASL screen if the range is unlocked
            navigation.navigate('SignWordScreen', { range });
        }
    };

    // Reset unlocked ranges and clear AsyncStorage
    const resetUnlockedRanges = async () => {
        try {
            const ranges = ['Actions', 'Social Manners'];
            for (const range of ranges) {
                await AsyncStorage.removeItem(`unlocked_${range}`);
            }

            // Reset state to the initial values
            setUnlockedRanges({
                'Family Relations': true,
                'Actions': false,
                'Social Manners': false
            });

            setIsUpdated(prev => !prev); // Force update to re-render
        } catch (error) {
            console.error('Failed to reset unlocked ranges', error);
        }
    };

    // Handle refresh action
    const onRefresh = async () => {
        setRefreshing(true);
        await resetUnlockedRanges(); // Reset lock states
        await loadUnlockedRanges(); // Reload ranges from AsyncStorage
        setRefreshing(false); // Stop refresh indicator
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text style={styles.title}>LET'S START</Text>
            <Image style={styles.cover} source={require('../assets/ASL.png')} />

            <View style={styles.whiteBack}>
                {/* A to D - Unlocked initially */}
                <TouchableOpacity
                    style={styles.list}
                    onPress={() => handleRangePress('Family Relations', !unlockedRanges['Family Relations'])}
                >
                    <LinearGradient colors={['#0039A9', '#005ED9']} style={styles.gradient}>
                        <Text style={styles.text1}>FAMILY RELATIONS</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* E to H */}
                <TouchableOpacity
                    style={styles.list}
                    onPress={() => handleRangePress('Ac', !unlockedRanges['E to H'])}
                >
                    <LinearGradient colors={['#0039A9', '#005ED9']} style={styles.gradient}>
                        <Text style={styles.text1}>ACTIONS</Text>
                        {!unlockedRanges['Actions'] && (
                            <Ionicons name="lock-closed" size={24} color="white" style={styles.lockIcon} />
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                {/* I to L */}
                <TouchableOpacity
                    style={styles.list}
                    onPress={() => handleRangePress('I to L', !unlockedRanges['I to L'])}
                >
                    <LinearGradient colors={['#0039A9', '#005ED9']} style={styles.gradient}>
                        <Text style={styles.text1}>SOCIAL MANNERS</Text>
                        {!unlockedRanges['Social Manners'] && (
                            <Ionicons name="lock-closed" size={24} color="white" style={styles.lockIcon} />
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#5B3CBB',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
    },
    cover: {
        width: '100%',
        height: 150,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 40,
    },
    list: {
        width: '80%',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gradient: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 25,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    lockIcon: {
        marginLeft: 10,
    },
    whiteBack: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
    },
});

export default SignWordRangeScreen;
