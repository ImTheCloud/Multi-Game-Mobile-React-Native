import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { auth, firestore } from '../firebase';

export default function HangmanGame() {
  const words = [
    'IOS', 'ANDROID', 'JAVA', 'REACT', 'NATIVE', 'JAVASCRIPT', 'DATABASE', 'COMPUTER', 'PROGRAMMING', 'DEVELOPER',
    'ALGORITHM', 'SOFTWARE', 'INTERFACE', 'NETWORK', 'SECURITY', 'FRAMEWORK', 'DEBUGGING', 'MOBILE', 'APPLICATION',
    'INTERNET', 'PYTHON', 'HTML', 'CSS', 'LINUX', 'WINDOWS', 'DATABASE', 'SERVER', 'BROWSER', 'ROUTER', 'CLOUD',
    'DATABASE', 'ALGORITHM', 'COMPILER', 'CONNECTION', 'ETHERNET', 'JAVA', 'VSCODE', 'API', 'REFACTORING',
    'WEB', 'PERFORMANCE', 'RESPONSIVE', 'JAVAFX', 'DEBUG', 'TERMINAL', 'PROBLEM', 'RIGGIO'
  ];

  const maxAttempts = 7;

  const chooseRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const navigation = useNavigation();
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [attempts, setAttempts] = useState(maxAttempts);
  const [inputLetter, setInputLetter] = useState('');
  const [hangmanTries, setHangmanTries] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [score, setScore] = useState(0);
  const userId = auth.currentUser.uid; // Get the current user's ID
  const userRef = firestore.collection('profiles').doc(userId);

  useEffect(() => {
    const newWord = chooseRandomWord();
    setWord(newWord);
    setDisplayWord('_ '.repeat(newWord.length));
    setAttempts(maxAttempts);
    setHangmanTries(0);
    setIncorrectLetters([]);
  }, []);

  const handleGuess = () => {
    if (inputLetter && inputLetter.length === 1) {
      const letter = inputLetter.toUpperCase();

      if (word.includes(letter)) {
        const newDisplayWord = displayWord.split(' ');

        for (let i = 0; i < word.length; i++) {
          if (word[i] === letter) {
            newDisplayWord[i] = letter;
          }
        }

        setDisplayWord(newDisplayWord.join(' '));

        if (newDisplayWord.join('') === word) {
          handleWordGuessed(); // Updated to handleWordGuessed
        }
      } else {
        setAttempts(attempts - 1);
        setHangmanTries(hangmanTries + 1);
        setIncorrectLetters([...incorrectLetters, letter]);

        if (attempts - 1 === 0) {
          handleGameLost();
        }
      }

      setInputLetter('');
    }
  };

  const handleWordGuessed = async () => {
    const updatedScore = score + 5; // Calculate the updated score
    setScore(updatedScore); // Update the score state

    // Update user's score in Firestore
    try {
      await userRef.update({
        pointsHangman: updatedScore,
      });
    } catch (error) {
      console.error('Error updating user score:', error);
    }

    restartGame();
  };

  const handleGameLost = async () => {
    // Deduct 3 points from the score
    const updatedScore = Math.max(0, score - 3);
    setScore(updatedScore);

    // Update user's score in Firestore
    try {
      await userRef.update({
        pointsHangman: updatedScore,
      });
    } catch (error) {
      console.error('Error updating user score:', error);
    }

    Alert.alert(
      'You lost!',
      `The word was ${word}. Better luck next time.`,
      [{ text: 'OK', onPress: restartGame }]
    );
  };

  const restartGame = () => {
    const newWord = chooseRandomWord();
    const newDisplayWord = '_ '.repeat(newWord.length);
    setWord(newWord);
    setDisplayWord(newDisplayWord);
    setAttempts(maxAttempts);
    setHangmanTries(0);
    setIncorrectLetters([]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navigationButtonContainer}
        onPress={() => navigation.navigate('GameScreen')}
      >
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.hangmanContainer}>
        <Text style={styles.incorrectLetters}>
          Incorrect Letters:{' '}
          {incorrectLetters.map((letter, index) => (
            <Text
              key={index}
              style={{
                textDecorationLine: 'line-through',
                color: 'black',
              }}
            >
              {letter}
            </Text>
          ))}
        </Text>
      </View>
      <Text style={styles.displayWord}>{displayWord}</Text>
      <Text style={styles.attempts}>Attempts left: {attempts}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInputLetter(text)}
          value={inputLetter}
          maxLength={1}
          autoCapitalize="none"
          keyboardType="default"
        />
        <View style={styles.buttonContainer}>
          <Button title="Guess" onPress={handleGuess} color="#3F88C5" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  score: {
    fontSize: 24,
    marginBottom: 20,
  },
  navigationButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
    width: 35,
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 0,
    marginRight: 10,
  },
  buttonContainer: {
    height: 40,
  },
  hangmanContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  incorrectLetters: {
    fontSize: 24,
    marginBottom: 20,
  },
});
