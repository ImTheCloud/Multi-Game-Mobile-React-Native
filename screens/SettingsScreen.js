import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Audio} from 'expo-av';
import {auth} from '../firebase';
import {useNavigation} from '@react-navigation/native';

export default function SettingsScreen() {
    const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        async function loadSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/FlappyBird.mp3')
            );
            setSound(sound);
        }

        loadSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);



    const toggleSound = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSignOut = async () => {
        await auth.signOut();
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={toggleSound}>
                <Text>{isPlaying ? 'Stop Music' : 'Play Music'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignOut}
                style={[styles.button, { backgroundColor: '#F17272' }]}
            >
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#248ad9',
        padding: 10,
        borderRadius: 15,
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});
