// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// const LessonCategory = ({ navigation, route }) => {
//     const { userName } = route.params || { userName: 'User' };

//     const lessonData = [
//         { id: 1, title: 'Getting Dressed', completed: false },
//         { id: 2, title: 'Brushing Your Teeth', completed: false },
//         { id: 3, title: 'Eating Breakfast', completed: true },
//         { id: 4, title: 'Washing Hands', completed: true },
//         { id: 5, title: 'Going to Bed', completed: true },
//     ];

//     return (
//         <View style={styles.container}>
//             {/* Header Section */}
//             <View style={styles.header}>
//                 <View style={styles.greetingContainer}>
//                     <Text style={styles.greetingText}>Good Morning</Text>
//                     <Text style={styles.userName}>{userName}</Text>
//                 </View>
//             </View>

//             {/* Title */}
//             <Text style={styles.title}>Daily Routines</Text>

//             {/* Lessons List */}
//             <View style={styles.lessonsContainer}>
//                 {lessonData.map((lesson, index) => (
//                     <TouchableOpacity key={lesson.id} style={styles.lessonItem}>
//                         <Text style={styles.lessonIndex}>{`0${lesson.id}`}</Text>
//                         <Text style={styles.lessonText}>{lesson.title}</Text>
//                         {lesson.completed && (
//                             <Image source={require('../assets/completed-badge.png')} style={styles.completedIcon} />
//                         )}
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#6A5AE0',
//         paddingHorizontal: 20,
//         paddingTop: 50,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     greetingContainer: {
//         justifyContent: 'center',
//     },
//     greetingText: {
//         fontSize: 16,
//         color: '#FFD700',
//         fontWeight: 'bold',
//     },
//     userName: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#FFF',
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//         marginBottom: 30,
//         textAlign: 'center'
//     },
//     lessonsContainer: {
//         backgroundColor: '#FFF',
//         borderRadius: 20,
//         paddingVertical: 20,
//         paddingHorizontal: 10,
//     },
//     lessonItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingVertical: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#EAEAEA',
//     },
//     lessonIndex: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#6246EA',
//     },
//     lessonText: {
//         fontSize: 18,
//         color: '#333',
//         flex: 1,
//         marginLeft: 20,
//     },
//     completedIcon: {
//         width: 30,
//         height: 30,
//     },
// });

// export default LessonCategory;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LessonCategory = ({ navigation, route }) => {
    const { userName } = route.params || { userName: 'User' };

    const lessonData = [
        { id: 1, title: 'Getting Dressed', completed: false },
        { id: 2, title: 'Brushing Your Teeth', completed: false },
        { id: 3, title: 'Eating Breakfast', completed: true },
        { id: 4, title: 'Washing Hands', completed: true },
        { id: 5, title: 'Going to Bed', completed: true },
    ];

    const handleLessonPress = (lesson) => {
        navigation.navigate('ListenLesson', { lessonTitle: lesson.title });
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Good Morning</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Daily Routines</Text>

            {/* Lessons List */}
            <View style={styles.lessonsContainer}>
                {lessonData.map((lesson, index) => (
                    <TouchableOpacity
                        key={lesson.id}
                        style={styles.lessonItem}
                        onPress={() => handleLessonPress(lesson)}
                    >
                        {/* Ensure all text is wrapped in <Text> */}
                        <Text style={styles.lessonIndex}>{`0${lesson.id}`}</Text>
                        <Text style={styles.lessonText}>{lesson.title}</Text>
                        {lesson.completed && (
                            <Image source={require('../assets/completed-badge.png')} style={styles.completedIcon} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A5AE0',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greetingContainer: {
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 16,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 30,
        textAlign: 'center'
    },
    lessonsContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    lessonIndex: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6246EA',
    },
    lessonText: {
        fontSize: 18,
        color: '#333',
        flex: 1,
        marginLeft: 20,
    },
    completedIcon: {
        width: 30,
        height: 30,
    },
});

export default LessonCategory;
