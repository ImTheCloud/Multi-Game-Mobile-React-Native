import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RockPaperScissorsGame() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const choices = ['Rock', 'Paper', 'Scissors'];

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return "It's a tie!";
    if (
      (user === 'Rock' && computer === 'Scissors') ||
      (user === 'Paper' && computer === 'Rock') ||
      (user === 'Scissors' && computer === 'Paper')
    ) {
      return 'You win!';
    } else {
      return 'Computer wins!';
    }
  };

  const handleChoice = (choice) => {
    const computerChoice = generateComputerChoice();
    const result = determineWinner(choice, computerChoice);

    setUserChoice(choice);
    setComputerChoice(computerChoice);
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>
      <View style={styles.choices}>
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice}
            style={styles.choiceButton}
            onPress={() => handleChoice(choice)}
          >
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {userChoice && computerChoice && (
        <View style={styles.result}>
          <Text style={styles.resultText}>You chose: {userChoice}</Text>
          <Text style={styles.resultText}>Computer chose: {computerChoice}</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
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
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  choiceText: {
    color: 'white',
    fontSize: 18,
  },
  result: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    marginTop: 10,
  },
});
