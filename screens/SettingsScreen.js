import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

// Ajout des imports
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function SettingsScreen() {
    const navigation = useNavigation();
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [notificationsText, setNotificationsText] = useState('Enable Notifications');

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

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        setNotificationsText(notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications');
        // Implement your logic to enable or disable notifications
    };

    return (
        <ImageBackground source={require('../assets/blueBack.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>

                <TouchableOpacity style={styles.option} onPress={toggleSound}>
                    <Text style={styles.optionText}>{isPlaying ? 'Stop Music' : 'Play Music'}</Text>
                    <Switch
                        value={isPlaying}
                        onValueChange={toggleSound}
                        trackColor={{ false: '#767577', true: '#16247d' }}
                        thumbColor={isPlaying ? '#767577' : '#16247d'}
                    />
                </TouchableOpacity>


                <View style={styles.option}>
                    <Text style={styles.optionText}>{notificationsText}</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                        trackColor={{ false: '#767577', true: '#16247d' }}
                        thumbColor={notificationsEnabled ? '#767577' : '#16247d'}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // ou 'stretch' pour étirer l'image pour remplir tout l'écran
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 380, // Espace en haut de la page

    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fond semi-transparent
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        elevation: 3,
    },
    optionText: {
        fontSize: 18,
    },
});
