import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch, ImageBackground, Modal, TouchableHighlight } from 'react-native';
import { Audio } from 'expo-av';
import * as MailComposer from 'expo-mail-composer';

export default function SettingsScreen() {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [appVersion, setAppVersion] = useState('1.0.0'); // Remplacez par la version réelle de votre application
    const sendFeedback = async () => {
        try {
            const { status } = await MailComposer.isAvailableAsync();

            if (status !== 'unavailable') {
                await MailComposer.composeAsync({
                    recipients: ['cpopadiuc@helb-prigogine.be'], // Remplacez par votre adresse e-mail
                    subject: 'Feedback',
                    body: 'Hi, your app is great!\n',
                });
            }
        } catch (error) {
            console.error('Error :', error);
        }
    };

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

    const openAboutModal = () => {
        setModalVisible(true);
    };

    const closeAboutModal = () => {
        setModalVisible(false);
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
                        thumbColor={isPlaying ? '#16247d' : '#767577'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={sendFeedback}>
                    <Text style={styles.optionText}>Feedback</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.option} onPress={openAboutModal}>
                    <Text style={styles.optionText}>About</Text>
                </TouchableOpacity>

                {/* Fenêtre modale "About" */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeAboutModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title}>Version</Text>
                            <Text>App Version: {appVersion}</Text>
                            <TouchableOpacity onPress={closeAboutModal}>
                                <Text style={styles.modalCloseButton}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        marginBottom: 330, // Espace en haut de la page
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
        backgroundColor: 'rgb(255,255,255)', // Fond semi-transparent
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        elevation: 3,
    },
    optionText: {
        fontSize: 18,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalCloseButton: {
        marginTop: 10,
        color: '#16247d',
        textAlign: 'center',
    },
});
