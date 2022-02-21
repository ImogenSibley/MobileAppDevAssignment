import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//--------------------------
//Custom Button for Logging In
const customAddButton = ({ onPress, text }) => {
	return (
		<TouchableHighlight onPress={onPress} style={styles.button}>
			<View>
				{/*<Ionicons iconName='ios-person-add' size={32} color='white' />*/}
				<Text style={styles.text}>Friend+</Text>
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 70,
		height: 30,
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

export default customAddButton;