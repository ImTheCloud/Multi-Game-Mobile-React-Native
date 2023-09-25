import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NumberGuessGame() {
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(10);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber(minNumber, maxNumber));
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#F2EFEF');
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(30);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let interval;

    if (timer > 0 && gameStarted) {
      interval = setInterval(() => {
        setTimer(timer - 1);  
      }, 1000);
    } else if (timer === 0 && gameStarted) {
      handleTimeout();
    }

    return () => clearInterval(interval);
  }, [timer, gameStarted]);

  useEffect(() => {
    loadGameData();
  }, []);

  useEffect(() => {
    saveGameData();
  }, [currentLevel]);

  async function loadGameData() {
    try {
      const level = await AsyncStorage.getItem('currentLevel');

      if (level !== null) {
        setCurrentLevel(parseInt(level));
        setGameStarted(false);
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  }

  async function saveGameData() {
    try {
      await AsyncStorage.setItem('currentLevel', currentLevel.toString());
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleGuess() {
    if (!gameStarted) {
      setGameStarted(true);
      setTimer(30);
    }

    const guessedNumber = parseInt(guess);
    setAttempts(attempts + 1);

    if (isNaN(guessedNumber)) {
      setMessage('Please enter a valid number.');
      return;
    }

    if (guessedNumber === randomNumber) {
      Alert.alert('Congratulations!', `You guessed the number in ${attempts} attempts.`);
      nextLevel();
    } else if (guessedNumber < randomNumber) {
      setMessage('The number is higher.');
    } else {
      setMessage('The number is lower.');
    }

    setGuess('');
  }

  function handleTimeout() {
    Alert.alert('Time\'s up!', `You ran out of time. The correct number was ${randomNumber}.`);
    resetGame();
  }

  function resetGame() {
    setGuess('');
    setMessage('');
    setBackgroundColor('#F2EFEF');
    setAttempts(0);
    setTimer(30);
    setMinNumber(1);
    setMaxNumber(10);
    setRandomNumber(generateRandomNumber(1, 10));
    setCurrentLevel(1);
    setGameStarted(false);
  }

  function nextLevel() {
    setGuess('');
    setMessage('');
    setBackgroundColor('#F2EFEF');
    setAttempts(0);
    setTimer(30);

    const newMinNumber = 1;
    const newMaxNumber = Math.pow(2, currentLevel) * 10;

    setMinNumber(newMinNumber);
    setMaxNumber(newMaxNumber);
    setRandomNumber(generateRandomNumber(newMinNumber, newMaxNumber));
    setCurrentLevel(currentLevel + 1);
    setGameStarted(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>
      <Text style={styles.subtitle}>
        Level: {currentLevel}
      </Text>
      <Text style={styles.subtitle}>
        Can you guess the number between {minNumber} and {maxNumber}?
      </Text>
      {!gameStarted && (
        <Button
          title="Start Game"
          onPress={() => setGameStarted(true)}
          color="#3F88C5"
        />
      )}
      {gameStarted && (
        <>
          <Text style={styles.timer}>Time left: {timer} seconds</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setGuess(text)}
            value={guess}
            keyboardType="numeric"
            placeholder="Enter your guess"
          />
          <Button
            title="Guess"
            onPress={handleGuess}
            color="#3F88C5"
          />
          <Text style={styles.message}>{message}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  timer: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: 200,
    borderBottomWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
  },
});
