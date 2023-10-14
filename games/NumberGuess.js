import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert, ImageBackground,
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
    const [timeLeft, setTimeLeft] = useState(20); // Temps initial en secondes

    useEffect(() => {
        // Réinitialiser le chronomètre à chaque niveau ou redémarrage du jeu
        setTimeLeft(20);

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
            setMessage(guess < targetNumber ? 'The number is higher' : 'The number is lower');
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
        setTimeLeft(20);

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
            setTimeLeft(20);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.background}
        >
        <View style={styles.container}>
            <Text style={[styles.level, { color: 'white' }]}>Level {level}</Text>
            {/*<Text style={styles.target}>Target: {targetNumber}</Text>*/}
            <View style={styles.timer}>
                <Text style={styles.timerText}>{timeLeft}</Text>
            </View>
            <Text style={[styles.message, { color: 'rgba(255, 255, 255, 0.8)' }]}>{message}</Text>

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
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 150,
    },
    level: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#fff',
    },
    target: {
        fontSize: 20,
        marginBottom: 10,
        color: 'black',
    },

    timer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 150, // Adjust the border-radius to half of the desired width/height
        width: 100, // Set the width and height to create a circle
        height: 100,
        alignItems: 'center', // Center the timer content horizontally
        justifyContent: 'center', // Center the timer content vertically
    },
    timerText: {
        fontSize: 30,  // Increase the font size for the timer
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        width: 150,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 10,
    },

    message: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        width: '70%',
        backgroundColor: 'rgb(44,44,44)',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: -100,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

});
