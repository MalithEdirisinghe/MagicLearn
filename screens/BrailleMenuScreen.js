import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const BrailleMenuScreen = ({ navigation }) => {

    const handleAtoE = () => {
        navigation.navigate('Letter', { range: 'A to E' });
    }

    const handleFtoJ = () => {
        navigation.navigate('Letter', { range: 'F to J' });
    }

    const handleKtoO = () => {
        navigation.navigate('Letter', { range: 'K to O' });
    }

    const handlePtoT = () => {
        navigation.navigate('Letter', { range: 'P to T' });
    }

    const handleUtoZ = () => {
        navigation.navigate('Letter', { range: 'U to Z' });
    }


    return(
        <View style={styles.container}>
            <Image style={styles.speaker} source={require('../assets/speaker.png')}></Image>

            <TouchableOpacity style={styles.AtoE} onPress={handleAtoE}>
                <Text style={styles.text1}>1.                           A to E</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.AtoE} onPress={handleFtoJ}>
                <Text style={styles.text1}>2.                           F to J</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.AtoE} onPress={handleKtoO}>
                <Text style={styles.text1}>3.                           K to O</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.AtoE} onPress={handlePtoT}>
                <Text style={styles.text1}>4.                           P to T</Text>
            </TouchableOpacity>

            <Text></Text>

            <TouchableOpacity style={styles.AtoE} onPress={handleUtoZ}>
                <Text style={styles.text1}>5.                           U to Z</Text>
            </TouchableOpacity>
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
    speaker: {
        width: '35%',
        height: '15%',
        alignSelf: 'center',
        top: '8%'
    },
    AtoE: {
        top: '15%',
        backgroundColor: '#ADD8E6',
        alignSelf: 'center',
        height: '7.5%',
        width: '95%',
        borderRadius: 10,
    },
    text1: {
        fontSize: 20,
        fontWeight: '500',
        left: '5%',
        paddingTop: 15,
    },
});

export default BrailleMenuScreen;