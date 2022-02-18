import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/customButton'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {

	const getFirstName = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
        const firstName = await AsyncStorage.getItem('@first_name');
        //console.log(userID);
        return fetch("http://localhost:3333/api/1.0.0/user/"+userID, {
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
			//const firstName = await AsyncStorage.getItem('@first_name');
            console.log(firstName.toString());
            return firstName;
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

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{uri: 'https://miro.medium.com/max/3150/1*I8orYDhyFrbI-p21DstL6A.jpeg'}}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>User</Text>
                        <Text style={styles.info}>Email Address</Text>
                        {/*Button to Post*/}
			            <CustomButton text="Add Friend" onPress={getFirstName}/>
                        {/*Button to Post*/}
			            <CustomButton text="View Friends List"/>

                    </View>
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

export default Profile;
