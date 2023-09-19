import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function NumberGuessGame() {
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(100);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber(minNumber, maxNumber));
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#F2EFEF'); // Couleur de fond
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleGuess() {
    const guessedNumber = parseInt(guess);
    setAttempts(attempts + 1);

    if (isNaN(guessedNumber)) {
      setMessage('Please enter a valid number.');
      return;
    }

    if (guessedNumber === randomNumber) {
      Alert.alert('Congratulations!', `You guessed the number in ${attempts} attempts.`);
      setRandomNumber(generateRandomNumber(minNumber, maxNumber));
      setGuess('');
      setMessage('');
      setBackgroundColor('#F2EFEF'); // Réinitialiser la couleur de fond
      setAttempts(0);
    } else if (guessedNumber < randomNumber) {
      setMessage('The number is higher.');
      setBackgroundColor('#F2EFEF'); // Réinitialiser la couleur de fond
    } else {
      setMessage('The number is lower.');
      setBackgroundColor('#F2EFEF'); // Réinitialiser la couleur de fond
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>
      <Text style={styles.subtitle}>Can you guess the number between {minNumber} and {maxNumber}?</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setGuess(text)}
        value={guess}
        keyboardType="numeric"
        placeholder="Enter your guess"
      />
      <Button
        title="Guess"
        onPress={() => {
          handleGuess();
          setGuess(''); // Effacer le champ de texte après la supposition
        }}
        color="#3F88C5" // Couleur du bouton
      />
      <Text style={styles.message}>{message}</Text>
      <View style={styles.difficultyButtons}>
        <Button
          title="Easy"
          onPress={() => {
            setMinNumber(1);
            setMaxNumber(50);
            setRandomNumber(generateRandomNumber(1, 50));
            setGuess('');
            setMessage('');
            setBackgroundColor('#F2EFEF');
            setAttempts(0);
          }}
        />
        <Button
          title="Medium"
          onPress={() => {
            setMinNumber(1);
            setMaxNumber(100);
            setRandomNumber(generateRandomNumber(1, 100));
            setGuess('');
            setMessage('');
            setBackgroundColor('#F2EFEF');
            setAttempts(0);
          }}
        />
        <Button
          title="Hard"
          onPress={() => {
            setMinNumber(1);
            setMaxNumber(200);
            setRandomNumber(generateRandomNumber(1, 200));
            setGuess('');
            setMessage('');
            setBackgroundColor('#F2EFEF');
            setAttempts(0);
          }}
        />
      </View>
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
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
