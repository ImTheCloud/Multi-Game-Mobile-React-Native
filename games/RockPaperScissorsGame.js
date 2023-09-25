import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

export default function RockPaperScissorsGame() {
  const [userChoice, setUserChoice] = useState(null);
  const [otherPlayerChoice, setOtherPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const choices = [
    { image: require('../assets/rock.png'), text: 'Rock' },
    { image: require('../assets/paper.png'), text: 'Paper' },
    { image: require('../assets/scissors.png'), text: 'Scissors' },
  ];

  const determineWinner = (userChoice, otherPlayerChoice, gameMode) => {
    if (userChoice === otherPlayerChoice) {
      return "It's a tie!";
    }
    if (userChoice === 2 && otherPlayerChoice === 0) {
      if (gameMode === 'ai') {
        return 'You won!';
      } else {
        return 'Player 1 won!';
      }
    }
    if (userChoice === 0 && otherPlayerChoice === 2) {
      if (gameMode === 'ai') {
        return 'IA won!';
      } else {
        return 'Player 2 won!';
      }
    }
    if (userChoice > otherPlayerChoice) {
      if (gameMode === 'ai') {
        return 'IA won!';
      } else {
        return 'Player 2 won!';
      }
    } else {
      if (gameMode === 'ai') {
        return 'You won!';
      } else {
        return 'Player 1 won!';
      }
    }
  };

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return randomIndex;
  };

  const handleChoice = (index) => {
    if (!gameOver) {
      if (gameMode === 'player') {
        if (userChoice === null) {
          setUserChoice(index);
        } else {
          setOtherPlayerChoice(index);
          const result = determineWinner(userChoice, index, gameMode);
          setResult(result);
          setShowResult(true);
          setGameOver(true);
        }
      } else {
        const computerIndex = generateComputerChoice();
        setComputerChoice(computerIndex);
        const result = determineWinner(index, computerIndex, gameMode);
        setResult(result);
        setShowResult(true);
        setGameOver(true);
      }
    }
  };

  const startGameAgainstAI = () => {
    setGameMode('ai');
    setUserChoice(null);
    setOtherPlayerChoice(null);
    setResult('');
    setShowResult(false);
    setGameOver(false);

    // Générer le choix de l'IA au début du jeu
    const computerIndex = generateComputerChoice();
    setComputerChoice(computerIndex);
  };

  const startGameAgainstPlayer = () => {
    setGameMode('player');
    setUserChoice(null);
    setOtherPlayerChoice(null);
    setResult('');
    setShowResult(false);
    setGameOver(false);
  };

  const replayGame = () => {
    setUserChoice(null);
    setOtherPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setShowResult(false);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modeButtons}>
        <TouchableOpacity
          style={[styles.modeButton, { marginRight: 10 }]} // Ajout de marginRight pour l'espace
          onPress={startGameAgainstAI}
        >
          <Text style={styles.modeButtonText}>Play against AI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modeButton}
          onPress={startGameAgainstPlayer}
        >
          <Text style={styles.modeButtonText}>Play against Player</Text>
        </TouchableOpacity>
      </View>
      {gameMode && (
        <View>
          {gameMode === 'player' && (
            <Text style={styles.instructionText}>
              {userChoice === null ? 'Player 1, select your choice:' : 'Player 2, select your choice:'}
            </Text>
          )}
          <View style={styles.choices}>
            {choices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                style={styles.choiceButton}
                onPress={() => handleChoice(index)}
                disabled={gameOver}
              >
                <Image
                  source={choice.image}
                  style={styles.choiceImage}
                  resizeMode="contain"
                />
                <Text style={styles.choiceText}>{choice.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {showResult && (
            <View style={styles.result}>
              {userChoice !== null && (
                <Text style={styles.resultText}>
                  Player 1 chose: {choices[userChoice].text}
                </Text>
              )}
              {gameMode === 'player' && otherPlayerChoice !== null && (
                <Text style={styles.resultText}>
                  Player 2 chose: {choices[otherPlayerChoice].text}
                </Text>
              )}
              {gameMode === 'ai' && computerChoice !== null && (
                <Text style={styles.resultText}>
                  AI chose: {choices[computerChoice].text}
                </Text>
              )}
              <Text style={styles.resultText}>{result}</Text>
              <Button title="Replay" onPress={replayGame} />
            </View>
          )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modeButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  modeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 10,
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
    width: 100,
    height: 100,
  },
  choiceText: {
    fontSize: 16,
    marginTop: 5,
  },
  result: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    marginTop: 15,
    fontWeight: 'bold',
  },
});
