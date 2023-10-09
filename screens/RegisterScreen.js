// RegisterScreen.js
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore } from '../firebase'; // Assuming you have a reference to firestore in your firebase.js file

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState(''); // Add state for the "nom" field

  const navigation = useNavigation();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

        // Add user data to Firestore
        await firestore.collection('profiles').doc(user.uid).set({
          nom,
          highScore: 0,
          pointsHangman: 0,
          pointsRPS: 0,
        });

        console.log('Registered with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../assets/Logo.png')}
          style={{ width: 200, height: 100, resizeMode: 'contain', marginBottom: 20 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input, { width: '100%' }]}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.input, { width: '100%' }]}
            secureTextEntry
          />
          <TextInput
            placeholder="Name"
            value={nom}
            onChangeText={(text) => setNom(text)}
            style={[styles.input, { width: '100%' }]}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>Already have an account?</Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text style={[styles.loginLinkText, { color: '#0782F9', marginLeft: 5 }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
  },
  buttonContainer: {
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#0782F9',
    borderWidth: 2,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  loginLinkText: {
    color: '#333',
    fontSize: 16,
  },
});

export default RegisterScreen;
