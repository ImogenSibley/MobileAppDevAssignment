import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

const AccountSettings = () => {
	return (
		<SafeAreaView style={styles.root}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Account Settings</Text>
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

export default AccountSettings;