import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground, ScrollView,
} from 'react-native';
import { firestore } from '../firebase';
import cielBackground from "../assets/blueBack.jpg";
import { Picker } from '@react-native-picker/picker';

export default function RankingScreen() {
  const [users, setUsers] = useState([]);
  const [selectedGame, setSelectedGame] = useState('HighLevelNumberGuess');

  const fetchUsers = async () => {
    try {
      const usersCollection = await firestore.collection('profiles');

      // Utilisation de onSnapshot pour surveiller les changements en temps réel
      const unsubscribe = usersCollection.onSnapshot(snapshot => {
        const usersData = snapshot.docs.map(doc => doc.data());
        setUsers(usersData);
      });

      // Le retour de la fonction unsubscribe est une fonction pour annuler l'abonnement
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = fetchUsers();

    // Nettoyez l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  const sortUsersByGame = (game) => {
    return users
        .filter(user => game === 'HighLevelNumberGuess' || user[game] !== undefined)
        .sort((a, b) => (b[game] || 0) - (a[game] || 0));
  };

  const renderItem = ({ item, index }) => (
      <View style={styles.userContainer}>
        <Text style={styles.userName} numberOfLines={1}>
          {`${index + 1}. ${item.nom || 'Non défini'} ${selectedGame === 'HighLevelNumberGuess' ? '' : ''} ${item[selectedGame] || 0}`}
        </Text>
      </View>
  );

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <View style={styles.container}>
          {/* Picker pour sélectionner le jeu */}
          <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedGame}
                onValueChange={(itemValue) => setSelectedGame(itemValue)}
                style={styles.picker}
            >
              <Picker.Item label=" High Level Number Guess" value="HighLevelNumberGuess" />
              <Picker.Item label="High Score Flappy Bird" value="highScore" />
              <Picker.Item label="High Score Hangman" value="highScoreHangman" />
              <Picker.Item label="High Score Quizz" value="HighScoreQuizz" />
            </Picker>
          </View>

          {/* FlatList pour afficher la liste triée */}
          <FlatList
              data={sortUsersByGame(selectedGame)}
              keyExtractor={(item, index) => `${item.nom}-${index}`}
              renderItem={renderItem}
              ListHeaderComponent={() => null}
              ListFooterComponent={() => null}
          />
          <Text style={styles.space}></Text>

        </View>
      </ImageBackground>
  );
}




const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  pickerContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgb(255,255,255)',
    borderColor: '#16247d',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    color: '#000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#option',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    marginTop: 50,

    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 20,
  },
  userContainer: {
    marginBottom:5,
    backgroundColor: 'white', // Set background color to white
    borderColor: '#16247d', // Set border color
    borderWidth: 1, // Add border width
    shadowColor: '#000',
    textAlign: 'center', // Add this line to center the text
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 20,
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  space: {
    marginBottom:40,
  }
});












































































































































































































