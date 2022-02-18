import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
//-------------------------------
//Custom Posts

const customPost = ({value, setValue, placeholder, secureTextEntry}) => {
	return (
		<View style={styles.container}>
		<Text value={value} style={styles.post} placeholder={placeholder} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '90%',
		
		borderRadius: 60,
		borderColor: '#45ded0',
		borderWidth: 2,	


},
	post: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 60,
	},
});

export default customPost