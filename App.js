import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BrailleTeachScreen from './screens/BrailleTeachScreen';
import BrailleMenuScreen from './screens/BrailleMenuScreen';
import LetterScreen from './screens/LetterScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Braille"
          component={BrailleTeachScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;