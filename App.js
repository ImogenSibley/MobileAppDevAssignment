import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Search from './screens/Search';


//----------------------------------------------
//App Main


const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'Profile' ) {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        } else if (route.name === 'Search' ) {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'gray',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                <Tab.Screen name="Search" component={Search} options={{ headerShown: false }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
