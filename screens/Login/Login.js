import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
//----------------------------------------------
//Login Screen

const Login = ({ navigation }) => {
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMess, setErrorMess] = useState('');

	const onLoginPressed = async () => {
		//GET login details from server
		return fetch("http://localhost:3333/api/1.0.0/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		}).then((response) => {
			if (response.status === 201 || response.status === 200 ) {
				console.log("fetch successful!")
				return response.json();
			} else if (response.status === 400) {
				setErrorMess("This user does not exist.");
				throw "Bad data - Non existant user?"
			} else {
				throw "Something went wrong: " + response.status
			}
		}).then(async (responseJson) => {
            //console.log(responseJson);
			await AsyncStorage.setItem('@session_token', responseJson.token);
            navigation.navigate("Home");
		}).catch((err) => {
			console.log(err);
		})
	}

	const onSignUpPressed = () => {
		//console.warn("Sign Up!");
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

			<Text>{errorMess}</Text>

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