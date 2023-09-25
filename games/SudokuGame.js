import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const SudokuGame = () => {
  const initialGrid = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  );

  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    generateRandomGrid();
  }, []);

  const generateRandomGrid = () => {
    // Générer une grille de Sudoku aléatoire avec quelques cases préremplies
    // Assurez-vous qu'il y a une solution unique et que la grille est relativement facile à résoudre

    const newGrid = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => 0)
    );

    // Remplissez quelques cases préremplies
    // Assurez-vous de les remplir de manière à avoir une solution unique
    // Vous pouvez définir un nombre de cases préremplies selon la difficulté souhaitée

    // Exemple : Remplissez quelques cases pour une grille de Sudoku facile
    newGrid[0][0] = 5;
    newGrid[0][2] = 3;
    newGrid[0][4] = 7;
    newGrid[1][0] = 6;
    newGrid[1][3] = 1;
    newGrid[1][4] = 9;
    newGrid[1][5] = 5;
    newGrid[2][1] = 9;
    newGrid[2][2] = 8;
    newGrid[2][7] = 6;
    newGrid[3][0] = 8;
    newGrid[3][4] = 6;
    newGrid[3][8] = 3;
    newGrid[4][0] = 4;
    newGrid[4][3] = 8;
    newGrid[4][5] = 3;
    newGrid[4][8] = 1;
    newGrid[5][0] = 7;
    newGrid[5][4] = 2;
    newGrid[5][8] = 6;
    newGrid[6][1] = 6;
    newGrid[6][6] = 2;
    newGrid[6][7] = 8;
    newGrid[7][3] = 4;
    newGrid[7][4] = 1;
    newGrid[7][5] = 9;
    newGrid[7][8] = 5;
    newGrid[8][6] = 7;
    newGrid[8][7] = 9;

    setGrid(newGrid);
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <TouchableOpacity
            key={cellIndex}
            style={styles.cell}
            onPress={() => handleCellPress(rowIndex, cellIndex)}
          >
            <Text style={styles.cellText}>{cell || ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  const handleCellPress = (row, col) => {
    if (grid[row][col] === 0) {
      // La case est vide, affichez une boîte de dialogue pour choisir un chiffre
      showNumberPicker(row, col);
    }
  };

  const showNumberPicker = (row, col) => {
    Alert.alert('Choisissez un chiffre', null, [
      { text: '1', onPress: () => updateCell(row, col, 1) },
      { text: '2', onPress: () => updateCell(row, col, 2) },
      { text: '3', onPress: () => updateCell(row, col, 3) },
      { text: '4', onPress: () => updateCell(row, col, 4) },
      { text: '5', onPress: () => updateCell(row, col, 5) },
      { text: '6', onPress: () => updateCell(row, col, 6) },
      { text: '7', onPress: () => updateCell(row, col, 7) },
      { text: '8', onPress: () => updateCell(row, col, 8) },
      { text: '9', onPress: () => updateCell(row, col, 9) },
    ]);
  };

  const updateCell = (row, col, value) => {
    // Mettez à jour la valeur de la cellule et l'état de la grille
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  return (
    <View style={styles.container}>
      {renderGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 20,
  },
});

export default SudokuGame;
