import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

const Profile = () => {
	return (
		<SafeAreaView style={styles.root}>
			<View>
				<Text>Profile</Text>
				<Button
					title="<Back"
					onPress={() => this.props.navigation.goBack()}
				/>
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

export default Profile;
