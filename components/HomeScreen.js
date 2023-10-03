import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import GameList from './GameList'; // import
import { auth } from '../firebase';

const games = [ // tableau
  // chaque élément est un objet contenant ces propriétés.
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

export default function HomeScreen() { // composant par defaut avec objet en parametre
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // masquer l'en-tête sur cette page
    });
  }, [navigation]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  return ( // rendu du composant  renvoie l'interface utilisateur la view
    <View style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.title}>Multi Game Mobile</Text>
      </View>

      <GameList // composant
        games={games}
        onSelectGame={(game) => {
          // fonction onSelect passe comme prop, fonction appele lorsque on clique sur un jeux pour la redirection
          navigation.navigate(game.screenName);
        }}
      />

      <View style={styles.userInfoContainer}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EADD', // Add background color
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
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
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
