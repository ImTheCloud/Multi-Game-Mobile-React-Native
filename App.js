import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import NumberGuessGame from './components/NumberGuessGame';
import Game1 from './components/TicTacToe';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NumberGuessGame" component={NumberGuessGame} />
        <Stack.Screen name="TicTacToe" component={Game1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
