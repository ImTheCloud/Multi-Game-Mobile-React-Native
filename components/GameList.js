import React from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function GameList({ games, onSelectGame }) { 
  // le composant GameList reçoit deux props  games et onSelectGame
  // games : Un tableau d'objets représentant les jeux à afficher
  // onSelectGame : Une fonction qui sera appelée lorsqu'un jeu est sélectionné (homescreen)
  return ( //rend une scrollView
    <ScrollView
      horizontal // mets la liste en horizontal
      contentContainerStyle={styles.gameList} // css de la liste voir en bas
    >
      {games.map((game, index) => ( // map pour parcourir games
        <TouchableOpacity //bouton cliquable
          key={index}
          style={styles.gameItem}
          onPress={() => onSelectGame(game)} // apelle la fonction de homescreen pour la navigation
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
    width: 80, // Ajustez la largeur de l'image 
    height: 80, // Ajustez la hauteur de l'image 
  },
});
