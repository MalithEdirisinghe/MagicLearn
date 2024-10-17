// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// const LearnSignLanguageScreen = ({ navigation }) => {

//     const handleAtoH = () => {
//         navigation.navigate('ASL', { range: 'A to H' });
//     }

//     const handleItoP = () => {
//         navigation.navigate('ASL', { range: 'I to P' });
//     }

//     const handleQtoOZ = () => {
//         navigation.navigate('ASL', { range: 'Q to Z' });
//     }

//     return (
//         <View style={styles.container}>
//             <Image style={styles.cover} source={require('../assets/ASL_Cover.jpg')}></Image>

//             <TouchableOpacity style={styles.list} onPress={handleAtoH}>
//                 <Text style={styles.text1}>A - H</Text>
//             </TouchableOpacity>

//             <Text></Text>

//             <TouchableOpacity style={styles.list} onPress={handleItoP}>
//                 <Text style={styles.text1}>I - P</Text>
//             </TouchableOpacity>

//             <Text></Text>

//             <TouchableOpacity style={styles.list} onPress={handleQtoOZ}>
//                 <Text style={styles.text1}>Q - Z</Text>
//             </TouchableOpacity>

//             <Text></Text>

            
//         </View>
//     );

// };


// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         width: 'auto',
//         height: '100%',
//         backgroundColor: '#ffff',
//     },
//     cover: {
//         width: '100%',
//         height: '20%',
//         alignSelf: 'center',
//     },
//     list: {
//         top: '10%',
//         backgroundColor: '#ADD8E6',
//         alignSelf: 'center',
//         height: '15%',
//         width: '80%',
//         borderRadius: 10,
//     },
//     text1: {
//         fontSize: 30,
//         fontWeight: '500',
//         paddingTop: 30,
//         textAlign: 'center',
//         fontWeight: '800'
//     },
// });

// export default LearnSignLanguageScreen;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // For lock icon

const LearnSignLanguageScreen = ({ navigation }) => {

    const handleAtoD = () => {
        navigation.navigate('ASL', { range: 'A to D' });
    }

    const handleEtoH = () => {
        navigation.navigate('ASL', { range: 'E to H' });
    }

    const handleItoL = () => {
        navigation.navigate('ASL', { range: 'I to L' });
    }

    const handleMtoP = () => {
        navigation.navigate('ASL', { range: 'M to P' });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LET'S START</Text>
            <Image style={styles.cover} source={require('../assets/ASL_Cover.jpg')} />

            {/* A-D unlocked */}
            <TouchableOpacity style={styles.list} onPress={handleAtoD}>
                <Text style={styles.text1}>A - D</Text>
            </TouchableOpacity>

            {/* E-H locked */}
            <TouchableOpacity style={styles.listLocked} onPress={handleEtoH}>
                <Text style={styles.text1}>E - H</Text>
                <Ionicons name="lock-closed" size={24} color="white" style={styles.lockIcon} />
            </TouchableOpacity>

            {/* I-L locked */}
            <TouchableOpacity style={styles.listLocked} onPress={handleItoL}>
                <Text style={styles.text1}>I - L</Text>
                <Ionicons name="lock-closed" size={24} color="white" style={styles.lockIcon} />
            </TouchableOpacity>

            {/* M-P locked */}
            <TouchableOpacity style={styles.listLocked} onPress={handleMtoP}>
                <Text style={styles.text1}>M - P</Text>
                <Ionicons name="lock-closed" size={24} color="white" style={styles.lockIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B3CBB', // Purple background
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
        width: '80%',
        height: 150,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 40,
    },
    list: {
        backgroundColor: '#1C3D99', // Blue button color for unlocked
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listLocked: {
        backgroundColor: '#1C3D99', // Blue button color for locked
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default LearnSignLanguageScreen;
