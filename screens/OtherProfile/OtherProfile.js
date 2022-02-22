import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/customButton'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherProfile = (requestedUserID) => {
    const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
    const [friendCount, setFriendCount] = useState('');

	const getUserData = async (requestedUserID) => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/"+requestedUserID, {
            'headers': {
            'X-Authorization':  value
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        }).then(async (responseJson) => {
            console.log(responseJson);
            let first = responseJson.first_name; 
            setFirstName(first);
            let last = responseJson.last_name; 
            setLastName(last);
            let emailAddress = responseJson.email;
            setEmail(emailAddress);
            let friends = responseJson.friend_count;
            setFriendCount = friends;
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            this.props.navigation.navigate('Login');
        }
    };

    useEffect(() => {
        checkLoggedIn();
        getUserData(requestedUserID);
    }, [])

	return (
        
		<SafeAreaView style={styles.root}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://miro.medium.com/max/3150/1*I8orYDhyFrbI-p21DstL6A.jpeg'}}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{firstName} {lastName}</Text>
                        <Text style={styles.info}>{email}</Text>
                        <Text style={styles.info}>{friendCount}</Text>
                        {/*If not already friends, show button to add user as friend*/}
			            <CustomButton text="Add Friend"/>
			            <CustomButton text="View Friends List"/>
                    </View>
                </View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#ffcfe6',
	},
    header:{
        backgroundColor: "#45ded0",
        height:200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "#696969",
        marginTop:10
    },
});

export default OtherProfile;
