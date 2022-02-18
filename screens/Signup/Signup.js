import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Button, Alert, AsyncStorage } from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';


const Signup = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [errorMess, setErrorMess] = useState('');

	const validateEmail = (email) => {
		const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return expression.test(String(email).toLowerCase())
	}

	const onSignUpPressed = () => {

		// Check all values are correct/filled in
		if (firstName != '' && lastName != '' && email != '' && password != '' && passwordCheck != '') {

			// Check email is email
			validateEmail(email);
			console.log(validateEmail(email));
			if (validateEmail(email) == true) {

				// Check password is greater than 6 chars and matches confirm pass
				if (password.length >= 6 && password.match(passwordCheck)) {

					// Send to server
					return fetch("http://localhost:3333/api/1.0.0/user", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"first_name": firstName,
							"last_name": lastName,
							"email": email,
							"password": password
						})
					}).then((response) => {
						if (response.status === 201) {
							return response.json();
						} else if (response.status === 400) {
							setErrorMess("This Email is already in use.");
							throw "Bad data - maybe the email already exists?"
						} else {
							throw "Something went wrong: " + response.status
						}
					}).then((responseJson) => {
						navigation.navigate("Login");
					}).catch((err) => {
						console.log(err);
					})

				} else  {
					setErrorMess("Password is not strong enough or passwords don't match.");
					throw "Bad data - Passwords don't match"
				}
			} else {
				setErrorMess("Invalid Email.");
				throw "Bad data - Email is not valid."
			}
		} else  {
			setErrorMess("Some forms were not completed.");
			throw "Bad data - incomplete forms"
		}
	}

	const onReturnPressed = () => {
		console.warn("Returned!");
		navigation.navigate("Login");
	}

		return (
			<SafeAreaView style={styles.root}>
				<View style={styles.container}>
					{/*Spacebook Logo*/}
					{/*Sign Up Title*/}
					<View style={styles.titleContainer}>
						<Text style={styles.sectionTitle}>Create Account</Text>
					</View>

					<Text>{errorMess}</Text>

					{/*Text Input for Creating an Account*/}
					<CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} />
					<CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} />
					<CustomInput placeholder="Email Address" value={email} setValue={setEmail} />
					<CustomInput secureTextEntry={true} placeholder="Password" value={password} setValue={setPassword} />
					<CustomInput secureTextEntry={true} placeholder="Confirm Password" value={passwordCheck} setValue={setPasswordCheck} />


					{/*Button to Sign Up*/}
					<CustomButton text="Create Account" onPress={onSignUpPressed} />

					{/*Button to Return*/}
					<CustomButton text="Back to Login" onPress={onReturnPressed} />

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
		padding: 10,
	},
	titleContainer: {
		paddingTop: 80,
		paddingHorizontal: 40,
	},
	sectionTitle: {
		fontSize:28,
        color: "#696969",
        fontWeight: "600"
	}
});

export default Signup;