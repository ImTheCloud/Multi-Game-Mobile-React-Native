import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome from react-native-vector-icons

import cielBackground from '../assets/blueBack.jpg';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [newName, setNewName] = useState('');
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
              <View>
                <View style={styles.header}>
                  <Text style={styles.title}>
                    {userProfile?.nom || 'Not defined'}
                  </Text>
                  <TouchableOpacity style={styles.profileImageContainer} onPress={() => console.log('Photo Clicked')}>
                  </TouchableOpacity>
                </View>



                <View style={styles.infoRow}>
                  <Icon name="user" size={40} color="#000" style={styles.icon} />
                  <TextInput
                      style={styles.input}
                      placeholder={userProfile?.nom || 'Not defined'}
                      onChangeText={(text) => setNewName(text)}
                      value={newName}
                  />

                </View>


                <View>
                  <View style={styles.divider}></View>
                  <View style={styles.infoRow}>
                    <Icon name="envelope" size={27} color="#000" />
                    <Text style={styles.label}>Email: {auth.currentUser.email}</Text>
                  </View>
                  <View style={styles.divider}></View>

                  <View style={styles.infoRow}>
                    <Icon name="trophy" size={27} color="#000" />
                    <Text style={styles.label}>High Score Flappy Bird: {userProfile?.highScore || 0}</Text>
                  </View>
                  <View style={styles.divider}></View>

                  <View style={styles.infoRow}>
                    <Icon name="gamepad" size={27} color="#000" />
                    <Text style={styles.label}>Points Hang Man: {userProfile?.pointsHangman || 0}</Text>
                  </View>
                  <View style={styles.divider}></View>

                  <View style={styles.infoRow}>
                    <Icon name="hand-rock-o" size={27} color="#000" />
                    <Text style={styles.label}>Points Rock Paper Scissors: {userProfile?.pointsRPS || 0}</Text>
                  </View>
                  <View style={styles.divider}></View>

                  <View style={styles.infoRow}>
                    <Icon name="star" size={27} color="#000" />
                    <Text style={styles.label}>All Points: {userProfile?.pointsHangman + userProfile?.pointsRPS || 0}</Text>
                  </View>

                  <View style={styles.divider}></View>


                </View>

                <View style={styles.centeredContainer}>
                  <TouchableOpacity onPress={handleModification} style={styles.button}>
                    <Text style={styles.buttonText}>Update Profile</Text>
                  </TouchableOpacity>
                </View>
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
  },
  title: {
    color:'#eaf5ff',
    fontSize: 30,
    fontWeight: 'bold',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  icon: {
    marginRight: 20,
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 18,
  },
  divider: {
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '85%',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#248ad9',
    padding:17, // Increase button size
    borderRadius: 15,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

  },
});