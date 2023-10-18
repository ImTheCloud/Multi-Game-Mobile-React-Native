import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import GameList from '../components/GameList';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
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
      title: 'Quizz',
      screenName: 'Quizz',
      image: require('../assets/quizz.png'),
    },
    // {
    //   title: 'Number Guess',
    //   screenName: 'NumberGuess',
    //   image: require('../assets/guessNumber.png'),
    // },
    {
      title: 'Hangman',
      screenName: 'HangmanGame',
      image: require('../assets/hangman.png'),
    },
    {
      title: 'Tic Tac Toe',
      screenName: 'TicTacToe',
      image: require('../assets/tic-tac-toe.png'),
    },
    // {
    //   title: 'Connect Four',
    //   screenName: 'ConnectFour',
    //   image: require('../assets/connectFour.png'),
    // },
  ];

  const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={20} color="#16247d" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Find game"
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
            />
            {searchTerm.length > 0 && (
                <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                  <Feather name="x" size={20} color="#000" />
                </TouchableOpacity>
            )}
          </View>

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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  container: {
    marginTop: 50,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#16247d',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  clearButton: {
    paddingHorizontal: 10,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 25,
    marginRight: 10,
    color: '#fff',
  },
  picker: {
    width: '90%',
    color: '#fff',
    backgroundColor: 'rgb(22,36,125)',
  },
});

export default GameScreen;
