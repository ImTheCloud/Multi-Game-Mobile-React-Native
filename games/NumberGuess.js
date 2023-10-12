import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import { auth, firestore } from '../firebase';

export default function NumberGuess() {
    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, 10));
    const [userGuess, setUserGuess] = useState('');
    const [message, setMessage] = useState('');
    const [attempts, setAttempts] = useState(1);
    const [level, setLevel] = useState(1);
    const [possibilities, setPossibilities] = useState(10);
    const [placeholderText, setPlaceholderText] = useState(`Your guess (1-${possibilities})`);
    const [timeLeft, setTimeLeft] = useState(60); // Temps initial en secondes

    useEffect(() => {
        // Réinitialiser le chronomètre à chaque niveau ou redémarrage du jeu
        setTimeLeft(60);

        // Définir une fonction d'intervalle pour mettre à jour le temps toutes les secondes
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 1) {
                    // Si le temps atteint 0, redémarrer le jeu
                    resetGame(false);
                }
                return prevTime - 1;
            });
        }, 1000);

        // Nettoyer le timer lorsque le composant est démonté ou lorsque le jeu est redémarré
        return () => clearInterval(timer);
    }, [level, resetGame]);

    const handleInputChange = (text) => {
        setUserGuess(text);
    };

    const handleGuess = () => {
        const guess = parseInt(userGuess);

        if (isNaN(guess) || guess < 1 || guess > possibilities) {
            Alert.alert('Error', `Please enter a number between 1 and ${possibilities}.`, [{ text: 'OK' }]);
            return;
        }

        setAttempts(attempts + 1);

        if (guess === targetNumber) {
            Alert.alert('Congratulations', `You guessed the number ${targetNumber} in ${attempts} attempts!`, [
                { text: 'OK', onPress: () => resetGame(true) },
            ]);
        } else {
            setMessage(guess < targetNumber ? 'The number is higher.' : 'The number is lower.');
        }

        // Clear the input field after a guess
        setUserGuess('');
    };

    const increaseLevel = async () => {
        const newPossibilities = possibilities * 2;
        setPossibilities(newPossibilities);
        setLevel((prevLevel) => prevLevel + 1);
        setTargetNumber(generateRandomNumber(1, newPossibilities));
        setAttempts(1);
        setPlaceholderText(`Your guess (1-${newPossibilities})`);
        setTimeLeft(60);

        try {
            const userId = auth.currentUser.uid;
            const userRef = firestore.collection('profiles').doc(userId);
            const userSnapshot = await userRef.get();

            // Check if the user has a high level already saved
            const currentHighLevel = userSnapshot.data()?.HighLevelNumberGuess || 0;

            // Update the high level if the current level is greater
            if (level > currentHighLevel) {
                await userRef.update({
                    HighLevelNumberGuess: level,
                });
            }
        } catch (error) {
            console.error('Error updating high level:', error);
        }
    };

    const resetGame = (levelUp = false) => {
        setUserGuess('');

        if (levelUp) {
            increaseLevel();
        } else {
            setLevel(1);
            setAttempts(1);
            const newPossibilities = 10;
            setPossibilities(newPossibilities);
            setTargetNumber(generateRandomNumber(1, newPossibilities));
            setPlaceholderText(`Your guess (1-${newPossibilities})`);
            setTimeLeft(60);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Guess the Number</Text>
            <Text style={[styles.level, { color: 'black' }]}>Level: {level}</Text>
            {/*<Text style={styles.target}>Target: {targetNumber}</Text>*/}
            <Text style={styles.timer}>Time left: {timeLeft} seconds</Text>
            <Text style={[styles.message, { color: 'black' }]}>{message}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholderText}
                    keyboardType="numeric"
                    value={userGuess}
                    onChangeText={handleInputChange}
                />

            </View>
            <TouchableOpacity style={styles.button} onPress={handleGuess}>
                <Text style={styles.buttonText}>Guess</Text>
            </TouchableOpacity>
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
    level: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    target: {
        fontSize: 20,
        marginBottom: 10,
        color: 'black',
    },
    timer: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        width: 150,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#16247d',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        elevation: 3,
        marginBottom:50,
    },

});
