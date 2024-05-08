import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const LessonCategoryScreen = ({ route, navigation }) => {
    const { category } = route.params;

    const categoriesData = {
        'Animals': ['Cat', 'Dog', 'Elephant', 'Parrot', 'Cow', 'Whale', 'Horse', 'Frog', 'Snake', 'Rabbit', 'Chicken(Rooster)'],
        'Human Body': ['Eyes', 'Ears', 'Nose', 'Mouth', 'Hands'],
        'Fruits/Vegetables': ['Apple', 'Banana', 'Carrot', 'Tomato', 'Cucumber'],
        'Transportation': ['Car', 'Bus', 'Bicycle', 'Train', 'Airplane']
    };

    const categoryItems = categoriesData[category];

    const handleItemPress = (item) => {
        navigation.navigate('Lesson', { selectedCategory: item, category: category });
        console.log('Selected item:', item);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.categoryText}>{category}</Text>
            <FlatList
                data={categoryItems}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    categoryText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 10,
        backgroundColor: 'rgba(173, 216, 230, 0.5)',
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    itemText: {
        fontSize: 18,
    },
});

export default LessonCategoryScreen;