import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button,FlatList  } from 'react-native';
import { firestore } from '../firebase';

export default function RankingScreen() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const usersCollection = await firestore.collection('profiles').get();
      const usersData = usersCollection.docs.map(doc => doc.data());
      setUsers(usersData);
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

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserClick(item)}>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>{item.nom || 'Non défini'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item.nom}-${index}`}
        renderItem={renderItem}
      />

      {/* Modal to display user details */}
      <Modal
        visible={!!selectedUser}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Points</Text>
            <Text>Name: {selectedUser?.nom || 'Non défini'}</Text>
            <Text>High Score: {selectedUser?.highScore || 0}</Text>
            <Text>Points Hang Man: {selectedUser?.pointsHangman || 0}</Text>
            <Text>Points Rock Paper Scissors: {selectedUser?.pointsRPS || 0}</Text>
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    marginBottom: 20,
    width: '90%',
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
    padding: 20,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
