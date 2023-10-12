import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TicTacToe() {
  const navigation = useNavigation();
  const [board, setBoard] = useState(createEmptyBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (row, col) => {
    if (winner || board[row][col]) return;

    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      Alert.alert('End of the game !', `${newWinner} wins!`, [{ text: 'OK' }]);
    }
  };


  const resetGame = () => {
    setBoard(createEmptyBoard());
    setXIsNext(true);
  };
  function calculateWinner(squares) {
    const lines = [
      // Rows
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [4, 5, 6, 7],
      [5, 6, 7, 8],
      [6, 7, 8, 9],
      [8, 9, 10, 11],
      [9, 10, 11, 12],
      [10, 11, 12, 13],
      [12, 13, 14, 15],
      // Columns
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      // Diagonals
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (
          squares[a % 4][Math.floor(a / 4)] &&
          squares[a % 4][Math.floor(a / 4)] === squares[b % 4][Math.floor(b / 4)] &&
          squares[a % 4][Math.floor(a / 4)] === squares[c % 4][Math.floor(c / 4)] &&
          squares[a % 4][Math.floor(a / 4)] === squares[d % 4][Math.floor(d / 4)]
      ) {
        return squares[a % 4][Math.floor(a / 4)];
      }
    }

    return null;
  }

  function createEmptyBoard() {
    return Array(4)
        .fill(null)
        .map(() => Array(4).fill(null));
  }

  const renderSquare = (row, col) => (
      <TouchableOpacity style={styles.square} onPress={() => handleClick(row, col)}>
        {board[row][col] === 'X' && <Image source={require('../assets/croix.png')} style={styles.imageStyle} />}
        {board[row][col] === 'O' && <Image source={require('../assets/cercle.png')} style={styles.imageStyle} />}
        {!board[row][col] && (
            <Text style={board[row][col] === 'X' ? styles.blueSquareText : styles.redSquareText}>
              {board[row][col]}
            </Text>
        )}
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Tic-Tac-Toe</Text>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((_, colIndex) => (
                    <View key={colIndex} style={styles.square}>
                      {renderSquare(rowIndex, colIndex)}
                    </View>
                ))}
              </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 70,
  },
  board: {
    marginBottom: 30,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  blueSquareText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  redSquareText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#16247d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
});
