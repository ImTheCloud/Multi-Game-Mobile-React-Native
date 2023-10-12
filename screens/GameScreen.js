import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ImageBackground,   TouchableOpacity,Text } from 'react-native';
import GameList from '../components/GameList';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import cielBackground from "../assets/blueBack.jpg";
import { Picker } from '@react-native-picker/picker';

const GameScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [gameFilter, setGameFilter] = useState('all');

  const games = [
    {
      title: 'Flappy Bird',
      screenName: 'FlappyBird',
      image: require('../assets/flappybird.png'),
      isMultiplayer: false,
      isSingleplayer: true,
    },
    {
      title: 'Number Guess',
      screenName: 'NumberGuess',
      image: require('../assets/guessNumber.png'),
      isMultiplayer: false,
      isSingleplayer: true,
    },
    {
      title: 'Hangman Game',
      screenName: 'HangmanGame',
      image: require('../assets/hangman.png'),
      isMultiplayer: false,
      isSingleplayer: true,
    },
    {
      title: 'Tic Tac Toe',
      screenName: 'TicTacToe',
      image: require('../assets/tic-tac-toe.png'),
      isMultiplayer: true,
      isSingleplayer: false,
    },
    {
      title: 'Connect Four',
      screenName: 'ConnectFour',
      image: require('../assets/connectFour.png'),
      isMultiplayer: true,
      isSingleplayer: false,
    },
  ];

  const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (gameFilter === 'all' || (gameFilter === 'multiplayer' && game.isMultiplayer) || (gameFilter === 'singleplayer' && game.isSingleplayer))
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Games</Text>
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
          <View style={styles.filterSection}>
            <Picker
                style={styles.picker}
                selectedValue={gameFilter}
                onValueChange={(itemValue) => setGameFilter(itemValue)}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Multiplayer" value="multiplayer" />
              <Picker.Item label="Single Player" value="singleplayer" />
            </Picker>
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
  },
  container: {
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
