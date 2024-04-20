import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


const BrailleTeachScreen = ({ navigation }) =>{

    const handleStartBtn = () => {
        navigation.navigate('Menu');
    }

    return(
        <View style={styles.container}>
            <Text style={styles.topicText}>Braille Teaching</Text>
            <Image style={styles.topImg} source={require('../assets/desktop.png')}></Image>
            <Text style={styles.textInstr}>Instructions</Text>
            <View style={styles.blueBox}>
            <Text style={styles.instructText}>1. Braille is a tactile writing system used by people who are visually impaired. {'\n'} {'\n'}
                2. Each Braille character or symbol consists of six dots arranged in two columns of three dots each. {'\n'}  {'\n'}
                3. There are 64 possible combinations of these six dots, giving Braille the ability to represent a vast array of symbols and characters.{'\n'} {'\n'}
            4. Braille readers typically read with their fingertips, feeling the raised dots on paper or using electronic devices.
            </Text>
            </View>
            <TouchableOpacity style={styles.startBtn} onPress={handleStartBtn}>
                <Text style={styles.startText}>START</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 'auto',
        height: '100%',
        backgroundColor: '#ffff',
    },
    topicText: {
        alignSelf: 'center',
        top: '7%',
        fontSize: 35,
        color: '#4D86F7',
        fontWeight: '500'
    },
    topImg: {
        alignSelf: 'center',
        top: '10%',
        width: '85%',
        height: '25%',
    },
    blueBox: {
        top: '15%',
        backgroundColor: '#ADD8E6',
        alignSelf: 'center',
        height: '35%',
        width: '95%',
        borderRadius: 20
    },
    textInstr: {
        top: '15%',
        left: '5%',
        fontSize: 25,
        fontStyle: 'italic',
        color: '#7C7878'
    },
    instructText: {
        top: '5%',
        textAlign: 'justify',
        marginTop: 10,
        paddingHorizontal: 20, 
    },
    startBtn: {
        top: '20%',
        alignSelf: 'center',
        backgroundColor: '#4D86F7',
        borderRadius: 15,
        height: '5%',
        width: '40%',
    },
    startText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#ffff',
        paddingTop: 3,
    },
});

export default BrailleTeachScreen;