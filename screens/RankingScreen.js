import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { firestore } from '../firebase';
import cielBackground from "../assets/blueBack.jpg";
import { Picker } from '@react-native-picker/picker';

export default function RankingScreen() {
  const [users, setUsers] = useState([]);
  const [selectedGame, setSelectedGame] = useState('HighLevelNumberGuess');

  const fetchUsers = async () => {
    try {
      const usersCollection = await firestore.collection('profiles');
      const snapshot = await usersCollection.get();
      const usersData = snapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const sortUsersByGame = (game) => {
    return users
        .filter(user => game === 'HighLevelNumberGuess' || user[game] !== undefined)
        .sort((a, b) => (b[game] || 0) - (a[game] || 0));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item, index }) => (
      <TouchableOpacity>
        <View style={styles.userContainer}>
          <Text style={styles.userName}>{`${index + 1}. ${item.nom || 'Non défini'}`}</Text>
          <Text style={styles.userName}>
            {selectedGame === 'HighLevelNumberGuess' ? 'Total Points' : `Points `}: {item[selectedGame] || 0}
          </Text>
        </View>
      </TouchableOpacity>
  );

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Ranking</Text>

          {/* Picker pour sélectionner le jeu */}
          <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedGame}
                onValueChange={(itemValue) => setSelectedGame(itemValue)}
                style={styles.picker}
            >
              <Picker.Item label="Number Guess" value="HighLevelNumberGuess" />
              <Picker.Item label="Flappy Bird" value="highScore" />
              <Picker.Item label="Hangman" value="pointsHangman" />
            </Picker>
          </View>

          {/* FlatList pour afficher la liste triée */}
          <FlatList
              data={sortUsersByGame(selectedGame)}
              keyExtractor={(item, index) => `${item.nom}-${index}`}
              renderItem={renderItem}
          />
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgb(255,255,255)',
    borderColor: '#16247d',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    color: '#16247d',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  searchInputContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgb(255,255,255)',
    borderColor: '#16247d',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#16247d',
  },
  clearIcon: {
    marginLeft: 10,
    padding: 8,
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
    color: '#16247d',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 20,
  },
  userContainer: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#16247d',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
});
