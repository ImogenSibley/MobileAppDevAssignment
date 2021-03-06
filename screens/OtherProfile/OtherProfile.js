import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import CustomButton from '../../components/customButton'; 
import CustomButtonSmall from '../../components/customButtonSmall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherProfile = ({route, navigation}) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [numOfFriends, setNumOfFriends] = useState('');
    const [posts, setPosts] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [errorMess, setErrorMess] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            refreshPage();
        })
        checkLoggedIn();
        getUserData();
        getUserPhoto();
        getAllPosts();
    }, [])

    const refreshPage = () => {
        checkLoggedIn();
        getUserData();
        getUserPhoto();
        getAllPosts();
    }

    const getUserData = async () => {
        let requestedUserID = route.params.requestedUserID;
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
              navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        }).then(async (responseJson) => {
            let first = responseJson.first_name;
            setFirstName(first);
            let last = responseJson.last_name;
            setLastName(last);
            let emailAddress = responseJson.email;
            setEmail(emailAddress);
            let friendCount = responseJson.friend_count;
            setNumOfFriends(friendCount);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getUserPhoto = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        let requestedUserID = route.params.requestedUserID;
        return fetch("http://localhost:3333/api/1.0.0/user/" + requestedUserID + "/photo", {
            method: 'GET',
            headers: {
                'X-Authorization': value
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response.blob();
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else if (response.status === 404) {
                throw 'Photo not found.';
            } else {
                throw 'Something went wrong';
            }
        })
        .then((responseBlob) => {
            let data = URL.createObjectURL(responseBlob);
            setPhoto(data);
            //console.log(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log("error", err)
        });
    }

    const getAllPosts = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        let requestedUserID = route.params.requestedUserID;
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
                setPosts(responseJson);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const addLike = async (postID) => {
        const value = await AsyncStorage.getItem("@session_token");
        let requestedUserID = route.params.requestedUserID;
        return fetch("http://localhost:3333/api/1.0.0/user/" + requestedUserID + "/post/" + postID + "/like", {
            method: 'POST',
            headers: {
                "X-Authorization": value,
            },
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setErrorMess('Post Liked.');
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else if (response.status === 404){
                throw 'Post or User Not Found.';
            } else if (response.status === 403){
                throw 'You have already liked this post.';
            } else {
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            console.log("Post Liked Successfully!");
        }).catch((error) => {
            console.log(error);
        })
    }

      const removeLike = async (postID) => {
        const value = await AsyncStorage.getItem("@session_token");
        let requestedUserID = route.params.requestedUserID;
        return fetch("http://localhost:3333/api/1.0.0/user/" + requestedUserID + "/post/" + postID + "/like", {
            method: 'DELETE',
            headers: {
                "X-Authorization": value,
            },
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setErrorMess('Like Removed.');
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else if (response.status === 404){
                throw 'Post or User Not Found.';
            } else if (response.status === 403){
                throw 'You have not liked this post.';
            } else {
                console.log(response.status);
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            console.log("Removed Like Successfully!");
        }).catch((error) => {
            console.log(error);
        })
    }

    const ItemView = ({ item }) => {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.post}>
                    {item.id}{item.author.first_name}{' '}{item.author.last_name}{' - '}{item.text}{' '}{item.timestamp}{' - Likes: '}{item.numLikes}
                    {' '}<CustomButtonSmall text="+ Like" onPress={() => addLike(item.post_id)}/>{' '}<CustomButtonSmall text="- Like" onPress={() => removeLike(item.post_id)}/>
                </Text>
            </View>
        );
    }

    const ItemSeperatorView = () => {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: 'white' }}
            />
        );
    }
    
    const checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            navigation.navigate('Login');
        }
    };
    
    if (isLoading) {
        return (
            <SafeAreaView style={styles.root}>
                <View><Text style={styles.name}>Loading...</Text></View>
            </SafeAreaView>
        );
    } else {
	return (
	<SafeAreaView style={styles.root}>
        <ScrollView>
            <View style={styles.header}>
            </View>
                <Image style={styles.avatar} source={{uri: photo}}/>
                <View style={styles.body}>
                    <View style={styles.container}>
                        <Text style={styles.name}>{firstName} {lastName}</Text>
                        <Text style={styles.info}>{email}</Text>
                        <Text style={styles.info}>Following: {numOfFriends}</Text>
                        {/*If not already friends, show button to add user as friend*/}
			            <CustomButton text="Friends"/>
                        <Text style={styles.post}>{errorMess}</Text>
                        <FlatList
                            data={posts}
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
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffcfe6',
    },
    header: {
        backgroundColor: "#45ded0",
        height: 200,
        padding: 10,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    body: {
        marginTop: 40,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600",
        alignItems: 'center',
    },
    info: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10
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
        fontSize: 16,
        color: "#696969",
        fontWeight: 'bold',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});

export default OtherProfile;
