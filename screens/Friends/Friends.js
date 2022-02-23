import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButtonSmall from '../../components/customButtonSmall';

const Friends = ({ navigation }) => {
    const [friendList, setFriendList] = useState('');
    const [errorMess, setErrorMess] = useState('0 friends.');

	const getFriendList = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/friends", {
            'headers': {
            'X-Authorization':  value
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            if(responseJson.length !== 0) {
                setErrorMess('');
            }
            console.log(responseJson);
            setFriendList(responseJson);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const onViewProfilePressed = (requestedUserID) => {
        //store this ID to fetch details from user ID on their profile
		navigation.navigate("Friend Profile", {requestedUserID: requestedUserID});
	}
    
    const checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            navigation.navigate('Login');
        }
    };

    const ItemView = ({item}) => {
        return (
            <View>
                <Text style={styles.text}>
                {item.id}{item.user_givenname}{' '}{item.user_familyname}{' '}<CustomButtonSmall text="View Profile" onPress={() => onViewProfilePressed(item.user_id)}/>
                </Text>
            </View>
        );
    }

  const ItemSeperatorView = () => {
    return (
        <View 
            style={{height: 0.5, width: '100%', backgroundColor: 'white'}}
        />
    );
  }

    useEffect(() => {
      checkLoggedIn();
      getFriendList();
    }, []);

	return (
		<SafeAreaView style={styles.root}>
        <ScrollView>
            <View style={styles.header}>
                {/*Friends Requests Page*/}
                <View style={styles.titleContainer}>
                    <Text style={styles.sectionTitle}>My Friends</Text>
    	        </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>{errorMess}</Text>
                <View style={styles.text}>
                    <FlatList
                        data={friendList}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeperatorComponent={ItemSeperatorView}
                        renderItem={ItemView}
                    />
                </View>  
            </View>
        </ScrollView>
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
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 30
	},
	titleContainer: {
		paddingTop: 80,
		paddingHorizontal: 40,
        alignItems: 'center',
	},
	sectionTitle: {
		fontSize:28,
        color: "#696969",
        fontWeight: "600"
	},
    text: {
        fontSize:16,
        color: "#696969",
        marginTop:10,
        fontWeight: 'bold'
    },
    inputContainer: {
		backgroundColor: '#fff',
		width: '90%',
		borderRadius: 60,
		borderColor: '#45ded0',
		borderWidth: 2,	
        paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 60,
    }
});

export default Friends;