import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../firebase'; 

const birdImage = require('../../assets/flappybird.png');

function FlappyBird() {
  const navigation = useNavigation();
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    setRunning(false);

    // Retrieve high score from Firebase Firestore
    const fetchHighScore = async () => {
      try {
        const highScoreDoc = await firestore.collection('highscores').doc('flappybird').get();
        if (highScoreDoc.exists) {
          const fetchedHighScore = highScoreDoc.data().score;
          setHighScore(fetchedHighScore);
        }
      } catch (error) {
        console.error('Error fetching high score:', error);
      }
    };

    fetchHighScore();
  }, []);

  // Function to update high score in Firebase Firestore
  const updateHighScore = async (newHighScore) => {
    try {
      await firestore.collection('highscores').doc('flappybird').set({
        score: newHighScore,
      });
    } catch (error) {
      console.error('Error updating high score:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
        onPress={() => navigation.navigate('GameScreen')}
      >
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>
        {currentPoints}
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', margin: 10, color: 'green' }}>
        High Score: {highScore}
      </Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities(birdImage, currentPoints)}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();

              // Update high score if needed
              if (currentPoints > highScore) {
                setHighScore(currentPoints);
                updateHighScore(currentPoints);
              }
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {!running ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine.swap(entities(birdImage, 0));
            }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

export default FlappyBird;
