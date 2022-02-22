import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList, ScrollView} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomAddButton from '../../components/customAddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
  const [userList, setUserList] = useState('');
  const [filterUserList, setFilterUserList] = useState('');
  const [search, setSearch] = useState('');
  const [requestedUserID, setRequestedUserID] = useState('');
  const [message, setMessage] = useState('');

  const getAllUsers = async () => {
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
           //console.log(responseJson);
           setUserList(responseJson);
           setFilterUserList(responseJson);
        })
        .catch((error) => {
            console.log(error);
        })
  };

  const checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };

  const searchFilter = (text) => {
        if (text) {
            const newData = userList.filter((item) => {
                const itemData = item.user_givenname 
                    ? item.user_givenname.toUpperCase()
                    : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterUserList(newData);
            setSearch(text);
        } else {
            setFilterUserList(userList);
            setSearch(text);
        }
  }

  const onAddFriend = async (requestedUserID) => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/"+requestedUserID+"/friends", {
            method: "POST",
            'headers': {
            'X-Authorization':  value
            }
        })
        .then((response) => {
            if(response.status === 201 || response.status === 200){
                return response.json()
            }else if(response.status === 401){
              navigation.navigate("Login");
            }else if(response.status === 403){
              setMessage("User may already be added.");
              throw 'Forbidden - User may already be added';
            }else if(response.status === 404){
              throw 'Not found';
            }else if(response.status === 500){
              throw 'Server Error';
            }else{
              console.log(response.status)
              throw 'Something went wrong';
            }
        }).then((responseJson) => {
            setMessage("Friend Request Sent!");
            console.log(response.status)
            console.log("Friend Request Sent")
        }).catch((err) => {
			console.log(err);
		})
    }

  const ItemView = ({item}) => {
    return (
        <Text style={styles.results}>
        {item.id}{item.user_givenname}{' '}{item.user_familyname}{' '}<CustomAddButton onPress={() => onAddFriend(item.user_id)} />
        </Text>
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
        getAllUsers();
    }, []);

    return (
		<SafeAreaView style={styles.root}>
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.container}>
                    {/*Search Page*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Search</Text>
			        </View>
                    <Text>{message}</Text>
                    {/*Text Input for Searching for friends*/}
			        <TextInput style={styles.inputContainer} placeholder="Find Friends..." onChangeText={(text) => searchFilter(text)} value={search}/>
                    <View style={styles.results}>
                        <FlatList
                            data={filterUserList}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeperatorComponent={ItemSeperatorView}
                            renderItem={ItemView}
                        />
                    </View>
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
	},
	sectionTitle: {
		fontSize:28,
        color: "#696969",
        fontWeight: "600"
	},
    results: {
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

export default Search;