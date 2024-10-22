import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

const MuteHomeScreen = ({ navigation }) => {
    const [greeting, setGreeting] = useState('');
    const [alphabetModalVisible, setAlphabetModalVisible] = useState(false); // Modal visibility state for Learn ASL Alphabet
    const [wordModalVisible, setWordModalVisible] = useState(false); // Modal visibility state for Learn ASL Word

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

    const handleLearnASLPress = () => {
        setAlphabetModalVisible(true); // Show Alphabet modal
    };

    const handleLearnASLWordPress = () => {
        setWordModalVisible(true); // Show Word modal
    };

    const handleNavigateLearnSign = () => {
        setAlphabetModalVisible(false); // Hide Alphabet modal
        navigation.navigate('LearnSign'); // Navigate after modal
    };

    const handleNavigateLearnWord = () => {
        setWordModalVisible(false); // Hide Word modal
        navigation.navigate('WordRange'); // Navigate to Learn Word screen
    };

    const handleButton2Press = () => {
        navigation.navigate('MuteGif');
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
            <TouchableOpacity style={styles.button} onPress={handleLearnASLPress}>
                <Text style={styles.buttonText}>Learn ASL ALPHABET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLearnASLWordPress}>
                <Text style={styles.buttonText}>Learn ASL Word</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
                <Text style={styles.buttonText}>Lesson & Quiz</Text>
            </TouchableOpacity>

            {/* Modal for ASL Alphabet Instructions */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={alphabetModalVisible}
                onRequestClose={() => setAlphabetModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>INSTRUCTIONS</Text>
                        <ScrollView contentContainerStyle={styles.modalBody}>
                            <Text style={styles.instructionsText}>
                                Choose the first set of Alphabet, {"\n"}and use the app to teach.{"\n"}
                                After completing the teaching part, {"\n"}let the child do the quiz.{"\n"}
                                If the child gets more than 2 letters correct, {"\n"}they can go to the next set of letters.{"\n"}
                                If not, they have to learn again and re-do the quiz.
                            </Text>
                        </ScrollView>
                        <TouchableOpacity style={styles.learnButton} onPress={handleNavigateLearnSign}>
                            <Text style={styles.learnButtonText}>Let's Learn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for ASL Word Instructions */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={wordModalVisible}
                onRequestClose={() => setWordModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>INSTRUCTIONS</Text>
                        <ScrollView contentContainerStyle={styles.modalBody}>
                            <Text style={styles.instructionsText1}>
                                Choose a category, {"\n"}and then choose a word inside and learn.{"\n"}
                                After learning, the child can attempt {"\n"}the quiz.{"\n"}
                                The questions will be random, {"\n"}so there won’t be any order.{"\n"}
                                If the child gets more than 75%,{"\n"}they can pass the quiz and move on to the {"\n"}next category.
                            </Text>
                        </ScrollView>
                        <TouchableOpacity style={styles.learnButton} onPress={handleNavigateLearnWord}>
                            <Text style={styles.learnButtonText}>Let's Learn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#5B3CBB',
    },
    modalBody: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    instructionsText: {
        fontSize: 13,
        color: '#fff',
        backgroundColor: '#1C3D99',
        padding: 8,
        borderRadius: 15,
        textAlign: 'center',
        width: '100%',
        alignSelf: 'center',
    },
    instructionsText1: {
        fontSize: 15,
        color: '#fff',
        backgroundColor: '#1C3D99',
        padding: 8,
        borderRadius: 15,
        textAlign: 'center',
        width: '100%',
        alignSelf: 'center',
    },
    learnButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    learnButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MuteHomeScreen;
