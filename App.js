import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BrailleTeachScreen from './screens/BrailleTeachScreen';
import BrailleMenuScreen from './screens/BrailleMenuScreen';
import LetterScreen from './screens/LetterScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import BlindHomeScreen from './screens/BlindHomeScreen';
import BlindLesQuizScreen from './screens/BlindLesQuizScreen';
import LessonCategoryScreen from './screens/LessonCategoryScreen';
import BlindLessonScreen from './screens/BlindLessonScreen';
import MuteHomeScreen from './screens/MuteHomeScreen';
import LearnSignLanguageScreen from './screens/LearnSignLanguageScreen';
import ASLScreen from './screens/ASLScreen';
import MuteGifScreen from './screens/MuteGifScreen';
import GifWordScreen from './screens/GifWordScreen';
import MathQuizScreen from './screens/MathQuizScreen';
import AdditionScreen from './screens/AdditionScreen';
import TikTikScreen from './screens/TikTikScreen';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const ToastContainer = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Braille"
          component={BrailleTeachScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MathsQuiz"
          component={MathQuizScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={BrailleMenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Letter"
          component={LetterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Addition"
          component={AdditionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TikTik"
          component={TikTikScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlindHome"
          component={BlindHomeScreen}
          options={{ title: 'Learn for Blind Kids', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="BlindQuiz"
          component={BlindLesQuizScreen}
          options={{ title: 'Voice Learner', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="LessonCat"
          component={LessonCategoryScreen}
          options={{ title: 'Category', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="Lesson"
          component={BlindLessonScreen}
          options={{ title: 'Select Category', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="MuteHome"
          component={MuteHomeScreen}
          options={{ title: 'Learn for Deaf & Mute Kids', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="LearnSign"
          component={LearnSignLanguageScreen}
          options={{ title: 'Learn Sign Language', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="ASL"
          component={ASLScreen}
          options={{ title: 'Learn Sign Language', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="MuteGif"
          component={MuteGifScreen}
          options={{ title: 'Learn Sign Language', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
        <Stack.Screen
          name="GifWord"
          component={GifWordScreen}
          options={{ title: 'Learn Sign Language', headerTitleAlign: 'center', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#4D86F7' } }}
        />
      </Stack.Navigator>
      <ToastContainer />
    </NavigationContainer>
  );
};

export default App;
