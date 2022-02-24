import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
//----------------------------------------------
//Login Screen

const Login = ({ navigation }) => {
	
	const [email, setEmail] = useState('Coffee@gmail.com');
	const [password, setPassword] = useState('password');
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
			await AsyncStorage.setItem('@session_token', responseJson.token);
			await AsyncStorage.setItem('@user_id', responseJson.id);
			await AsyncStorage.setItem('@first_name', responseJson.firstName);
            navigation.navigate("Home");
		}).catch((err) => {
			console.log(err);
		})
	}

	const onSignUpPressed = () => {
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
			</View>
			<View style={styles.container}>
				<Text>{errorMess}</Text>
			</View>
			<View style={styles.container}>
				{/*Text Input for logging in*/}
				<CustomInput placeholder="Email" value={email} setValue={setEmail} />
			</View>
			<View style={styles.container}>
				<CustomInput secureTextEntry={true} placeholder="Password" value={password} setValue={setPassword} />
			</View>
			<View style={styles.container}>
				{/*Button to Click Login*/}
				<CustomButton text="Login" onPress={onLoginPressed} />
			</View>
			<View style={styles.container}>
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
		justifyContent: 'center',
	},
	container: {
        alignItems: 'center',
        paddingTop: 10,
	},
	titleContainer: {
		paddingTop: 40,
		paddingHorizontal: 40,
	},
	sectionTitle: {
		fontSize:28,
        color: "#696969",
        fontWeight: "600"
	}
});

export default Login