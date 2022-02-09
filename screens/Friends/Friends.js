import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Friends extends Component {
    render() {
        return (
            <SafeAreaView style={styles.root}>
                <View>
                    <Text>Friends</Text>
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

export default Friends;