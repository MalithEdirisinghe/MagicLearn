// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import * as Speech from 'expo-speech';

// const LessonCategory = ({ navigation, route }) => {
//     const { category, userName = 'User' } = route.params;

//     // Lesson data based on the passed category
//     const lessonDataMap = {
//         'daily-routines': [
//             { id: 1, title: 'Getting Dressed', completed: false },
//             { id: 2, title: 'Brushing Your Teeth', completed: false },
//             { id: 3, title: 'Eating Breakfast', completed: true },
//             { id: 4, title: 'Washing Hands', completed: true },
//             { id: 5, title: 'Going to Bed', completed: true },
//         ],
//         'animals': [
//             { id: 1, title: 'Dog', completed: false },
//             { id: 2, title: 'Cat', completed: false },
//             { id: 3, title: 'Cow', completed: true },
//             { id: 4, title: 'Parrot', completed: true },
//             { id: 5, title: 'Chicken', completed: true },
//         ],
//         'basic-hygiene': [
//             { id: 1, title: 'Washing Hands', completed: false },
//             { id: 2, title: 'Brushing Teeth', completed: true },
//             { id: 3, title: 'Taking a Bath', completed: true },
//             { id: 4, title: 'Keeping Nails Trimmed', completed: false },
//             { id: 5, title: 'Wearing Clean Clothes', completed: true },
//         ],
//         'vegetables-fruits': [
//             { id: 1, title: 'Describing Fruits by Texture and Taste', completed: false },
//             { id: 2, title: 'Recognizing Vegetables by Their Shape and Feel', completed: false },
//             { id: 3, title: 'Identifying Fruits by Their Smell', completed: true },
//             { id: 4, title: 'Understanding Vegetables by Their Taste', completed: true },
//             { id: 5, title: 'Matching Fruits and Vegetables to Their Descriptions', completed: true },
//         ],
//         'patterns-sequences': [
//             { id: 1, title: 'Introduction to Simple Patterns', completed: false },
//             { id: 2, title: 'Recognizing and Continuing Patterns', completed: false },
//             { id: 3, title: 'Creating Your Own Patterns', completed: true },
//             { id: 4, title: 'Understanding Sequences', completed: true },
//             { id: 5, title: 'Practice with Patterns and Sequences', completed: true },
//         ],
//         'human-body': [
//             { id: 1, title: 'Introduction to the Head and Face', completed: false },
//             { id: 2, title: 'Understanding the Arms and Hands', completed: false },
//             { id: 3, title: 'Learning About the Legs and Feet', completed: true },
//             { id: 4, title: 'Exploring the Heart and Lungs', completed: true },
//             { id: 5, title: 'Understanding the Stomach and Digestive System', completed: true },
//         ],
//         'mathematics': [
//             { id: 1, title: 'Understanding Numbers', completed: false },
//             { id: 2, title: 'Understanding Numbers (5 to 10)', completed: false },
//             { id: 3, title: 'Understanding More and Less', completed: true },
//         ],
//         'time-and-days': [
//             { id: 1, title: 'Understanding Morning, Afternoon, Evening, and Night', completed: false },
//             { id: 2, title: 'Understanding Days of the Week', completed: false },
//             { id: 3, title: 'Understanding Daily Activities with Time', completed: true },
//             { id: 4, title: 'Understanding Special Days of the Week', completed: true },
//         ],
//         'geography': [
//             { id: 1, title: 'Learning About Sri Lanka', completed: false },
//             { id: 2, title: 'Introduction to Continents', completed: false },
//             { id: 3, title: 'Learning About Oceans', completed: true },
//             { id: 4, title: 'Famous Landmarks Around the World', completed: true },
//         ],
//     };

//     // Default to 'daily-routines' if no category is passed
//     const lessonData = lessonDataMap[category] || lessonDataMap['daily-routines'];

//     const handleLessonPress = (lesson) => {
//         Speech.speak(lesson.title);
//         navigation.navigate('ListenLesson', { lessonTitle: lesson.title });
//     };

//     return (
//         <View style={styles.container}>
//             {/* Header Section */}
//             <View style={styles.header}>
//                 <View style={styles.greetingContainer}>
//                     <Text style={styles.greetingText}>Good Morning</Text>
//                 </View>
//             </View>

//             {/* Title */}
//             <Text style={styles.title}>{category.replace('-', ' ')}</Text>

//             {/* Lessons List */}
//             <View style={styles.lessonsContainer}>
//                 {lessonData.map((lesson) => (
//                     <TouchableOpacity
//                         key={lesson.id}
//                         style={styles.lessonItem}
//                         onPress={() => handleLessonPress(lesson)}
//                     >
//                         <Text style={styles.lessonIndex}>{`0${lesson.id}`}</Text>
//                         <Text style={styles.lessonText}>{lesson.title}</Text>
//                         <Image source={require('../assets/pending-badge.png')} style={styles.completedIcon} />
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

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Speech from 'expo-speech';

const LessonCategory = ({ navigation, route }) => {
    const { category, userName = 'User' } = route.params;
    const [lessonData, setLessonData] = useState([]);

    // Lesson data map based on the passed category
    const lessonDataMap = {
            'daily-routines': [
                { id: 1, title: 'Getting Dressed', completed: false },
                { id: 2, title: 'Brushing Your Teeth', completed: false },
                { id: 3, title: 'Eating Breakfast', completed: true },
                { id: 4, title: 'Washing Hands', completed: true },
                { id: 5, title: 'Going to Bed', completed: true },
            ],
            'animals': [
                { id: 1, title: 'Dog', completed: false },
                { id: 2, title: 'Cat', completed: false },
                { id: 3, title: 'Cow', completed: true },
                { id: 4, title: 'Parrot', completed: true },
                { id: 5, title: 'Chicken', completed: true },
            ],
            'basic-hygiene': [
                { id: 1, title: 'Washing Hands', completed: false },
                { id: 2, title: 'Brushing Teeth', completed: true },
                { id: 3, title: 'Taking a Bath', completed: true },
                { id: 4, title: 'Keeping Nails Trimmed', completed: false },
                { id: 5, title: 'Wearing Clean Clothes', completed: true },
            ],
            'vegetables-fruits': [
                { id: 1, title: 'Describing Fruits by Texture and Taste', completed: false },
                { id: 2, title: 'Recognizing Vegetables by Their Shape and Feel', completed: false },
                { id: 3, title: 'Identifying Fruits by Their Smell', completed: true },
                { id: 4, title: 'Understanding Vegetables by Their Taste', completed: true },
                { id: 5, title: 'Matching Fruits and Vegetables to Their Descriptions', completed: true },
            ],
            'patterns-sequences': [
                { id: 1, title: 'Introduction to Simple Patterns', completed: false },
                { id: 2, title: 'Recognizing and Continuing Patterns', completed: false },
                { id: 3, title: 'Creating Your Own Patterns', completed: true },
                { id: 4, title: 'Understanding Sequences', completed: true },
                { id: 5, title: 'Practice with Patterns and Sequences', completed: true },
            ],
            'human-body': [
                { id: 1, title: 'Introduction to the Head and Face', completed: false },
                { id: 2, title: 'Understanding the Arms and Hands', completed: false },
                { id: 3, title: 'Learning About the Legs and Feet', completed: true },
                { id: 4, title: 'Exploring the Heart and Lungs', completed: true },
                { id: 5, title: 'Understanding the Stomach and Digestive System', completed: true },
            ],
            'mathematics': [
                { id: 1, title: 'Understanding Numbers', completed: false },
                { id: 2, title: 'Understanding Numbers (5 to 10)', completed: false },
                { id: 3, title: 'Understanding More and Less', completed: true },
            ],
            'time-and-days': [
                { id: 1, title: 'Understanding Morning, Afternoon, Evening, and Night', completed: false },
                { id: 2, title: 'Understanding Days of the Week', completed: false },
                { id: 3, title: 'Understanding Daily Activities with Time', completed: true },
                { id: 4, title: 'Understanding Special Days of the Week', completed: true },
            ],
            'geography': [
                { id: 1, title: 'Learning About Sri Lanka', completed: false },
                { id: 2, title: 'Introduction to Continents', completed: false },
                { id: 3, title: 'Learning About Oceans', completed: true },
                { id: 4, title: 'Famous Landmarks Around the World', completed: true },
            ],
    };

    // Set initial lesson data based on the selected category
    useEffect(() => {
        let initialLessons = lessonDataMap[category] || lessonDataMap['daily-routines'];
        setLessonData(initialLessons);
    }, [category]);

    // Update lesson data if a lesson is marked as completed
    useEffect(() => {
        if (route.params?.completedLesson) {
            const updatedLessons = lessonData.map((lesson) =>
                lesson.title === route.params.completedLesson
                    ? { ...lesson, completed: true }
                    : lesson
            );
            setLessonData(updatedLessons);
        }
    }, [route.params?.completedLesson]);

    const handleLessonPress = (lesson) => {
        Speech.speak(lesson.title);
        navigation.navigate('ListenLesson', { lessonTitle: lesson.title, category });
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Good Morning</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{category.replace('-', ' ')}</Text>

            {/* Lessons List */}
            <View style={styles.lessonsContainer}>
                {lessonData.map((lesson) => (
                    <TouchableOpacity
                        key={lesson.id}
                        style={styles.lessonItem}
                        onPress={() => handleLessonPress(lesson)}
                    >
                        <Text style={styles.lessonIndex}>{`0${lesson.id}`}</Text>
                        <Text style={styles.lessonText}>{lesson.title}</Text>
                        <Image
                            source={
                                lesson.completed
                                    ? require('../assets/completed-badge.png')
                                    : require('../assets/pending-badge.png')
                            }
                            style={styles.completedIcon}
                        />
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 30,
        textAlign: 'center',
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
