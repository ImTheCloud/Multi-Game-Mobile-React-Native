import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HangmanGame({ navigation }) {
  const [word, setWord] = useState('HELLO'); // Le mot à deviner
  const [displayWord, setDisplayWord] = useState('_____'); // Le mot affiché avec des tirets
  const [attempts, setAttempts] = useState(6); // Nombre d'essais restants

  useEffect(() => {
    // Fonction pour mettre à jour le mot affiché en fonction des lettres devinées
    const updateDisplayWord = () => {
      let newDisplayWord = '';
      for (const letter of word) {
        if (displayWord.includes(letter)) {
          newDisplayWord += letter;
        } else {
          newDisplayWord += '_';
        }
      }
      setDisplayWord(newDisplayWord);
    };

    updateDisplayWord();
  }, [word, displayWord]);

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      // La lettre devinée est correcte
      // Mettez à jour le mot affiché
      // Vérifiez si le joueur a gagné
    } else {
      // La lettre devinée est incorrecte
      // Réduisez le nombre d'essais restants
      // Vérifiez si le joueur a perdu
    }
  };

  const restartGame = () => {
    // Réinitialisez le jeu avec un nouveau mot
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hangman Game</Text>
      <Text style={styles.displayWord}>{displayWord}</Text>
      <Text style={styles.attempts}>Attempts left: {attempts}</Text>
      <Button title="Guess A" onPress={() => handleGuess('A')} />
      <Button title="Guess B" onPress={() => handleGuess('B')} />
      {/* Ajoutez d'autres boutons pour deviner les lettres */}
      <Button title="Restart Game" onPress={restartGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  displayWord: {
    fontSize: 36,
    marginBottom: 20,
  },
  attempts: {
    fontSize: 18,
    marginBottom: 20,
  },
});
