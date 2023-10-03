import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import TicTacToe from './games/TicTacToe';
import RockPaperScissorsGame from './games/RockPaperScissorsGame';
import HangmanGame from './games/HangmanGame';
import FlappyBird from './games/FlappyBird';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator(); //gere la navigation

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TicTacToe" component={TicTacToe} />
        <Stack.Screen name="RockPaperScissorsGame" component={RockPaperScissorsGame} />
        <Stack.Screen name="HangmanGame" component={HangmanGame} />
        <Stack.Screen name="FlappyBird" component={FlappyBird} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
