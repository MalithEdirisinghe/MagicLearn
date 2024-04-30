import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { speak } from 'expo-speech';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';


const BlindLessonScreen = ({ route }) => {

    const { selectedCategory } = route.params;

    const lessonsData = {
        'Dog': [
            { name: 'Dog', lesson: "A dog is a friendly animal with fur all over its body. Dogs have four legs and a wagging tail. They use their nose to smell things around them. Dogs come in different sizes and colors. Some dogs are big like a bear, while others are small like a toy. Dogs make sounds like 'bark' or 'woof' to communicate with people." }
        ],
        'Whale': [
            { name: 'Whale', lesson: "A whale is a large marine mammal that lives in the ocean.It has a streamlined body with smooth, dark skin and a powerful tail for swimming.Whales are known for their immense size, with some species being the largest animals on Earth.They breathe air through blowholes on top of their heads and communicate with each other using various vocalizations." }
        ],
        'Horse': [
            { name: 'Horse', lesson: "A horse is a strong and majestic animal. Horses have a mane on their neck and a long tail. They have four legs and hooves that make clip-clop sounds when they walk. Horses come in many colors like brown, black, or white. Some horses are tall like a tree, while others are smaller like a pony. Horses neigh to communicate with other horses and humans." }
        ],
        'Rabbit': [
            { name: 'Rabbit', lesson: "A rabbit is a small furry animal with long ears. Rabbits have soft fur that you can pet. They have four legs and a fluffy tail. Rabbits come in different colors like gray, brown, or white. Some rabbits have spots or stripes on their fur. Rabbits hop around using their strong back legs. They make sounds like 'thump' or 'sniff' as they move and explore." }
        ],
        'Eyes': [
            { name: 'Eyes', lesson: "Eyes are organs of the visual system. They provide organisms with vision, the ability to receive and process visual detail, as well as enabling several photo response functions that are independent of vision. Eyes detect light and convert it into electro-chemical impulses in neurons." }
        ],
        'Ears': [
            { name: 'Ears', lesson: "The ear is the organ of hearing and, in mammals, balance. In mammals, the ear is usually described as having three parts—the outer ear, the middle ear and the inner ear. The outer ear consists of the pinna and the ear canal. The middle ear consists of the ossicles and is connected to the throat by the eustachian tube. The inner ear contains the cochlea which is involved in hearing and the vestibular system which is involved in balance." }
        ],
        'Nose': [
            { name: 'Nose', lesson: "The nose is the body's primary organ of smell and functions as part of the upper respiratory system. The nose also plays a major role in taste (the mouth senses five tastes, the nose senses thousands of scents), and helps filter out dust and particles from the air we breathe." }
        ],
        'Mouth': [
            { name: 'Mouth', lesson: "The mouth is the opening in your face where you eat, speak, and breathe. It has lips, teeth, and a tongue inside. The mouth helps you taste and chew food, as well as form words and sounds when you talk. You use it to enjoy delicious flavors and express yourself." }
        ],
        'Hands': [
            { name: 'Hands', lesson: "Hands are the parts of your body at the end of your arms. They have fingers and thumbs that you use for grasping and touching. Hands help you feel things like textures, shapes, and temperatures. You use them to hold objects, write, and play games." }
        ],
        'Car': [
            { name: 'Car', lesson: "A car is a vehicle with four wheels that you use for transportation. It has seats for passengers and a steering wheel for controlling direction. Cars can go fast or slow depending on how much you press the gas pedal. They are used for driving to different places like school, work, or the grocery store." }
        ],
        'Bus': [
            { name: 'Bus', lesson: "A bus is a large vehicle that carries many people from one place to another. It has rows of seats inside and doors for passengers to enter and exit. Buses run on roads and follow specific routes to pick up and drop off passengers. They are used for public transportation in cities and towns." }
        ],
        'Bicycle': [
            { name: 'Bicycle', lesson: "A bicycle is a two-wheeled vehicle that you pedal with your feet to move forward. It has handlebars for steering and brakes for stopping. Bicycles come in different sizes and styles, including ones with training wheels for beginners. They are used for riding around neighborhoods, parks, and bike trails." }
        ],
        'Train': [
            { name: 'Train', lesson: "A train is a long vehicle that runs on tracks and carries passengers or cargo. It consists of multiple cars connected together and is powered by an engine at the front. Trains travel long distances between cities and towns, stopping at stations along the way to pick up and drop off passengers." }
        ],
        'Airplane': [
            { name: 'Airplane', lesson: "An airplane is a flying vehicle with wings and engines that allow it to soar through the sky. It has seats for passengers and windows for looking outside. Airplanes take off and land at airports and fly to destinations all over the world. They are used for traveling long distances quickly." }
        ],
        'Apple': [
            { name: 'Apple', lesson: "An apple is a round fruit with smooth skin. It comes in different colors like red, green, or yellow. Apples are crunchy and juicy. They have a stem on top and a core inside with seeds. Apples are delicious to eat raw or used in pies and juices." }
        ],
        'Banana': [
            { name: 'Banana', lesson: "A banana is a long, curved fruit with a peel. It is yellow when ripe and soft to touch. Bananas have a sweet taste and creamy texture. They grow in bunches on trees. Bananas are a healthy snack and can be eaten on their own or added to smoothies and desserts." }
        ],
        'Carrot': [
            { name: 'Carrot', lesson: "A carrot is a long, slender vegetable with a bright orange color. It has a crunchy texture and a sweet taste. Carrots grow underground and have green leaves on top. They are rich in vitamins and good for your eyesight" }
        ],
        'Tomato': [
            { name: 'Tomato', lesson: "A tomato is a round fruit with smooth, shiny skin. It comes in different colors like red, yellow, or orange. Tomatoes have juicy flesh and small seeds inside. They grow on vines and are used in salads, sauces, and sandwiches." }
        ],
        'Cucumber': [
            { name: 'Cucumber', lesson: "A cucumber is a long, cylindrical vegetable with smooth, green skin. It has a crisp texture and a mild, refreshing taste. Cucumbers are commonly eaten raw in salads or used to make pickles. They contain a high amount of water and are hydrating." }
        ],
    };

    const questionsData = {
        'Dog': [
            "What sound does a dog make?",
            "How many legs does a dog have?",
            "What part of their body do dogs use to smell things?",
            "What is the tail of a dog used for?",
            "What do you call a baby dog?"
        ],
        'Whale': [
            "Where does a whale live?",
            "What does a whale's body look like?",
            "How does a whale swim?",
            "What is a notable characteristic of whales?",
            "How do whales breathe and communicate?"
        ],
        // Add more categories and their corresponding questions as needed
    };

    const lessons = lessonsData[selectedCategory];
    const questions = questionsData[selectedCategory];

    const speakCategoryName = () => {
        speak(selectedCategory, { language: 'en', rate: 0.7 });
    };

    useEffect(() => {
        speakCategoryName();
    }, []);

    const speakLesson = (lessonText) => {
        speak(lessonText, { language: 'en', rate: 0.7 });
    };

    const speakQuestion = (question) => {
        speak(question, { language: 'en', rate: 0.7 });
    };

    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleQuizButtonPress = () => {
        setShowQuiz(true);
        speakQuestion(questions[currentQuestionIndex]);
    };

    const [recording, setRecording] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioURI, setRecordedAudioURI] = useState(null);

    useEffect(() => {
        return () => {
            if (recording) {
                stopRecording();
            }
        };
    }, []);

    const startRecording = async () => {
        if (isRecording) return; // Prevent starting a new recording if one is already active
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording...');
            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync({
                android: {
                    extension: '.flac',
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
                    sampleRate: 16000,
                    numberOfChannels: 2,
                },
                ios: {
                    extension: '.m4a',
                    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
                    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
            });
            await newRecording.startAsync();
            setRecording(newRecording);
            setIsRecording(true);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };



    const stopRecording = async () => {
        console.log('Stopping recording..');
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording stopped and stored at', uri);
            setRecordedAudioURI(uri);
        } catch (err) {
            // console.error('Failed to stop recording', err);
        }
    };

    const playRecordedAudio = async () => {
        if (!recordedAudioURI) return;
        const { sound } = await Audio.Sound.createAsync({ uri: recordedAudioURI });
        await sound.playAsync();
    };


    const [transcription, setTranscription] = useState(null);

    const sendAudioToCloudFunction = async (base64Audio) => {
        try {
            const response = await fetch('https://us-central1-magiclearn-421711.cloudfunctions.net/function-1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ audioBase64: base64Audio }),
            });
            console.log('response: ', response);

            if (!response.ok) {
                throw new Error('Failed to send audio to Cloud Function');
            }

            const result = await response.text();
            console.log(result); // Should print 'Conversion successful' if successful
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const sendAudioToSpeechToText = async () => {
        try {
            // Check if recording is available
            if (!recording || !recording.getURI) {
                console.error('Recording is not available or does not have a valid URI');
                return;
            }

            // Get the URI of the recorded audio
            const uri = recording.getURI();

            // Check if URI is available
            if (!uri) {
                console.error('Recording URI is not available');
                return;
            }

            // Read the audio file as base64
            const base64Audio = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            console.log('Base64 Audio:', base64Audio);

            // Send the base64 audio to the Cloud Function
            await sendAudioToCloudFunction(base64Audio);

            const response = await fetch(
                'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyDKqJAdut7sTZqUZFF9aHk8ibVToA9htSI',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "config": {
                            "encoding": "FLAC",
                            "sampleRateHertz": 8000,
                            "languageCode": "en-US",
                            "enableWordTimeOffsets": false
                        },
                        "audio": {
                            "uri": "gs://magic_learn-1/audio.flac"
                        }
                    }),
                }
            );

            console.log('API Response:', response);

            // Parse the response
            const data = await response.json();

            console.log('Transcription Data:', data);

            // Extract the transcript from the response
            const transcript = data.results[0]?.alternatives[0]?.transcript;


            if (!transcript) {
                console.error('Transcript not found in the response');
                return;
            }

            // Update state with the transcript
            setTranscription(transcript);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.categoryText}>{selectedCategory}</Text>
            <FlatList
                data={lessons}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => speakLesson(item.lesson)}>
                        <View style={styles.lessonContainer}>
                            <Text style={styles.lessonText}>{item.name}</Text>
                            <Text style={styles.lessonDescription}>{item.lesson}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={sendAudioToSpeechToText}>
                <Text>obanna</Text>
            </TouchableOpacity>
            {showQuiz && (
                <View style={styles.quizContainer}>
                    <Text style={styles.quizHeader}>Quiz Questions</Text>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
                        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording}>
                            <Text style={{ fontSize: 24 }}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
                        </TouchableOpacity>
                        <Button title="Play Recorded Audio" onPress={playRecordedAudio} />
                    </View>
                </View>
            )}
            {!showQuiz && (
                <View style={styles.buttonContainer}>
                    <Button title="Quiz" onPress={handleQuizButtonPress} />
                </View>
            )}
            {transcription && (
                <View style={styles.transcriptionContainer}>
                    <Text style={styles.transcriptionText}>{transcription}</Text>
                </View>
            )}
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
    lessonContainer: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 10,
        backgroundColor: 'rgba(173, 216, 230, 0.5)',
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    lessonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lessonDescription: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: 'center',
    },
    quizContainer: {
        marginTop: 20,
    },
    quizHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    questionContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
    },
    questionText: {
        fontSize: 16,
    },
    textContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    recognizedText: {
        fontSize: 16,
    },
});

export default BlindLessonScreen;