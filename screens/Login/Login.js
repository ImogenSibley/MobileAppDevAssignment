import React from 'react';
import { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
//import { rocket } from '../assets';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
//----------------------------------------------
//Login Screen

const Login = () => {
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onLoginPressed = () => {
		console.warn("Username: "+username);
		console.warn("Password: "+password);
	}

	return (
		<View style={styles.container}>
			{/*Spacebook Logo*/}
			{/*Login Title*/}
			<View style={styles.titleContainer}>
				<Text style={styles.sectionTitle}>Login</Text>

			</View>

			{/*Text Input for logging in*/}
			<CustomInput placeholder="Username" value={username} setValue={setUsername} />
			<CustomInput secureTextEntry={true} placeholder="Password" value={password} setValue={setPassword} />

			{/*Button to Click Login*/}
			<CustomButton text="Login" onPress={onLoginPressed} />
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 120,
		height: 120,
	},
	container: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: 10
	},
	titleContainer: {
		paddingTop: 80,
		paddingHorizontal: 40,
	},
	sectionTitle: {
		fontSize: 24,
		fontFamily: 'helvetica',
	}
});

export default Login