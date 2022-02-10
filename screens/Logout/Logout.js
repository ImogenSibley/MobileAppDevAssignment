import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

const Logout = () => {
	return (
		<SafeAreaView style={styles.root}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>This will return the logout function - navigate back to login page</Text>
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