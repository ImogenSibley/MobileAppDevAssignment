import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
//-------------------------------
//Custom Inputs for Username and Password

const customInput = ({value, setValue, placeholder, secureTextEntry}) => {
	return (
		<View style={styles.container}>
		<TextInput 
			value={value}
			onChangeText={setValue}
			style={styles.input} 
			placeholder={placeholder} 
			secureTextEntry={secureTextEntry}
			/>
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
	input: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 60,
	},
});

export default customInput