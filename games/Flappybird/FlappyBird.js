import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../../firebase';

const birdImage = require('../../assets/flappybird.png');

function FlappyBird() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const userId = auth.currentUser.uid;
  const userRef = firestore.collection('profiles').doc(userId);

  useEffect(() => {
    setRunning(false);

    // Retrieve high score from Firebase Firestore
    const fetchHighScore = async () => {
      try {
        const userDoc = await userRef.get(); // Fetch the user document
        const userHighScore = userDoc.data()?.highScore || 0; // Use the user's high score if available

        // Set the high score in the state
        setHighScore(userHighScore);
      } catch (error) {
        console.error('Error fetching high score:', error);
      }
    };

    fetchHighScore();
  }, []);

  // Function to update high score in Firebase Firestore
  const updateHighScore = async (newHighScore) => {
    try {
      await userRef.update({
        highScore: newHighScore,
      });
    } catch (error) {
      console.error('Error updating high score:', error);
    }
  };

  return (
      <View style={{ flex: 1, backgroundColor: 'rgba(136,212,236,0.76)' }}>
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, color: '#000' }}>
        {currentPoints}
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', margin: 10, color: '#000' }}>
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
            style={{ backgroundColor: '#16247d', paddingHorizontal: 30, paddingVertical: 10 }}
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
