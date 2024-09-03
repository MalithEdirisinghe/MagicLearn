import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebase';

const HomeScreen = ({ navigation }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const images = [require('../assets/cover1.jpg'), require('../assets/cover2.jpg'), require('../assets/cover3.jpg')];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        const backAction = () => {
            if (navigation.isFocused()) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            clearInterval(intervalId);
            backHandler.remove();
        };
    }, []);

    const handleBlindButtonPress = () => {
        navigation.navigate('BlindHome');
    };

    const handleMuteButtonPress = () => {
        navigation.navigate('MuteHome');
    };

    const handleLogout = async () => {
        try {
            signOut(auth)
                .then(() => {
                    navigation.navigate('Login');
                })
                .catch((error) => {
                    console.error('Error logging out:', error);
                });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleLogoutButtonPress = () => {
        showLogoutAlert();
    };

    const showLogoutAlert = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: handleLogout,
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Image style={styles.coverImg} source={images[imageIndex]} />
            <Text style={styles.title}>Welcome to MagicLearn!</Text>
            <TouchableOpacity style={styles.button} onPress={handleBlindButtonPress}>
                <Text style={styles.buttonText}>Blind</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleMuteButtonPress}>
                <Text style={styles.buttonText}>Deaf & Mute</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutButtonPress}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
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
    coverImg: {
        alignSelf: 'center',
        width: '115%',
        height: '25%',
        borderWidth: 1,
        bottom: '8%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
    logoutButton: {
        backgroundColor: 'red',
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
});

export default HomeScreen;
