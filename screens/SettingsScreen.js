// SettingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { auth, firestore, storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

export default function SettingsScreen({ navigation }) {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [image, setImage] = useState(null);

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

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };

    const pickImage = async () => {
        try {
            const user = auth.currentUser;

            if (!user) {
                console.error('No user is currently authenticated.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const storageRef = storage.ref();
                const imageName = `profile_images/${user.uid}/${Date.now()}`;
                const imageRef = storageRef.child(imageName);
                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();

                await imageRef.put(blob);

                const downloadURL = await imageRef.getDownloadURL();

                const userDocRef = firestore.collection('users').doc(user.uid);

                try {
                    const userDoc = await userDocRef.get();

                    if (userDoc.exists) {
                        await userDocRef.update({
                            profileImage: downloadURL,
                        });

                        setImage(downloadURL);
                    } else {
                        await userDocRef.set({
                            profileImage: downloadURL,
                        });
                        setImage(downloadURL);
                    }
                } catch (error) {
                    console.error('Error getting or updating user document:', error);
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings</Text>
            <TouchableOpacity onPress={toggleSound}>
                <Text>{isPlaying ? 'Stop Music' : 'Play Music'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignOut}
                style={[styles.button, { backgroundColor: '#F17272' }]}
            >
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.profileImageContainer}
                onPress={pickImage}
            >
                <Image
                    source={image ? { uri: image } : require('../assets/user.png')}
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
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
