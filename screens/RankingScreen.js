import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  FlatList,
  TextInput,
  ImageBackground
} from 'react-native';
import { firestore } from '../firebase';
import cielBackground from "../assets/blueBack.jpg";

export default function RankingScreen() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [unsubscribe, setUnsubscribe] = useState(null);

  const fetchUsers = async () => {
    try {
      const usersCollection = await firestore.collection('profiles');
      const unsub = usersCollection.onSnapshot((snapshot) => {
        const usersData = snapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      });

      setUnsubscribe(() => unsub); // Save the unsubscribe function
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleSearch = (text) => {
    setSearchInput(text);
  };

  const filteredUsers = users.filter((user) =>
  user.nom && user.nom.toLowerCase().includes(searchInput.toLowerCase())
);


  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();

    return () => {
      // Unsubscribe when component unmounts
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserClick(item)}>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>{item.nom || 'Non défini'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
      <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>

      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchInput}
        onChangeText={handleSearch}
      />

      <FlatList data={filteredUsers} keyExtractor={(item, index) => `${item.nom}-${index}`} renderItem={renderItem} />

      {/* Modal to display user details */}
      <Modal visible={!!selectedUser} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Points</Text>
            <Text>Name: {selectedUser?.nom || 'Non défini'}</Text>
            <Text>High Score Flappy Bird: {selectedUser?.highScore || 0}</Text>
            <Text>Points Hang Man: {selectedUser?.pointsHangman || 0}</Text>
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
</ImageBackground>

);
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#16247d',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '90%',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36, // Augmentez la taille du texte
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Couleur du texte
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop:70,
  },
  userContainer: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#16247d', // Couleur principale
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
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
});
