import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

export default function RockPaperScissorsGame() {
  //etats
  const [userChoice, setUserChoice] = useState(null); // use state utiliser pour gerer les etats null/false 
  const [otherPlayerChoice, setOtherPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const choices = [ //tab des choix possible
    { image: require('../assets/rock.png'), text: 'Rock' },
    { image: require('../assets/paper.png'), text: 'Paper' },
    { image: require('../assets/scissors.png'), text: 'Scissors' },
  ];

  const determineWinner = (userChoice, otherPlayerChoice, gameMode) => {
    // fonction
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

    // Fonction appelée lorsqu'un joueur fait un choix
  const handleChoice = (index) => {
    if (!gameOver) {
      if (gameMode === 'player') {
        if (userChoice === null) {
          // si le joueur 1 n'a pas encore jouer (null)
          // maj choix du joueur  1
          setUserChoice(index);
        } else {
          // maj choix du joueur 2 cette fois
          setOtherPlayerChoice(index);
          const result = determineWinner(userChoice, index, gameMode); // calcul le resultat
          setResult(result);
          setShowResult(true);
          setGameOver(true);
        }
      } else {
        const computerIndex = generateComputerChoice();
        setComputerChoice(computerIndex);
        const result = determineWinner(index, computerIndex, gameMode); // calcul le resultat
        setResult(result);
        setShowResult(true);
        setGameOver(true);
      }
    }
  };

  const startGameAgainstAI = () => { 
    // tout vider
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
    // tout vider
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
    {/* mode des bouton en style */}
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
         {/* Affichage du texte d'instruction en fonction du mode de jeu */}
          {gameMode === 'player' && (
            <Text style={styles.instructionText}>
              {userChoice === null ? 'Player 1, select your choice:' : 'Player 2, select your choice:'}
            </Text>
          )}
            {/* Affichage des boutons de choix (pierre, papier, ciseaux) */}
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
          {/* Affichage du résultat du tour si showResult est true */}
          {showResult && (
            <View style={styles.result}>
              {/* Affichage du choix du joueur 1 s'il a choisi */}
              {userChoice !== null && (
                <Text style={styles.resultText}>
                  Player 1 chose: {choices[userChoice].text}
                </Text>
              )}
              {/* Affichage du choix du joueur 2 s'il a choisi ds le mode joueur */}
              {gameMode === 'player' && otherPlayerChoice !== null && (
                <Text style={styles.resultText}>
                  Player 2 chose: {choices[otherPlayerChoice].text}
                </Text>
              )}
                {/* Affichage du choix de l'IA s'il a choisi en mode ia */}
              {gameMode === 'ai' && computerChoice !== null && (
                <Text style={styles.resultText}>
                  AI chose: {choices[computerChoice].text}
                </Text>
              )}
              {/* Affichage du résultat du tour */}
              <Text style={styles.resultText}>{result}</Text>
              <Button title="Replay" onPress={replayGame}
                        color="#3F88C5"
 />
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
    backgroundColor: '#3F88C5',
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
