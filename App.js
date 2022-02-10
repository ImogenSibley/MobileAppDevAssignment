import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Search from './screens/Search';
import AccountSettings from './screens/AccountSettings';
import Logout from './screens/Logout';


//----------------------------------------------
//App Main

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
         <Drawer.Navigator initialRouteName="Home">
             <Drawer.Screen name="Home" component={Home}  />
             <Drawer.Screen name="Account Settings" component={AccountSettings} />
             <Drawer.Screen name="Logout" component={Logout} />
         </Drawer.Navigator>
    );
}

function App() {
    return ( 
    //login function somewhere here to redirect to either sign up or home (if authenticated)
        <NavigationContainer>
            <Tab.Navigator //main page when logged in
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-planet'
                                : 'ios-planet-outline';
                        } else if (route.name === 'Profile' ) {
                            iconName = focused
                                ? 'ios-person'
                                : 'ios-person-outline';
                        } else if (route.name === 'Search' ) {
                            iconName = focused
                                ? 'ios-search'
                                : 'ios-search-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#45ded0',
                    tabBarInactiveTintColor: '#28a3a5',
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                <Tab.Screen name="Search" component={Search} options={{ headerShown: false }}/>
     
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;