import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GameList from './GameList'; // import

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

export default function HomeScreen({ navigation }) { // composant par defaut avec objet en parametre
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // masquer l'en-tête sur cette page
    });
  }, [navigation]);

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
