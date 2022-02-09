import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, View, StyleSheet, Text, ScrollView, TextInput, Keyboard, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Login from './screens/Login';

//----------------------------------------------
//App Main


const App = () => {
	return (
	<SafeAreaView style={styles.root}>
		<Login />	
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#ffcfe6',
	}

});

export default App;
