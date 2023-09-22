import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import NumberGuessGame from './components/NumberGuessGame';
import TicTacToe from './components/TicTacToe';
import DrawingGame from './components/DrawingGame';
import RockPaperScissorsGame from './components/RockPaperScissorsGame';
import HangmanGame from './components/HangmanGame';
import SudokuGame from './components/SudokuGame';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NumberGuessGame" component={NumberGuessGame} />
        <Stack.Screen name="TicTacToe" component={TicTacToe} />
        <Stack.Screen name="DrawingGame" component={DrawingGame} />
        <Stack.Screen name="RockPaperScissorsGame" component={RockPaperScissorsGame} />
        <Stack.Screen name="HangmanGame" component={HangmanGame} />
        <Stack.Screen name="SudokuGame" component={SudokuGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
