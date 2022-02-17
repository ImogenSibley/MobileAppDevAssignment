import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';

class Home extends Component {
	constructor(props){
    super(props);

    //const [post, setPost] = useState("")
    //const [posts, setPosts] = useState([])

    this.state = {
      isLoading: true,
      listData: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  
    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/search", {
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
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            listData: responseJson
          })
        })
        .catch((error) => {
            console.log(error);
        })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };

  getUserInfo = async () => {
      let userFirst = await AsyncStorage. getItem('@user_givenname');
      let parsedUserFirst = JSON. parse(userFirst);
  }

  render() {

    if (this.state.isLoading){
      return (
        <SafeAreaView style={styles.root}>
			    <View style={styles.container}>
			    {/*Loading Title*/}
			    <View style={styles.titleContainer}>
				    <Text style={styles.sectionTitle}>Loading...</Text>
			    </View>
			    </View>
		    </SafeAreaView>
      );
    }else{
      return (
        <SafeAreaView style={styles.root}>
			<View style={styles.container}>
			{/*Spacebook Logo*/}
			{/*Homepage*/}
            <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}>User's Name</Text>
			</View>
          
			{/*Text Input for Writing a Post*/}
			<CustomInput placeholder="Write your post here..."/>
			{/*Button to Post*/}
			<CustomButton text="Post"/>
			</View>

            {/*Posts go here*/}

		</SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#ffcfe6',
	},
	//logo: {
	//	width: 120,
	//	height: 120,
	//},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 30
	},
	titleContainer: {
		paddingTop: 80,
		paddingHorizontal: 40,
	},
	sectionTitle: {
		fontSize: 24,
		fontFamily: 'helvetica',
	}
});

export default Home;
