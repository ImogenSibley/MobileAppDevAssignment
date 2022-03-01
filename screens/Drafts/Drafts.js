import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomButtonSmall from '../../components/customButtonSmall';

const Drafts = ({ navigation }) => {
    const [post, setPost] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMess, setErrorMess] = useState('');

    const viewDraft = async () => {
        //get from async storage
        let draft = await AsyncStorage.getItem('@session_draft');
        setPost(draft);
        setIsLoading(false);
    }

    const saveDraft = async (textInput) => {
        await AsyncStorage.setItem('@session_draft', textInput);
        setErrorMess("Draft Saved.");
    }

    const postDraft = async (textInput) => {
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
                return response.json()
            } else if (response.status === 401) {
                navigation.navigate("Login");
            } else {
                console.log(response.status);
                throw 'Something went wrong';
            }
        }).then((responseJson) => {
            setErrorMess('Draft Posted.')
            //console.log(responseJson);
        }).catch((error) => {
            console.log(error);
        })
        } else {
            setErrorMess('Please write at least 1 character before posting.');
        }
    }

    const deleteDraft = async () => {
        //remove from async storage
        await AsyncStorage.removeItem('@session_draft');
        setErrorMess('Draft Deleted.');
    }
    
    const checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            navigation.navigate('Login');
        }
    };

    useEffect(() => {
        checkLoggedIn();
        viewDraft();
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
                    {/*Drafts Page*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Drafts</Text>
                    </View>
                </View>
                <View style={styles.container}>
                     <Text style={styles.post}>{errorMess}</Text>
                     {/*Draft displayed here*/}
                     <View style={styles.postContainer}>
                        <Text style={styles.post}>{post}</Text>
                     </View>
                     {/*Text Input for Editing a Draft*/}
                     <CustomInput placeholder="Edit your Draft here..." value={post} setValue={setPost} />
                     {/*Button to Post or Delete*/}
                     <CustomButton text="Save Edited Draft" onPress={() => saveDraft(post)} />
                     <CustomButton text="Post Draft" onPress={() => postDraft(post)} />
                     <CustomButton text="Delete" onPress={() => deleteDraft()} />
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

export default Drafts;
