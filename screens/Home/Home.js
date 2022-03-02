import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomButtonSmall from '../../components/customButtonSmall';

const Home = ({ navigation }) => {
	const [firstName, setFirstName] = useState('');
    const [posts, setPosts] = useState('');
    const [newPost, setNewPost] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMess, setErrorMess] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            refreshPage();
        })
        checkLoggedIn();
        getFirstName();
        getAllPosts();
    }, [])

    const refreshPage = () => {
        checkLoggedIn();
        getFirstName();
        getAllPosts();
    }

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

    const saveAsDraft = async (textInput) => {
        await AsyncStorage.setItem('@session_draft', textInput);
        setNewPost('');
        setErrorMess("Draft Saved.");
    }

    const addNewPost = async (textInput) => {
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id")
        if (textInput != ''){
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
                setErrorMess('');
                setNewPost('');
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
        } else {
            setErrorMess('Please write at least 1 character before posting.');
        }
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
                setErrorMess("Post Deleted.");
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else {
                console.log(response.status);
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            getAllPosts();
            //console.log(response.status);
        }).catch((error) => {
            console.log(error);
        })
    }

    const onEditPostPressed = (postID) => {
        //store this ID to fetch details of post ID from edit page
		navigation.navigate("Edit Post", {postID: postID});
	}

    const onViewDraftsPressed = () => {
        //go to drafts page
        setErrorMess('');
        navigation.navigate('Drafts');
    }

    const ItemView = ({item}) => {
        return (
        <View style={styles.postContainer}>
            <Text style={styles.post}>
                {item.id}{item.author.first_name}{' '}{item.author.last_name}{' - '}{item.text}{' '}{item.timestamp}{' - Likes: '}{item.numLikes}
                {' '}<CustomButtonSmall text="Edit" onPress={() => onEditPostPressed(item.post_id)}/>{' '}<CustomButtonSmall text="Delete" onPress={() => deletePost(item.post_id)}/>
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

    if (isLoading) {
        return (
            <SafeAreaView style={styles.root}>
                <View><Text style={styles.sectionTitle}>Loading...</Text></View>
            </SafeAreaView>
        );
    } else {
        return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <View style={styles.header}>
                    {/*Homepage*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Welcome back {firstName}!</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.post}>{errorMess}</Text>
                    {/*Text Input for Writing a Post*/}
                    <CustomInput placeholder="Write your post here..." value={newPost} setValue={setNewPost} />
                    {/*Button to Post*/}
                    <CustomButton text="Post" onPress={() => addNewPost(newPost)} /> 
                    <CustomButtonSmall text="Save As Draft" onPress={() => saveAsDraft(newPost)} /> <CustomButtonSmall text="View Drafts" onPress={onViewDraftsPressed} />
                </View>
                <View style={styles.container}>
                     {/*Posts go here*/}
                     <FlatList
                         data={posts}
                         keyExtractor={(item, index) => index.toString()}
                         ItemSeperatorComponent={ItemSeperatorView}
                         renderItem={ItemView}
                     />
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
    header:{
        backgroundColor: "#45ded0",
        height:200,
        padding: 10,
    },
	container: {
		alignItems: 'center',
        paddingTop: 20,
	},
	titleContainer: {
		paddingTop: 80,
		paddingHorizontal: 40,
        padding: 40,
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
