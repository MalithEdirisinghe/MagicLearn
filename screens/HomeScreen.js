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

    const handleButtonPress = () => {
        navigation.navigate('BlindHome');
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
            <Image style={styles.coverImg} source={images[imageIndex]}></Image>
            <Text style={styles.title}>Welcome to MagicLearn!</Text>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Blind</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Button 2')}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4D86F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 15,
    },
    logoutButton: {
        backgroundColor: 'red',
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
        alignSelf: 'center',
        width: '100%',
        height: '25%',
        borderWidth: 1,
        bottom: '22.5%'
    },
});

export default HomeScreen;