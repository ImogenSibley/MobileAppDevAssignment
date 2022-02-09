import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Search from './screens/Search';


//----------------------------------------------
//App Main

const Stack = createNativeStackNavigator();

function App() {
		return (
			<NavigationContainer>
				<Stack.Navigator >
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="Search" component={Profile} />
				</Stack.Navigator>
			</NavigationContainer>
		);
}

export default App;
