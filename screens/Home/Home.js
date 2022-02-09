import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Button } from 'react-native';

class Home extends Component {
	render() {
		return (
			<SafeAreaView style={styles.root}>
				<View>
					<Text>Home</Text>
					<Button
						title="Profile"
						onPress={() => this.props.navigation.navigate('Profile')}
					/>
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
