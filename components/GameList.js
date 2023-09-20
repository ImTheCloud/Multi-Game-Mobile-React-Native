import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function GameList({ games, onSelectGame }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.gameList}
    >
      {games.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={styles.gameItem}
          onPress={() => onSelectGame(game)}
        >
          <Image source={game.image} style={styles.gameImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gameList: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  gameItem: {
    width: 100, // Largeur carrée du bouton
    height: 100, // Hauteur carrée du bouton
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameImage: {
    width: 80, // Ajustez la largeur de l'image selon vos besoins
    height: 80, // Ajustez la hauteur de l'image selon vos besoins
    borderRadius: 8, // Ajoutez un bord arrondi à l'image si nécessaire
  },
});
