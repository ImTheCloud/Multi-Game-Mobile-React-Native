import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Entypo, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import GameScreen from './screens/GameScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import InfoScreen from './screens/InfoScreen';
import RankingScreen from './screens/RankingScreen';
import ProfilScreen from './screens/ProfilScreen';
import TicTacToe from './games/TicTacToe';
import HangmanGame from './games/HangmanGame';
import ConnectFour from './games/ConnectFour';
import NumberGuess from './games/NumberGuess';
import Quizz from './games/Quizz';
import FlappyBird from './games/Flappybird/FlappyBird';
import SettingsScreen from './screens/SettingsScreen';
import { auth } from './firebase';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const GameStack = createStackNavigator();
const GameStackScreen = () => (
  <GameStack.Navigator screenOptions={{ headerShown: false  }}>
    <GameStack.Screen name="GameScreen" component={GameScreen}/>
    <GameStack.Screen name="NumberGuess" component={NumberGuess}/>
      <GameStack.Screen name="FlappyBird" component={FlappyBird}/>
      <GameStack.Screen name="TicTacToe" component={TicTacToe}/>
    <GameStack.Screen name="HangmanGame" component={HangmanGame}/>
    <GameStack.Screen name="ConnectFour" component={ConnectFour}/>
    <GameStack.Screen name="Quizz" component={Quizz}/>

  </GameStack.Navigator>
);


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
          <Tab.Navigator initialRouteName="Game" screenOptions={screenOptions}>
        <Tab.Screen
        name="Rank"
        component={RankingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5 name="hackerrank" size={24} color={focused ? "#16247d" : "black"} />
              <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#111" }}>RANKING</Text>
            </View>
          ),
        }}
      />

            <Tab.Screen
                name="Rule"
                component={InfoScreen}
                options={{
                  tabBarIcon: ({focused})=>{
                    return (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                          <Entypo name="info-with-circle" size={24} color={focused ? "#16247d" : "black"} />
                          <Text style={{fontSize: 12, color: focused ? "#16247d" : "#111"}}>INFO</Text>
                        </View>
                    )
                  }
                }}
            />
    <Tab.Screen 
       name="Game"
       component={GameStackScreen} 
        options={{
         tabBarIcon: ({focused})=>{
           return (
             <View
              style={{
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: focused ? "#16247d" : "black",
               width: Platform.OS == "ios" ? 50 : 60,
               height: Platform.OS == "ios" ? 50 : 60,
               top: Platform.OS == "ios" ? -10 : -20,
               borderRadius: Platform.OS == "ios" ? 25 : 30
              }}
             >
               <Entypo name="game-controller" size={24} color="white" />
             </View>
           )
         }
        }}

       />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  tabBarIcon: ({focused})=>{
                    return (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                          <Ionicons name="settings" size={24} color={focused ? "#16247d" : "black"} />
                          <Text style={{fontSize: 12, color: focused ? "#16247d" : "#111"}}>SETTINGS</Text>
                        </View>
                    )
                  }
                }}
            />

        <Tab.Screen 
          name="Profil" 
          component={ProfilScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <FontAwesome name="user" size={24} color={focused ? "#16247d" : "black"} />
                  <Text style={{fontSize: 12, color: focused ? "#16247d" : "#111"}}>PROFIL</Text>
                </View>
              )
            }
          }}
        />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        backgroundColor: '#eaf5ff',
    },
};
export default App;
