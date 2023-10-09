import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore } from '../firebase';

export default function ProfilScreen() {
  const navigation = useNavigation();
  const [nouveauNom, setNouveauNom] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const userRef = firestore.collection('profiles').doc(userId);

    const fetchUserProfile = async () => {
      try {
        const doc = await userRef.get();
        if (doc.exists) {
          setUserProfile(doc.data());
        } else {
          await userRef.set({
            nom: '',
            highScore: 0,
            pointsHangman: 0,
            pointsRPS: 0,
          });

          const updatedDoc = await userRef.get();
          setUserProfile(updatedDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    const unsubscribe = userRef.onSnapshot((doc) => {
      setUserProfile(doc.data());
    });

    fetchUserProfile();

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  const handleModification = async () => {
    const userId = auth.currentUser.uid;
    const userRef = firestore.collection('profiles').doc(userId);

    try {
      if (!userProfile) {
        const updatedDoc = await userRef.get();
        if (updatedDoc.exists) {
          setUserProfile(updatedDoc.data());
        } else {
          return;
        }
      }

      await userRef.update({
        nom: nouveauNom || userProfile.nom,
      });

      setUserProfile(prevState => ({
        ...prevState,
        nom: nouveauNom || userProfile.nom,
      }));

      alert('Profil mis à jour avec succès!');
    } catch (error) {
      alert(`Erreur lors de la mise à jour du profil : ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profil</Text>

      {auth.currentUser && (
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <Text>Email: {auth.currentUser.email}</Text>
            <Text style={styles.name}>Nom: {userProfile?.nom || 'Non défini'}</Text>
            <Text>High Score Flappy Bird: {userProfile?.highScore || 0}</Text>
            <Text>Points Hang Man: {userProfile?.pointsHangman || 0}</Text>
            <Text>Points Rock Paper Scissors: {userProfile?.pointsRPS || 0}</Text>

            <Text style={styles.totalPoints}>All Points: {userProfile?.highScore + userProfile?.pointsHangman + userProfile?.pointsRPS || 0}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nouveau Nom"
              onChangeText={text => setNouveauNom(text)}
              value={nouveauNom}
            />
          </View>
          <TouchableOpacity onPress={handleModification} style={styles.button}>
            <Text style={styles.buttonText}>Modifier le Profil</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={handleSignOut} style={[styles.button, { backgroundColor: 'red' }]}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
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
  profileInfo: {
    marginBottom: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  totalPoints: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
