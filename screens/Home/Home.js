import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomButtonSmall from '../../components/customButtonSmall';

const Home = ({ navigate }) => {
	const [firstName, setFirstName] = useState('');
    const [posts, setPosts] = useState('');
    const [newPost, setNewPost] = useState('');
    const [friendList, setFriendList] = useState('');
    const [friendUserID, setFriendUserID] = useState('');
    const [friendUserIDs, setFriendUserIDs] = useState([]);
    const [friendsPosts, setFriendsPosts] = useState('');
    const [isLoading, setIsLoading] = useState(true);

	const getFirstName = async () => {
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
              navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            //console.log(responseJson);
            let first = responseJson.first_name; 
            setFirstName(first);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getAllPosts = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post", {
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
            //console.log(responseJson);
            setPosts(responseJson);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getFriendList = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/friends", {
            'headers': {
                'X-Authorization': value
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }
            }).then((responseJson) => {
                setFriendList(responseJson);
                setFriendUserIDs(responseJson.user_id);
                console.log(responseJson.user_id);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getFriendsPosts = async (requestedUserID) => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + requestedUserID + "/post", {
            'headers': {
                'X-Authorization': value
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }
            }).then((responseJson) => {
                setFriendsPosts(responseJson);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const addNewPost = async (textInput) => {
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id")
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/post", {
            method: 'POST',
            headers: {
                "X-Authorization": value,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "text": textInput,
            })
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else {
                console.log(response.status);
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            getAllPosts();
            //console.log(responseJson);
        }).catch((error) => {
            console.log(error);
        })
    }

    const deletePost = async (postID) => {
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/post/" + postID, {
            method: 'DELETE',
            headers: {
                "X-Authorization": value,
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else {
                console.log(response.status);
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            console.log(response.status);
        }).catch((error) => {
            console.log(error);
        })
    }

    const ItemView = ({item}) => {
        return (
        <View style={styles.postContainer}>
            <Text style={styles.post}>
                {item.id}{item.author.first_name}{' '}{item.author.last_name}{' - '}{item.text}{' '}{item.timestamp}{' - Likes: '}{item.numLikes}
                {' '}<CustomButtonSmall text="Edit"/>{' '}<CustomButtonSmall text="Delete" onPress={() => deletePost(item.post_id)}/>
            </Text>
        </View>
        );
    }

    const FriendItemView = ({ item }) => {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.post}>
                    {item.id}{item.author.first_name}{' '}{item.author.last_name}{' - '}{item.text}{' '}{item.timestamp}{' - Likes: '}{item.numLikes}
                </Text>
            </View>
        );
    }

  const ItemSeperatorView = () => {
    return (
        <View 
            style={{ height: 0.5, width: '100%', backgroundColor: 'white'}}
        />
    );
  }
    
    const checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            navigation.navigate('Login');
        }
    };

    useEffect(() => {
        checkLoggedIn();
        getFirstName();
        getAllPosts();
        getFriendList();
        getFriendsPosts();
        //for all user IDs in friends list {
        //getFriendsPosts(requestedUserID);
        //}
    }, [])


    if (isLoading) {
        return (
            <SafeAreaView style={styles.root}>
                <View><Text style={styles.sectionTitle}>Loading...</Text></View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.header}>
                    {/*Spacebook Logo*/}
                    {/*Homepage*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Welcome back {firstName}!</Text>
                    </View>
                </View>
                <View style={styles.container}>
                     {/*Text Input for Writing a Post*/}
                     <CustomInput placeholder="Write your post here..." value={newPost} setValue={setNewPost} />
                     {/*Button to Post*/}
                     <CustomButton text="Post" onPress={() => addNewPost(newPost)} />
                     {/*Posts go here*/}
                     <FlatList
                         data={posts}
                         keyExtractor={(item, index) => index.toString()}
                         ItemSeperatorComponent={ItemSeperatorView}
                         renderItem={ItemView}
                     />
                     <FlatList
                         data={friendsPosts}
                         keyExtractor={(item, index) => index.toString()}
                         ItemSeperatorComponent={ItemSeperatorView}
                         renderItem={FriendItemView}
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
	},
    header:{
        backgroundColor: "#45ded0",
        height:200,
    },
    body:{
        marginTop:40,
    },
	container: {
		flex: 1,
        alignItems: 'center',
        padding: 30,
	},
	titleContainer: {
		paddingTop: 80,
		paddingHorizontal: 40,
        padding: 30,
        alignSelf: 'center'
	},
	sectionTitle: {
        fontSize:28,
        color: "#696969",
        fontWeight: "600",
        alignItems: 'center',
	},
    postContainer: {
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignContent: 'center',
    	backgroundColor: '#ffffff',
        width: '90%',
		borderColor: '#45ded0',
		borderWidth: 1,	
    },
    post: {
        fontSize:16,
        color: "#696969",
        fontWeight: 'bold',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});

export default Home;
