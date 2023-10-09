import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import GameList from '../components/GameList';

export default function RulesScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      title: 'Flappy Bird',
      rules: 'Flappy Bird : High Score only',
      image: require('../assets/flappybird.png'),  
    },
    {
      title: 'Tic Tac Toe',
      rules: 'Tic Tac Toe : Multi Player',
      image: require('../assets/tic-tac-toe.png'),
    },
    {
      title: 'Hangman Game',
      rules: 'Hangman Game : +5 points if you win and -3 points if you lose',
      image: require('../assets/hangman.png'),
    },
    {
      title: 'Rock Paper Scissors',
      rules: 'Rock Paper : +2 points if you win vs IA and if you lose it is -2 points',
      image: require('../assets/rockPaperScissors.png'),
    },
  ];

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Find a game"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <GameList
        games={filteredGames}
        onSelectGame={(game) => {
          setSelectedGame(game);
        }}
      />

      {/* Modal to display game rules */}
      <Modal
        visible={!!selectedGame}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedGame(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedGame?.title} Rules</Text>
            <Text style={styles.modalText}>{selectedGame?.rules}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedGame(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '90%',
    marginTop: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
