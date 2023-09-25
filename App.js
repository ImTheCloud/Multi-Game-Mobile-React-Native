import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import NumberGuessGame from './games/NumberGuessGame';
import TicTacToe from './games/TicTacToe';
import RockPaperScissorsGame from './games/RockPaperScissorsGame';
import HangmanGame from './games/HangmanGame';
import SudokuGame from './games/SudokuGame';
import FlappyBird from './games/FlappyBird';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NumberGuessGame" component={NumberGuessGame} />
        <Stack.Screen name="TicTacToe" component={TicTacToe} />
        <Stack.Screen name="RockPaperScissorsGame" component={RockPaperScissorsGame} />
        <Stack.Screen name="HangmanGame" component={HangmanGame} />
        <Stack.Screen name="SudokuGame" component={SudokuGame} />
        <Stack.Screen name="FlappyBird" component={FlappyBird} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
