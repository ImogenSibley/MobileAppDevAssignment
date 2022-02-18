import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';

const Home = () => {
	const [firstName, setFirstName] = useState('');

	const getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
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
            let first = responseJson.first_name; 
            setFirstName(first);
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
        getData();
    }, [])

      return (
        <SafeAreaView style={styles.root}>
        <View style={styles.header}>
			<View style={styles.container}>
			{/*Spacebook Logo*/}
			{/*Homepage*/}
                <View style={styles.titleContainer}>
                    <Text style={styles.sectionTitle}>Welcome back {firstName}!</Text>
			    </View>
          
			    {/*Text Input for Writing a Post*/}
			    <CustomInput placeholder="Write your post here..."/>
			    {/*Button to Post*/}
			    <CustomButton text="Post"/>
                {/*Posts go here*/}
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
	//logo: {
	//	width: 120,
	//	height: 120,
	//},
    body:{
        marginTop:40,
    },
	container: {
		flex: 1,
        alignItems: 'center',
        padding:30,
	},
	titleContainer: {
		paddingTop: 80,
		paddingHorizontal: 40,
        padding: 30,
	},
	sectionTitle: {
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
	}
});

export default Home;
