import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import CustomButton from '../../components/customButton';

const Logout = () => {

	const onLogoutPressed = () => {
		//logout button
		return fetch("http://localhost:3333/api/1.0.0/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
		}).then((response) => {
			if (response.status === 201 || response.status === 200) {
				console.log("fetch successful!")
				return response.json();
			} else if (response.status === 400) {
				throw "Bad data - Logout unsuccessful"
			} else if (response.status === 401) {
				throw "Bad data - Logout unauthorised"
			} else {
				throw "Something went wrong: " + response.status
			}
		}).then((responseJson) => {
			navigation.navigate("Login");
		}).catch((err) => {
			console.log(err);
		})

	}
	return (
		<SafeAreaView style={styles.root}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Are you sure you want to log out?</Text>
				{/*Button to Click Logout*/}
				<CustomButton text="Logout" onPress={onLogoutPressed} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#ffcfe6',
	}

});

export default Logout;