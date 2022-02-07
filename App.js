import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, View, StyleSheet, Text, ScrollView, TextInput, Keyboard, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Task from './components/Task';

//----------------------------------------------
//Login Screen

export default function App() {

	return (
		<View style={styles.container}>
			{/*Login Title*/}
			<View style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>Login</Text>

			</View>

			{/*Text Input for logging in*/}
			<TextInput style={styles.input} placeholder={'Username'} />
			<TextInput style={styles.input} placeholder={'Password'} />
			<View style={styles.button}>
				<Text style={styles.addText}>Login</Text>
			</View>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffcfe6',
		justifyContent: 'center',
		alignItems: 'center',

	},
	tasksWrapper: {
		paddingTop: 80,
		paddingHorizontal: 40,
	},
	sectionTitle: {
		fontSize: 24,
		fontFamily: 'helvetica',
	},
	button: {
		width: 60,
		height: 60,
		backgroundColor: '#fff',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ffd500',
		borderWidth: 1,
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: '#fff',
		borderRadius: 60,
		borderColor: '#ffd500',
		borderWidth: 1,
		width: 250,
	},

});


