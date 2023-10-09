import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore } from '../firebase';

import cielBackground from '../assets/blueBack.jpg';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [newName, setNewName] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [accountCreationTime, setAccountCreationTime] = useState(null);

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

    const creationTime = auth.currentUser.metadata.creationTime;
    setAccountCreationTime(creationTime);

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
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
        nom: newName || userProfile.nom,
      });

      setUserProfile((prevState) => ({
        ...prevState,
        nom: newName || userProfile.nom,
      }));
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
    }
  };

  return (
    <ImageBackground source={cielBackground} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        {auth.currentUser && (
          <View style={styles.profileContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Profile</Text>
              <TouchableOpacity style={styles.profileImageContainer} onPress={() => console.log('Photo Clicked')}>
                <View style={styles.profileImage} />
              </TouchableOpacity>
            </View>

            {accountCreationTime && (
              <Text style={styles.creationTimeText}>
                Account created: {new Date(accountCreationTime).toLocaleDateString()}
              </Text>
            )}

            <View style={styles.profileInfo}>
              <Text style={styles.label}>Email: {auth.currentUser.email}</Text>
              <Text style={styles.label}>Name: {userProfile?.nom || 'Not defined'}</Text>
              <Text style={styles.label}>High Score Flappy Bird: {userProfile?.highScore || 0}</Text>
              <Text style={styles.label}>Points Hang Man: {userProfile?.pointsHangman || 0}</Text>
              <Text style={styles.label}>Points Rock Paper Scissors: {userProfile?.pointsRPS || 0}</Text>
              <Text style={styles.label}>All Points: {userProfile?.pointsHangman + userProfile?.pointsRPS || 0}</Text>

              <TextInput
                style={styles.input}
                placeholder="New Name"
                onChangeText={(text) => setNewName(text)}
                value={newName}
              />
            </View>

            <TouchableOpacity onPress={handleModification} style={styles.button}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={[styles.button, { backgroundColor: '#F17272' }]}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  creationTimeText: {
    color: '#000',
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#248ad9',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
