import React from 'react';
import { View, StyleSheet } from 'react-native';
import GameList from '../components/GameList';
import { useNavigation } from '@react-navigation/core';

const GameScreen = () => {
  const navigation = useNavigation();

  const games = [
    {
      title: 'Flappy Bird',
      screenName: 'FlappyBird',
      image: require('../assets/flappybird.png'),
    },
    {
      title: 'Tic Tac Toe',
      screenName: 'TicTacToe',
      image: require('../assets/tic-tac-toe.png'),
    },
    {
      title: 'Hangman Game',
      screenName: 'HangmanGame',
      image: require('../assets/hangman.png'),
    },
    {
      title: 'Rock Paper Scissors',
      screenName: 'RockPaperScissorsGame',
      image: require('../assets/rockPaperScissors.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <GameList
        games={games}
        onSelectGame={(game) => {
          navigation.navigate(game.screenName);
          
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameScreen;
