import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Image, Text, View, Dimensions } from 'react-native';

export default function GameList({ games, onSelectGame }) {
  const windowWidth = Dimensions.get('window').width;

  return (
      <ScrollView
          contentContainerStyle={styles.gameListContainer}
      >
        {games.map((game, index) => (
            <TouchableOpacity
                key={index}
                style={[styles.gameItem, { width: windowWidth * 0.45 }]}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  gameItem: {
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
