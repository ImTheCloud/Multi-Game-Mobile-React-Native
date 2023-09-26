import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));   // gérer l'état du tableau de jeu 9 cases
  const [xIsNext, setXIsNext] = useState(true);   // État pour suivre le tour actuel, X ou O
// États pour suivre les scores de X, O et les matchs nuls
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const winner = calculateWinner(board);   // Fonction pour calculer le gagnant en fonction de l'état du tableau

  // Fonction pour gérer le clic sur une case du tableau
  const handleClick = (index) => {
    if ( winner || board[index]) return; // case deja remmpli on peux plus la changer

    const newBoard = [...board]; // crée un nv tab et le met a jour (... = copie de board)
    newBoard[index] = xIsNext ? 'X' : 'O'; // remplace la case changé dans le nv tab par x si non o (?= par : = sinon)
    // maj et passe au tour suivant
    setBoard(newBoard); 
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)); // vider le tab
    setXIsNext(true); //comencer par x
  };

  const checkGameStatus = () => { // gagne ? nul ? alerte + score maj
    if (winner) {
      if (winner === 'X') {
        setXWins(xWins + 1);
      } else if (winner === 'O') {
        setOWins(oWins + 1);
      }
      Alert.alert('Winner', `${winner} wins!`, [{ text: 'OK', onPress: resetGame }]);
    } else if (board.every((square) => square)) {
      setDraws(draws + 1);
      Alert.alert('Draw', 'The game is a draw!', [{ text: 'OK', onPress: resetGame }]);
    }
  };

  React.useEffect(() => {  // useEffect appele checkGameStatus des que le board est modifié
    checkGameStatus();
  }, [board]);

  const renderSquare = (index) => ( //cree zone cliquable pour les cases du tab
    <TouchableOpacity
      style={styles.square} //css
      onPress={() => handleClick(index)} //case presse appele handleclick
    >
    {/* affiche contenu de la case vide x ou O */}
      <Text style={styles.squareText}>{board[index]}</Text> 
    </TouchableOpacity>
  );

  const status = winner // determine le statu de la partie apres un clique
    ? `Winner: ${winner}`
    : board.every((square) => square)
    ? 'Match nul'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;
    function calculateWinner(squares) { 
      const lines = [  //conbinaison possible gagnant
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    
      for (let i = 0; i < lines.length; i++) { // parcour toutes les combi gagnantes
        const [a, b, c] = lines[i]; // extrait dans a b et c toutes les valeurs 
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // verifie si c'est x ou o
          return squares[a]; // retourne le symbole gagnant
        }
      }
    
      return null; // pas de gagnant ne rien faire
    }

  return ( 
    // vue tic tac toe
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
        {/* vue score */}
      </View> 
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Scores :</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>X -{'>'}</Text>
          <Text style={styles.scoreValue}>{xWins}</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>O -{'>'}</Text>
          <Text style={styles.scoreValue}>{oWins}</Text>
        </View>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Draws -{'>'}</Text>
          <Text style={styles.scoreValue}>{draws}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetGame}
      >
        <Text style={styles.resetButtonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  board: {
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
  squareText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#3F88C5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 15,
  },
});