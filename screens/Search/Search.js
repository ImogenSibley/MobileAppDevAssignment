import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

const Search = () => {
	return (
		<SafeAreaView style={styles.root}>
			<View>
				<Text>Search</Text>
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

export default Search;