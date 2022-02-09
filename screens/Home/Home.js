import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Button } from 'react-native';

class Home extends Component {
	render() {
		return (
			<SafeAreaView style={styles.root}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text>Home</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#ffcfe6',
	}

});

export default Home;
