import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';

export default function GameListInfo({ games, onSelectGame }) {
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
              <View style={styles.gameContent}>
                <Image source={game.image} style={styles.gameImage} />
                <Text style={styles.gameTitle}>{game.title}</Text>
              </View>
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
    width: '100%',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderColor: '#16247d',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  gameImage: {
    width: 60, // Adjust the size of the image
    height: 60, // Adjust the size of the image
    borderRadius: 5, // Optional: Add border radius to the image
  },
  gameTitle: {
    flex: 1, // Allow the text to take the remaining space
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
