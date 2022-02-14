import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

//--------------------------
//Custom Button for Logging In
const customButton = ({ onPress, text }) => {
	return (
		<Pressable onPress={onPress} style={styles.button}>
		<Text style={styles.text}> {text} </Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '90%',
		height: 60,
		backgroundColor: '#28a3a5',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#fff',
		borderWidth: 2,
	},
	text: {
		fontWeight: 'bold',
		color: 'white',
		fontFamily: 'helvetica'
	}
});

export default customButton;