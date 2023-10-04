import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';

export default function ProfilScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profil</Text>
      <TouchableOpacity onPress={handleSignOut} style={{ marginTop: 20 }}>
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}
