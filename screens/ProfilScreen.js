import React, { useState, useEffect } from 'react';
import { View, ImageBackground,Image, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore,storage } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import cielBackground from '../assets/blueBack.jpg';
import * as ImagePicker from 'expo-image-picker';
import {Entypo, Ionicons} from "@expo/vector-icons";

export default function ProfileScreen() {
  const [newName, setNewName] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [image, setImage] = useState(null);

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
            HighLevelNumberGuess:0,
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

  useEffect(() => {
    // Fetch user profile image when the component mounts
    fetchUserProfileImage();
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

  const pickImage = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error('No user is currently authenticated.');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const storageRef = storage.ref();
        const imageName = `profile_images/${user.uid}/profileImage.jpg`; // Fixed path
        const imageRef = storageRef.child(imageName);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        await imageRef.put(blob);

        const downloadURL = await imageRef.getDownloadURL();

        const userDocRef = firestore.collection('users').doc(user.uid);

        try {
          const userDoc = await userDocRef.get();

          if (userDoc.exists) {
            await userDocRef.update({
              profileImage: downloadURL,
            });

            setImage(downloadURL);
          } else {
            await userDocRef.set({
              profileImage: downloadURL,
            });
            setImage(downloadURL);
          }
        } catch (error) {
          console.error('Error getting or updating user document:', error);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const fetchUserProfileImage = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error('No user is currently authenticated.');
      return;
    }

    const userDocRef = firestore.collection('users').doc(user.uid);

    try {
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userProfileImage = userDoc.data().profileImage;
        setImage(userProfileImage);
      }
    } catch (error) {
      console.error('Error getting user document:', error);
    }
  };
  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <ScrollView>

          {auth.currentUser && (
              <View style={styles.main}>
                <View style={styles.header}>
                  <TouchableOpacity
                      style={styles.profileImageContainer}
                      onPress={pickImage}
                  >
                    <Image
                        source={image ? { uri: image } : require('../assets/user.png')}
                        style={{ width: 120, height: 120, borderRadius: 60 }}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.textAboveCircle} numberOfLines={1}>
                        {userProfile?.nom || 'Not defined'}
                      </Text>
                    </View>
                  </TouchableOpacity>

                </View>


                <View style={{ marginVertical: 20 }}></View>

                <View style={styles.containerPadding}>

                  <View style={styles.infoRow}>
                    <Icon name="user" size={35} color="#000" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder={userProfile?.nom || 'Not defined'}
                        onChangeText={(text) => setNewName(text.slice(0, 9))}  // Limiter à 8 caractères
                        value={newName}
                    />

                  </View>
                  <View style={styles.divider}></View>
                  <View style={styles.infoRow}>
                    <Icon name="envelope" size={27} color="#000" />
                    <Text style={styles.label}>Email: {auth.currentUser.email}</Text>
                  </View>
                  <View style={styles.divider}></View>

                  <View style={styles.infoRow}>
                    <Ionicons name="podium" size={24} color="black" />
                    <Text style={styles.label}> High Level Number Guess: {userProfile?.HighLevelNumberGuess || 0}</Text>
                  </View>

                  <View style={styles.divider}></View>
                  <View style={styles.infoRow}>
                    <Entypo name="trophy" size={27} color="#000" />
                    <Text style={styles.label}>High Score Flappy Bird: {userProfile?.highScore || 0}</Text>
                  </View>

                  <View style={styles.divider}></View>
                  <View style={styles.infoRow}>
                    <Icon name="gamepad" size={27} color="#000" />
                    <Text style={styles.label}>High Score Hangman: {userProfile?.highScoreHangman || 0}</Text>
                  </View>

                  <View style={styles.divider}></View>
                  <View style={styles.infoRow}>
                    <Icon name="trophy" size={27} color="#000" />
                    <Text style={styles.label}>High Score Quizz: {userProfile?.HighScoreQuizz || 0}</Text>
                  </View>

                  <View style={styles.divider}>
                  </View>
                  <TouchableOpacity onPress={handleModification} style={styles.button}>
                    <Text style={styles.buttonText}>Update Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSignOut} style={[styles.button, { backgroundColor: 'rgba(180,0,0,0.8)' }]}>
                    <Text style={styles.buttonText}>Log out</Text>
                  </TouchableOpacity>
                </View>
              </View>
          )}
        </ScrollView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerPadding: {
    padding:20,
  },
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
  main: {
    height: '100%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '100%',
    marginBottom: 10,
    backgroundColor:'rgba(36,138,217,0.77)',
    borderBottomStartRadius: 3000,
    borderBottomEndRadius: 3000,
  },

  textContainer: {
    position: 'absolute',
    top: -40,
    backgroundColor: 'transparent',

  },
  textAboveCircle: {
    fontSize: 25, // Augmentez la taille du texte
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Couleur du texte
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140,
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
    borderBottomWidth: 1,
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
    backgroundColor: '#16247d',
    padding:15, // Increase button size
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