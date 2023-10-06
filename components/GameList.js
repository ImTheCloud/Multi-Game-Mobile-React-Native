import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';

export default function GameList({ games, onSelectGame }) {
  return (
    <ScrollView
      contentContainerStyle={styles.gameListContainer}
    >
      {games.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={styles.gameItem}
          onPress={() => onSelectGame(game)}
        >
          <Image source={game.image} style={styles.gameImage} />
          <Text style={styles.gameTitle}>{game.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gameListContainer: {
    flexDirection: 'row', // Afficher les éléments en ligne
    flexWrap: 'wrap', // Permettre le retour à la ligne
    justifyContent: 'space-between', // Espace égal entre les éléments
    alignItems: 'flex-start', // Aligner les éléments en haut
    paddingHorizontal: 16,
  },
  gameItem: {
    width: 140,
    height: 170,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameImage: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
