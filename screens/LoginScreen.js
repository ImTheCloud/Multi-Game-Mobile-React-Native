import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import cielBackground from '../assets/blueBack.jpg';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Login', { screen: 'Home' });
      }
    });
  }, []);

  const handleLogin = () => {
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          setLoading(false);
          navigation.navigate('Login', { screen: 'Home' });
        })
        .catch(error => {
          setError("E-mail address or password not correct");
          setLoading(false);
        });
  };

  return (
      <ImageBackground source={cielBackground} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            {/* Ajouter un titre */}
            <Text style={styles.title}>Multi Game Mobile</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                  placeholder="Type your email"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.input}
              />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                  placeholder="Type your Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={styles.input}
                  secureTextEntry
              />
            </View>

            {/* Afficher les erreurs */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.buttonText}>Login</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Create Account</Text>
              </TouchableOpacity>
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
    borderRadius: 20,
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
});

export default LoginScreen;