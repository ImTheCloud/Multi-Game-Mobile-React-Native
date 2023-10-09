import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore } from '../firebase';

export default function ProfilScreen() {
  const navigation = useNavigation();
  const [nouveauNom, setNouveauNom] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      const userId = auth.currentUser.uid;
      const userRef = firestore.collection('profiles').doc(userId);

      try {
        const doc = await userRef.get();
        if (doc.exists) {
          setUserProfile(doc.data());
        } else {
          // If the document doesn't exist, initialize it with the user's ID
          await userRef.set({
            nom: '', // Set other default values as needed
            highScore: 0,
            pointsHangman: 0,
            pointsOxo: 0,
            pointsPPS: 0,
            pointsTotaux: 0,
          });

          // Fetch the updated user profile
          const updatedDoc = await userRef.get();
          setUserProfile(updatedDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
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
      // Ensure userProfile is available before attempting to update
      if (!userProfile) {
        console.log('User profile not found, trying to fetch again');
        const updatedDoc = await userRef.get();
        if (updatedDoc.exists) {
          setUserProfile(updatedDoc.data());
        } else {
          console.log('User profile still not found');
          return;
        }
      }

      await userRef.update({
        nom: nouveauNom || userProfile.nom, // Keep the existing name if the new one is empty
      });

      // Update the local state to reflect the changes
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Profil</Text>

      {auth.currentUser && (
        <View style={{ marginBottom: 20, width: '100%' }}>
          <Text>Email: {auth.currentUser.email}</Text>
          <Text>Nom: {userProfile?.nom || 'Non défini'}</Text>
          <Text>High Score Flappy Bird: {userProfile?.highScore || 0}</Text>
          <Text>Points HM: {userProfile?.pointsHangman || 0}</Text>
          <Text>Points Oxo: {userProfile?.pointsOxo || 0}</Text>
          <Text>Points PPS: {userProfile?.pointsPPS || 0}</Text>
          <Text>Points Totaux: {userProfile?.pointsTotaux || 0}</Text>

          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, width: '100%' }}
            placeholder="Nouveau Nom"
            onChangeText={text => setNouveauNom(text)}
            value={nouveauNom}
          />
          <TouchableOpacity onPress={handleModification} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, width: '100%' }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Modifier le Profil</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={handleSignOut} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, width: '100%' }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
