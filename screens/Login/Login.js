import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView } from 'react-native';
//import { rocket } from '../assets';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
//----------------------------------------------
//Login Screen

const Login = ({ navigation }) => {
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onLoginPressed = () => {
		console.warn("User: "+email);
		console.warn("Password: " + password);
		//if login authenticated, navigate to home
		//GET login details
		navigation.navigate("Home");
	}

	const onSignUpPressed = () => {
		console.warn("Sign Up!");
		navigation.navigate("Signup");
	}

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
			{/*Spacebook Logo*/}
			{/*Login Title*/}
			<View style={styles.titleContainer}>
				<Text style={styles.sectionTitle}>Login</Text>

			</View>

			{/*Text Input for logging in*/}
			<CustomInput placeholder="Email" value={email} setValue={setEmail} />
			<CustomInput secureTextEntry={true} placeholder="Password" value={password} setValue={setPassword} />

			{/*Button to Click Login*/}
			<CustomButton text="Login" onPress={onLoginPressed} />

			{/*Button to Sign Up*/}
			<CustomButton text="Create an Account" onPress={onSignUpPressed} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#ffcfe6',
	},
	//logo: {
	//	width: 120,
	//	height: 120,
	//},
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