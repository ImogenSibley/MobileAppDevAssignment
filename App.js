import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Friends from './screens/Friends';
import FriendRequests from './screens/FriendRequests';
import Search from './screens/Search';
import AccountSettings from './screens/AccountSettings';
import Logout from './screens/Logout';
import OtherProfile from './screens/OtherProfile';
import EditPost from './screens/EditPost';
import Drafts from './screens/Drafts';



//----------------------------------------------
//App Main

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
  

function App(){
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login" //make sure this is login unless testing
          component={Login} //make sure this is login unless testing
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={TabHome} options={{header: (props) => null }}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Friend Profile" component={OtherProfile} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Edit Post" component={EditPost} />
        <Stack.Screen name="Drafts" component={Drafts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerHome() {
    return (
         <Drawer.Navigator initialRouteName="Login">
             <Drawer.Screen name="Home" component={Home}  />
             <Drawer.Screen name="Account Settings" component={AccountSettings} />
             <Drawer.Screen name="Logout" component={Logout} /> 
         </Drawer.Navigator>
    );
}

function TabHome() {
    return ( 
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
                                ? 'ios-rocket'
                                : 'ios-rocket-outline';
                        } else if (route.name === 'Friends' ) {
                            iconName = focused
                                ? 'ios-people'
                                : 'ios-people-outline';
                        } else if (route.name === 'Friend Requests' ) {
                            iconName = focused
                                ? 'ios-person-add'
                                : 'ios-person-add-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#45ded0',
                    tabBarInactiveTintColor: '#28a3a5',
                })}
            >
                <Tab.Screen name="Home" component={DrawerHome} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                <Tab.Screen name="Search" component={Search} options={{ headerShown: false }}/>
                <Tab.Screen name="Friends" component={Friends} options={{ headerShown: false }}/>
                <Tab.Screen name="Friend Requests" component={FriendRequests} options={{ headerShown: false }}/>
     
            </Tab.Navigator>
    );
}

export default App;