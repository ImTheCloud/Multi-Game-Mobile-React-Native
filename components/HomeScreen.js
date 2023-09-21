import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GameList from './GameList';

const games = [
  {
    title: 'Number Guess Game',
    screenName: 'NumberGuessGame',
    image: require('../assets/logoGuessNumber.png'), 
  },
  {
    title: 'Drawing Game',
    screenName: 'DrawingGame',
    image: require('../assets/drawingGame.png'), 
  },
  {
    title: 'Tic Tac Toe',
    screenName: 'TicTacToe',
    image: require('../assets/tic-tac-toe.png'),
  },
  {
    title: 'Rock Paper Scissors',
    screenName: 'RockPaperScissorsGame',
    image: require('../assets/rockPaperScissors.png'),
  },
  {
    title: 'Hangman Game',
    screenName: 'HangmanGame', 
    image: require('../assets/hangman.png'), 
  },
];

export default function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Masquer l'en-tête sur cette page
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Multi Game Mobile</Text>
      </View>
      <GameList
        games={games}
        onSelectGame={(game) => {
          navigation.navigate(game.screenName);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
