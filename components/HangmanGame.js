import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function HangmanGame({ navigation }) {
  const [displayWord, setDisplayWord] = useState('_____'); // Le mot affiché avec des tirets
  const [attempts, setAttempts] = useState(6); // Nombre d'essais restants
    'COMPUTER',
    'PROGRAMMING',
    'DEVELOPER',
    'ALGORITHM',
    'SOFTWARE',
    'INTERFACE',
    'NETWORK',
    'SECURITY',
    'FRAMEWORK',
    'DEBUGGING',
    'MOBILE',
    'APPLICATION',
    'INTERNET',
  ]; // Liste de mots possibles

  const maxAttempts = 5;

  const chooseRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [attempts, setAttempts] = useState(maxAttempts);
  const [inputLetter, setInputLetter] = useState('');
  const [hangmanTries, setHangmanTries] = useState(0);

  useEffect(() => {
    const newWord = chooseRandomWord();
    setWord(newWord);
    setDisplayWord('_'.repeat(newWord.length));
    setAttempts(maxAttempts);
    setHangmanTries(0);
  }, []);

  useEffect(() => {
    const updateDisplayWord = () => {
      let newDisplayWord = '';
      for (let i = 0; i < word.length; i++) {
        if (word[i] === displayWord[i]) {
          newDisplayWord += word[i];
        } else {
          newDisplayWord += '_';
        }
      }
      setDisplayWord(newDisplayWord);
    };

    updateDisplayWord();
  }, [word, displayWord]);

  const handleGuess = () => {
    if (inputLetter && inputLetter.length === 1) {
      const letter = inputLetter.toUpperCase();
      if (word.includes(letter)) {
        const newDisplayWord = displayWord.split('');
        for (let i = 0; i < word.length; i++) {
          if (word[i] === letter) {
            newDisplayWord[i] = letter;
          }
        }
        setDisplayWord(newDisplayWord.join(''));

        if (newDisplayWord.join('') === word) {
          Alert.alert('You won!', 'Congratulations! You guessed the word.', [
            { text: 'OK', onPress: restartGame },
          ]);
        }
      } else {
        setAttempts(attempts - 1);
        setHangmanTries(hangmanTries + 1); // Augmentez le nombre d'essais du bonhomme pendu
        if (attempts - 1 === 0) {
          Alert.alert(
            'You lost!',
            `The word was ${word}. Better luck next time.`,
            [{ text: 'OK', onPress: restartGame }]
          );
        }
      }
      setInputLetter('');
    }
  };

  const restartGame = () => {
    const newWord = chooseRandomWord();
    setWord(newWord);
    setDisplayWord('_'.repeat(newWord.length));
    setAttempts(maxAttempts);
    setHangmanTries(0);
  };

  const renderHangman = () => {
    const hangmanParts = [
      '  O  ', // tête
      '  |  ', // cou
      ' /|\\ ', // bras
      '  |  ', // corps
      ' / \\ ', // jambes
    ];

    const hangman = [];

    for (let i = 0; i < hangmanTries; i++) {
      hangman.push(hangmanParts[i]);
    }

    return hangman.map((part, index) => (
      <Text key={index} style={styles.hangmanPart}>
        {part}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.hangmanContainer}>{renderHangman()}</View>
      <Text style={styles.displayWord}>{displayWord}</Text>
      <Text style={styles.attempts}>Attempts left: {attempts}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setInputLetter(text)}
        value={inputLetter}
        maxLength={1}
        autoCapitalize="none"
        keyboardType="default"
      />
      <View style={styles.buttonContainer}>
        <Button title="Guess" onPress={handleGuess} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  displayWord: {
    fontSize: 48,
    marginBottom: 20,
  },
  attempts: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centrer le bouton Guess
    marginBottom: 20,
  },
  hangmanContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  hangmanPart: {
    fontSize: 24,
    fontFamily: 'monospace',
  },
});
