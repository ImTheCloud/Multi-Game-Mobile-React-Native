import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function RockPaperScissorsGame() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const choices = [
    { image: require('../assets/rock.png'), text: 'Rock' },
    { image: require('../assets/paper.png'), text: 'Paper' },
    { image: require('../assets/scissors.png'), text: 'Scissors' },
    { image: require('../assets/puit.png'), text: 'Puit' },
  ];

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    return randomIndex;
  };

  const determineWinner = (userIndex, computerIndex) => {
    if (userIndex === computerIndex) return "It's a tie!";
    if (userIndex === 3) return 'You win!';
    if (
      (userIndex === 0 && computerIndex === 2) ||
      (userIndex === 1 && computerIndex === 0) ||
      (userIndex === 2 && computerIndex === 1)
    ) {
      return 'You win!';
    } else {
      return 'IA wins!';
    }
  };

  const handleChoice = (index) => {
    const computerIndex = generateComputerChoice();
    const result = determineWinner(index, computerIndex);

    setUserChoice(index);
    setComputerChoice(computerIndex);
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.choices}>
        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.choiceButton}
            onPress={() => handleChoice(index)}
          >
            <Image source={choice.image} style={styles.choiceImage} />
            <Text style={styles.choiceText}>{choice.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {userChoice !== null && computerChoice !== null && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            You chose: {choices[userChoice].text}
          </Text>
          <Text style={styles.resultText}>
            Computer chose: {choices[computerChoice].text}
          </Text>
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
    alignItems: 'center',
  },
  choiceImage: {
    width: 95, // Ajustez cette taille en fonction de vos besoins
    height: 100, // Ajustez cette taille en fonction de vos besoins
  },
  choiceText: {
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
