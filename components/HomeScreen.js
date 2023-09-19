import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
source={require('../assets/background.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to the Multi Game Mobile</Text>
        <Text style={styles.description}>Are you ready to play ?</Text>
      </View>
      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    navigation.navigate('NumberGuessGame');
  }}
>
  <Text style={styles.buttonText}>Number Guess Game</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => {
    navigation.navigate('TicTacToe'); // Ajoutez cette ligne pour accéder à Game1
  }}
>
  <Text style={styles.buttonText}>Tic Tac Toe</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3F88C5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

