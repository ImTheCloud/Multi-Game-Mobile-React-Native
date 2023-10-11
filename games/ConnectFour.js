import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ROWS = 6;
const COLS = 7;

const createEmptyBoard = () => {
    return Array(ROWS).fill(Array(COLS).fill(null));
};

export default function ConnectFour({ navigation }) {
    const [board, setBoard] = useState(createEmptyBoard());
    const [isRedTurn, setIsRedTurn] = useState(true);

    useEffect(() => {
        checkWinner();
    }, [board]);

    const dropPiece = (col) => {
        const newBoard = [...board.map(row => [...row])];
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = isRedTurn ? 'R' : 'Y';
                setBoard(newBoard);
                setIsRedTurn(!isRedTurn);
                return;
            }
        }
    };

    const checkWinner = () => {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (board[row][col]) {
                    if (
                        checkHorizontal(row, col) ||
                        checkVertical(row, col) ||
                        checkDiagonalUp(row, col) ||
                        checkDiagonalDown(row, col)
                    ) {
                        Alert.alert('Winner', `${isRedTurn ? 'Yellow' : 'Red'} wins!`, [{ text: 'OK', onPress: resetGame }]);
                    }
                }
            }
        }
    };

    const checkHorizontal = (row, col) => {
        const player = board[row][col];
        let count = 1;

        for (let i = col + 1; i < COLS && board[row][i] === player; i++) {
            count++;
        }

        for (let i = col - 1; i >= 0 && board[row][i] === player; i--) {
            count++;
        }

        return count >= 4;
    };

    const checkVertical = (row, col) => {
        const player = board[row][col];
        let count = 1;

        for (let i = row + 1; i < ROWS && board[i][col] === player; i++) {
            count++;
        }

        return count >= 4;
    };

    const checkDiagonalUp = (row, col) => {
        const player = board[row][col];
        let count = 1;

        for (let i = row + 1, j = col - 1; i < ROWS && j >= 0 && board[i][j] === player; i++, j--) {
            count++;
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j < COLS && board[i][j] === player; i--, j++) {
            count++;
        }

        return count >= 4;
    };

    const checkDiagonalDown = (row, col) => {
        const player = board[row][col];
        let count = 1;

        for (let i = row + 1, j = col + 1; i < ROWS && j < COLS && board[i][j] === player; i++, j++) {
            count++;
        }

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && board[i][j] === player; i--, j--) {
            count++;
        }

        return count >= 4;
    };

    const resetGame = () => {
        setBoard(createEmptyBoard());
        setIsRedTurn(true);
    };

    const renderSquare = (row, col) => (
        <TouchableOpacity style={styles.square} onPress={() => dropPiece(col)} key={col}>
            {board[row][col] === 'R' && <View style={styles.redPiece} />}
            {board[row][col] === 'Y' && <View style={styles.yellowPiece} />}
        </TouchableOpacity>
    );

    const renderBoard = () => (
        <View style={styles.board}>
            {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
                </View>
            ))}
        </View>
    );

    const renderRestartButton = () => (
        <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navigationButtonContainer} onPress={() => navigation.navigate('GameScreen')}>
                <Ionicons name="ios-arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Connect Four</Text>
            {renderBoard()}
            <View style={styles.buttonContainer}>
                {renderRestartButton()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
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
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    square: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    redPiece: {
        width: 35,
        height: 35,
        borderRadius: 30,
        backgroundColor: 'red',
    },
    yellowPiece: {
        width: 35,
        height: 35,
        borderRadius: 30,
        backgroundColor: 'yellow',
    },
    navigationButtonContainer: {
        position: 'absolute',
        top: 50,
        left: 10,
        zIndex: 1,
    },
    restartButton: {
        backgroundColor: '#16247d',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%', // Take the full width of the screen
        elevation: 3,
    },
    restartButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%', // Assurez-vous que le conteneur du bouton prend toute la largeur
        marginTop: 50, // Add some margin to separate the board and the button
    },
});
