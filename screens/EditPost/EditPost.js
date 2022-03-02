import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomButtonSmall from '../../components/customButtonSmall';

const EditPost = ({ route, navigation }) => {
    const [postContent, setPostContent] = useState('');
    const [postChanges, setPostChanges] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMess, setErrorMess] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            refreshPage();
        })
        checkLoggedIn();
        viewPost();
    }, [])

    const refreshPage = () => {
        checkLoggedIn();
        viewPost();
    }

    const viewPost = async () => {
        let postID = route.params.postID;
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id")
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/post/" +postID, {
            headers: {
                "X-Authorization": value,
            },
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
            setIsLoading(false);
            setPostContent(responseJson.text);
            console.log(response.status);
            console.log('Post Fetched.');
        }).catch((error) => {
            console.log(error);
        })
    }

    const editPost = async (textInput) => {
        let postID = route.params.postID;
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id")
        if (textInput != ''){
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/post/" + postID, {
            method: 'PATCH',
            headers: {
                "X-Authorization": value,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "text": textInput,
            })
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setErrorMess('Post Edited.');
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else {
                console.log(response.status);
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            console.log('Post Edited.');
        }).catch((error) => {
            console.log(error);
        })
        } else {
            setErrorMess('Please write at least 1 character before posting.');
        }
    }

    const deletePost = async () => {
        let postID = route.params.postID;
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/post/" + postID, {
            method: 'DELETE',
            headers: {
                "X-Authorization": value,
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setErrorMess('Post Deleted.');
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else {
                console.log(response.status);
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            console.log('Post Deleted.');
        }).catch((error) => {
            console.log(error);
        })
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
                <View style={styles.header}>
                    {/*Spacebook Logo*/}
                    {/*Edit Post Page*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Edit Post</Text>
                    </View>
                </View>
                <Text style={styles.text}>{errorMess}</Text>
                {/*Post displayed here*/}
                <View style={styles.postContainer}>
                    <Text style={styles.post}>{postContent}</Text>
                </View>
                <View style={styles.container}>
                     {/*Text Input for Editing a Post*/}
                     <CustomInput placeholder="Edit your post here..." value={postChanges} setValue={setPostChanges} />
                     {/*Button to Save Changes or Delete*/}
                     <CustomButton text="Save Changes" onPress={() => editPost(postChanges)} />
                     <CustomButton text="Delete" onPress={() => deletePost()} />
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
        height: 200,
        padding: 10,
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
        height: '35%',
        borderColor: '#45ded0',
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        color: "#696969",
        fontWeight: 'bold',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
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

export default EditPost;
