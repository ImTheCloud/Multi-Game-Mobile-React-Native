// Quizz.js

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import quizzData from '../quizz.json';

const Quizz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswer = (selectedOption) => {
        const correctAnswer = quizzData.quiz[`q${currentQuestion + 1}`].answer;

        if (selectedOption === correctAnswer) {
            // Réponse correcte, gagner 2 points
            setScore(score + 2);
        } else {
            // Réponse incorrecte, perdre 1 point
            setScore(Math.max(0, score - 1));
        }

        if (currentQuestion < Object.keys(quizzData.quiz).length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    if (showScore) {
        return (
            <View>
                <Text>Your Final Score: {score} out of {Object.keys(quizzData.quiz).length * 2}</Text>
                <Button title="Restart Quizz" onPress={handleRestart} />
            </View>
        );
    }

    return (
        <View>
            <Text>Score: {score}</Text>
            <Text>{quizzData.quiz[`q${currentQuestion + 1}`].question}</Text>
            {quizzData.quiz[`q${currentQuestion + 1}`].options.map((option, index) => (
                <Button
                    key={index}
                    title={option}
                    onPress={() => handleAnswer(option)}
                />
            ))}
        </View>
    );
};

export default Quizz;
