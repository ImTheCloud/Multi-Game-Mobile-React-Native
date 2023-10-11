import React, { useState } from 'react';
import {View, TextInput, StyleSheet, Image, ImageBackground, Text} from 'react-native';
import GameList from '../components/GameList';
import { useNavigation } from '@react-navigation/core';
import cielBackground from "../assets/blueBack.jpg";

const GameScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filtrer les jeux en fonction du terme de recherche
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Games</Text>
          <TextInput
              style={styles.searchInput}
              placeholder="Find a game"
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
          />
          <GameList
              games={filteredGames}
              onSelectGame={(game) => {
                navigation.navigate(game.screenName);
              }}
          />
        </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36, // Augmentez la taille du texte
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Couleur du texte
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop:70,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#16247d',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GameScreen;
