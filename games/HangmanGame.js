import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, firestore } from '../firebase';

export default function HangmanGame() {
  const words = [
    'IOS', 'ANDROID', 'JAVA', 'REACT', 'NATIVE', 'JAVASCRIPT', 'DATABASE', 'COMPUTER', 'PROGRAMMING', 'DEVELOPER',
    'ALGORITHM', 'SOFTWARE', 'INTERFACE', 'NETWORK', 'SECURITY', 'FRAMEWORK', 'DEBUGGING', 'MOBILE', 'APPLICATION',
    'INTERNET', 'PYTHON', 'HTML', 'CSS', 'LINUX', 'WINDOWS', 'DATABASE', 'SERVER', 'BROWSER', 'ROUTER', 'CLOUD',
    'DATABASE', 'ALGORITHM', 'COMPILER', 'CONNECTION', 'ETHERNET', 'JAVA', 'VSCODE', 'API', 'REFACTORING',
    'WEB', 'PERFORMANCE', 'RESPONSIVE', 'JAVAFX', 'DEBUG', 'TERMINAL', 'PROBLEM', 'RIGGIO'
  ];

  const handleRestart = () => {
    restartGame();
  };
  const maxAttempts = 7;

  const chooseRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.';
  const userId = auth.currentUser.uid;
  const userRef = firestore.collection('profiles').doc(userId);
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [attempts, setAttempts] = useState(maxAttempts);
  const [inputLetter, setInputLetter] = useState('');
  const [hangmanTries, setHangmanTries] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedLetters, setClickedLetters] = useState([]);

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
          handleWordGuessed();
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
    const updatedScore = score + 5;
    setScore(updatedScore);

    try {
      // Update user's score in Firestore
      await userRef.update({
        pointsHangman: updatedScore,
      });
    } catch (error) {
      console.error('Error updating user score:', error);
    }

    restartGame();
  };

  const handleGameLost = async () => {
    const updatedScore = Math.max(0, score - 3);
    setScore(updatedScore);

    try {
      // Update user's score in Firestore
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

  const handleAlphabetClick = (letter) => {
    if (!word.includes(letter)) {
      setAttempts(attempts - 1);
      setHangmanTries(hangmanTries + 1);
      setIncorrectLetters([...incorrectLetters, letter]);

      if (attempts - 1 === 0) {
        handleGameLost();
      }
    } else {
      const newDisplayWord = displayWord.split(' ');

      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          newDisplayWord[i] = letter;
        }
      }

      setDisplayWord(newDisplayWord.join(' '));

      if (newDisplayWord.join('') === word) {
        handleWordGuessed();
      }
    }

    setClickedLetters([...clickedLetters, letter]);
  };

  const restartGame = () => {
    setClickedLetters([]);
    const newWord = chooseRandomWord();
    const newDisplayWord = '_ '.repeat(newWord.length);
    setWord(newWord);
    setDisplayWord(newDisplayWord);
    setAttempts(maxAttempts);
    setHangmanTries(0);
    setIncorrectLetters([]);
  };

  // Add a style prop to change the background color based on whether the letter is clicked
  const getAlphabetButtonStyle = (letter) => ({
    backgroundColor: clickedLetters.includes(letter) ? 'gray' : '#16247d',
    padding: 10,
    margin: 5,
    width: 33,
    alignItems: 'center',
    borderRadius: 5,
  });

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Hangman</Text>
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

        <View style={styles.alphabetContainer}>
          {ALPHABET.split('').map((letter) => (
              <TouchableOpacity
                  key={letter}
                  style={getAlphabetButtonStyle(letter)}
                  onPress={() => handleAlphabetClick(letter)}
                  disabled={incorrectLetters.includes(letter)}
              >
                <Text style={styles.alphabetButtonText}>{letter}</Text>
              </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
      </View>
  );
}
const styles = StyleSheet.create({
  alphabetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  },

  alphabetButton: {
    backgroundColor: '#16247d',
    padding: 10,
    margin: 5,
    width: 33,
    alignItems: 'center',
    borderRadius: 5,
  },

  alphabetButtonText: {
    color: 'white',
    fontSize: 16,
  },
  restartButton: {
    backgroundColor: '#16247d',
    padding: 15,
    borderRadius: 10,
    marginBottom:100,

    alignItems: 'center',
    width: '95%', // Take the full width of the screen
    elevation: 3,

  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 70,
  },
  container: {
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
  hangmanContainer: {
    marginBottom: 30,

    flexDirection: 'column',
    alignItems: 'center',
  },

  incorrectLetters: {
    fontSize: 24,
    marginBottom: 20,
  },
});
