import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore } from '../firebase';

import cielBackground from '../assets/blueBack.jpg'; // Assuming you have a similar background image

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (!nom.trim()) {
      setError('Please provide a username.');
      return;
    }

    setLoading(true);

    auth.createUserWithEmailAndPassword(email, password)
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
          setLoading(false);
          navigation.navigate('Login', { screen: 'Home' });
        })
        .catch((error) => {
          let errorMessage = 'An error occurred. Please try again.';

          switch (error.code) {
            case 'auth/invalid-email':
              errorMessage = 'The email address is not correctly formatted.';
              break;
            case 'auth/weak-password':
              errorMessage = 'The password must contain at least 6 characters.';
              break;
            default:
              errorMessage = error.message || errorMessage;
          }

          setError(errorMessage);
          setLoading(false);
        });
  };


  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>Multi Game Mobile</Text>


            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                  placeholder="Type your email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
              />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                  placeholder="Type your Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  secureTextEntry
              />
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                  placeholder="Type your Username"
                  value={nom}
                  onChangeText={(text) => setNom(text.slice(0, 9))}  // Limiter à 8 caractères

                  style={styles.input}
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                  onPress={handleSignUp}
                  style={[styles.button, styles.buttonOutline]}
                  disabled={loading}
              >
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.buttonOutlineText}>Register</Text>
                )}
              </TouchableOpacity>
              <View style={styles.loginLinkContainer}>
                <Text style={styles.loginLinkText}>Already have an account? </Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={[styles.loginLinkText, styles.loginLink]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    width: 300,
    alignItems: 'flex-start', // Alignez les éléments à gauche
  },
  inputLabel: {
    marginLeft: 5, // Ajoutez une marge à gauche pour déplacer le inputContainer vers la droite
    paddingTop: 10,
    color: 'white',
    fontSize: 17,
    marginBottom: 5,
  },
  input: {

    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',


  },
  buttonContainer: {
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#248ad9',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderColor: '#248ad9',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#248ad9',
    fontWeight: '700',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 15,

  },
  loginLinkText: {
    color: '#333',
    fontSize: 16,
  },loginLink: {
    color: '#248ad9',
    fontSize: 16,
  },
});

export default RegisterScreen;
