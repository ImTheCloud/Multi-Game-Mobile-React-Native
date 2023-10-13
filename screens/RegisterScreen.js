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
import Icon from 'react-native-vector-icons/FontAwesome'; // or any other icon library
import { auth, firestore } from '../firebase';

import cielBackground from '../assets/blueBack.jpg'; // Assuming you have a similar background image

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
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
            HighLevelNumberGuess: 0,
            HighScoreQuizz:0,
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
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                  placeholder="Type your Username"
                  value={nom}
                  onChangeText={(text) => setNom(text.slice(0, 9))}
                  style={styles.input}
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                  placeholder="Type your email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
              />

              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                    placeholder="Type your Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={[styles.input, styles.passwordInput]}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.toggleIconContainer}
                    onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="grey" />
                </TouchableOpacity>
              </View>


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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Added for proper positioning of the eye icon
  },
  passwordInput: {
    flex: 1,
  },
  toggleIconContainer: {
    position: 'absolute',
    right: 10, // Adjust the value based on your preference
  },
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
    fontSize: 36, // Augmentez la taille du texte
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Couleur du texte
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop:70,
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
