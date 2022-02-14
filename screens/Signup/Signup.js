import React, { Component } from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Button, Alert } from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';


const Signup = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');

	const onSignUpPressed = () => {
		//if sign up completed authentication here
		//POST sign up details store in async storage
		//console.log("mounted");
		//this.getData();
		navigation.navigate("Home");
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

				{/*Text Input for Creating an Account*/}
				<CustomInput placeholder="First Name" value={first_name} setValue={setFirstName} />
				<CustomInput placeholder="Last Name" value={last_name} setValue={setLastName} />
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


	const getData = () => {
		console.log("getting data...");
		return fetch("http://localhost:3333/list")
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					isLoading: false,
					shoppingListData: responseJson
				})
			})
			.catch((error) => {
				console.log(error);
			});
		console.log("data got");
	}

	const addItem = () => {
		let to_send = {
			id: parseInt(this.state.id),
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password
		};

		return fetch("http://localhost:3333/list", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(to_send)
		})
			.then((response) => {
				Alert.alert("Item added");
				this.getData();
			})
			.catch((error) => {
				console.log(error);
			})
	}
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
		fontSize: 24,
		fontFamily: 'helvetica',
	}
});

export default Signup;
