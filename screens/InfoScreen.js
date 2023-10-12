import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Modal, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import GameList from '../components/GameListInfo';
import cielBackground from "../assets/blueBack.jpg";
import { Feather } from "@expo/vector-icons";

export default function InfoScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      title: 'Flappy Bird',
      image: require('../assets/flappybird.png'),
      infos: 'Embark on an exhilarating journey with Flappy Bird! Soar through the endless, pixelated skies as you navigate through a maze of pipes. Challenge your reflexes and coordination to defy gravity and achieve the highest score possible. Keep flapping, and let the addiction begin!',
    },
    {
      title: 'Number Guess',
      infos: 'Welcome to the intriguing world of Number Guess! Immerse yourself in a mental challenge where you must decipher the secret number to claim victory. With each guess, you will receive valuable clues to guide you. Sharpen your analytical skills, embrace the thrill of deduction, and strive to surpass your own high score. Are you up for the challenge?',
      image: require('../assets/guessNumber.png'),
    },
    {
      title: 'Hangman Game',
      image: require('../assets/hangman.png'),
      infos: 'Unleash your linguistic prowess in the classic Hangman Game! Attempt to guess the hidden word and earn +5 points for every correct guess. But beware, each incorrect guess results in a penalty of -3 points! Expand your vocabulary, test your word knowledge, and experience the tension as you carefully select each letter. Can you outsmart the gallows?',
    },
    {
      title: 'Tic Tac Toe',
      image: require('../assets/tic-tac-toe.png'),
      infos: 'Engage in the timeless battle of wits with Tic Tac Toe! Challenge your friends in multiplayer mode or test your skills against a cunning AI opponent. Develop intricate strategies, anticipate your opponents moves, and carefully plan your own to emerge victorious. Whether it\'s an intense rivalry or a friendly match, every move counts on the path to triumph!',
    },
    {
      title: 'Connect Four',
      image: require('../assets/connectFour.png'),
      infos: 'Immerse yourself in the strategic brilliance of Connect Four! In this classic game of wits, align four chips horizontally, vertically, or diagonally to secure your triumph. Anticipate your opponent’s moves, block their strategies, and devise your path to victory. Challenge friends or test your skills against the AI. It’s not just a game; its a battle of tactics!',
    },
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
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Infos</Text>
          </View>

          {/* Barre de recherche avec icône de loupe */}
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
                  <Feather name="x" size={20} color="#16247d" />
                </TouchableOpacity>
            )}
          </View>

          <GameList
              games={filteredGames}
              onSelectGame={(game) => {
                setSelectedGame(game);
              }}
          />

          {/* Modal pour afficher les règles du jeu */}
          <Modal
              visible={!!selectedGame}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setSelectedGame(null)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image style={styles.gameImage} source={selectedGame?.image} />
                <Text style={styles.modalTitle}>{selectedGame?.title} Infos</Text>
                <Text style={styles.modalText}>{selectedGame?.infos}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedGame(null)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 40,
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
    height: '100%', // Utilisez '100%' pour remplir toute la hauteur du conteneur
  },
  clearButton: {
    color: '#000',
    padding: 10,
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#16247d',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#16247d',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
