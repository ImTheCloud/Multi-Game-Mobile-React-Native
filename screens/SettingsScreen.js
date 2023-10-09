import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function SettingsScreen() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Chargez le fichier audio au montage du composant
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
         require('../assets/FlappyBird.mp3')
      );
      setSound(sound);
    }

    loadSound();

    // Nettoyez les ressources audio lors du démontage du composant
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Fonction pour jouer ou arrêter le son
  const toggleSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
      
      {/* Ajoutez un bouton pour jouer ou arrêter la musique */}
      <TouchableOpacity onPress={toggleSound}>
        <Text>{isPlaying ? 'Stop Music' : 'Play Music'}</Text>
      </TouchableOpacity>
    </View>
  );
}
