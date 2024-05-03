import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const LearnSignLanguageScreen = ({ navigation }) => {

    const handleAtoH = () => {
        navigation.navigate('ASL', { range: 'A to H' });
    }

    const handleItoP = () => {
        navigation.navigate('ASL', { range: 'I to P' });
    }

    const handleQtoOZ = () => {
        navigation.navigate('ASL', { range: 'Q to Z' });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.cover} source={require('../assets/ASL_Cover.jpg')}></Image>

            <TouchableOpacity style={styles.list} onPress={handleAtoH}>
                <Text style={styles.text1}>A - H</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.list} onPress={handleItoP}>
                <Text style={styles.text1}>I - P</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.list} onPress={handleQtoOZ}>
                <Text style={styles.text1}>Q - Z</Text>
            </TouchableOpacity>

            <Text></Text>

            
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
    cover: {
        width: '100%',
        height: '20%',
        alignSelf: 'center',
    },
    list: {
        top: '10%',
        backgroundColor: '#ADD8E6',
        alignSelf: 'center',
        height: '15%',
        width: '80%',
        borderRadius: 10,
    },
    text1: {
        fontSize: 30,
        fontWeight: '500',
        paddingTop: 30,
        textAlign: 'center',
        fontWeight: '800'
    },
});

export default LearnSignLanguageScreen;