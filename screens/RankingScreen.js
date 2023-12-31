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
import Icon from 'react-native-vector-icons/FontAwesome'; // Vous pouvez utiliser une autre bibliothèque d'icônes si vous le souhaitez

export default function RankingScreen() {
  const [users, setUsers] = useState([]);
  const [selectedGame, setSelectedGame] = useState('HighScoreQuizz');

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
        .filter(user => game === 'HighScoreQuizz' || user[game] !== undefined)
        .sort((a, b) => (b[game] || 0) - (a[game] || 0));
  };

  const renderItem = ({ item, index }) => {
    let icon = null;
    let textColor = 'black';

    if (index === 0) {
      icon = <Icon name="trophy" size={20} color="gold" />; // 1er place
      textColor = 'gold';
    } else if (index === 1) {
      icon = <Icon name="trophy" size={20} color="silver" />; // 2e place
      textColor = 'silver';
    } else if (index === 2) {
      icon = <Icon name="trophy" size={20} color="peru" />; // 3e place (couleur "peru" pour bronze)
      textColor = 'peru';
    }else{
      icon = <Icon name="trophy" size={20} color="black" />; // 3e place (couleur "peru" pour bronze)
      textColor = 'black';
    }

    return (
        <View style={[styles.userContainer, { backgroundColor: 'white' }]}>
          {icon}
          <Text style={[styles.userName, { color: textColor }]} numberOfLines={1}>
            {`${item.nom || 'Non défini'} ${selectedGame === 'HighScoreQuizz' ? '' : ''} ${item[selectedGame] || 0}`}
          </Text>
        </View>
    );
  };



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
              <Picker.Item label="High Score Quizz" value="HighScoreQuizz" />
              <Picker.Item label="High Score Hangman" value="highScoreHangman" />
              <Picker.Item label="High Score Flappy Bird" value="highScore" />
              {/*<Picker.Item label=" High Level Number Guess" value="HighLevelNumberGuess" />*/}
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
