import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomButtonSmall from '../../components/customButtonSmall';

const AccountSettings = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [errorMess, setErrorMess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        navigation.addListener('focus', () => {
            refreshPage();
        })
        checkLoggedIn();
        setIsLoading(false);
        ImagePicker.getMediaLibraryPermissionsAsync(true);
        getUserPhoto();
    }, [])

    const refreshPage = () => {
        checkLoggedIn();
        getUserPhoto();
    }

    const updateAccountDetails = async (firstInput, lastInput, emailInput, passInput) => {
        const value = await AsyncStorage.getItem("@session_token");
        const userID = await AsyncStorage.getItem("@user_id")

        // Check email is email
		validateEmail(email);
		console.log(validateEmail(email));
		if (validateEmail(email) == true && email != '') {
            return fetch("http://localhost:3333/api/1.0.0/user/" + userID, {
                method: 'PATCH',
                headers: {
                    "X-Authorization": value,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": emailInput,
                })
            }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setErrorMess('Email Updated.');
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login");
                } else {
                    console.log(response.status);
                    throw 'Something went wrong';
                }
            }).then((responseJson) => {
                console.log('Email Updated.');
            }).catch((error) => {
                console.log(error);
            })
        }
        // Check password is greater than 6 chars and matches confirm pass
		if (password.length >= 6 && password.match(passwordCheck) && password != '' && passwordCheck != '') {
            return fetch("http://localhost:3333/api/1.0.0/user/" + userID, {
                method: 'PATCH',
                headers: {
                    "X-Authorization": value,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "password": passInput,
                })
            }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setErrorMess('Password Updated.');
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login");
                } else {
                    console.log(response.status);
                    throw 'Something went wrong';
                }
            }).then((responseJson) => {
                console.log('Password Updated.');
            }).catch((error) => {
                console.log(error);
            })
        }

        if (firstName != '') {
            return fetch("http://localhost:3333/api/1.0.0/user/" + userID, {
                method: 'PATCH',
                headers: {
                    "X-Authorization": value,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "first_name": firstInput,
                })
            }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setErrorMess('First Name Updated.');
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login");
                } else {
                    console.log(response.status);
                    throw 'Something went wrong';
                }
            }).then((responseJson) => {
                console.log('First Name Updated.');
            }).catch((error) => {
                console.log(error);
            })
        }

        if (lastName != '') {
            return fetch("http://localhost:3333/api/1.0.0/user/" + userID, {
                method: 'PATCH',
                headers: {
                    "X-Authorization": value,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "last_name": lastInput,
                })
            }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setErrorMess('Last Name Updated.');
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login");
                } else {
                    console.log(response.status);
                    throw 'Something went wrong';
                }
            }).then((responseJson) => {
                console.log('Last Name Updated.');
            }).catch((error) => {
                console.log(error);
            })
        }
    }

	const validateEmail = (email) => {
		const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return expression.test(String(email).toLowerCase())
	}

    const checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            navigation.navigate('Login');
        }
    };

    const getUserPhoto = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/photo", {
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
            setIsLoading(false);
        })
        .catch((err) => {
            console.log("error", err)
        });
    }

    const choosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setPhoto(result.uri);
        }
    };

    const uploadPhoto = async (data) => {
        let response = await fetch(data);
        let profilePicture = await response.blob();
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/photo", {
            method: "POST",
            headers: {
                "Content-Type": "image/jpeg",
                "X-Authorization": value
            },
            body: profilePicture
        })
        .then((response) => {
            console.log("Picture Added.");
            setErrorMess('Picture Updated.');
        })
        .catch((err) => {
            console.log(err);
        })
    }

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
                    <Image style={styles.avatar} source={{ uri: photo }} /> 
                    {/*Update Account Details Page*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Update Account Details</Text>
                    </View>
                </View>
                    <View style={styles.body}>
                <View style={styles.container}>
                     <Text style={styles.post}>{errorMess}</Text>
                </View>
                <View style={styles.container}>
                     {/*Text Input for Updating Details*/}
                     <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} />
                </View>
                <View style={styles.container}>
                     <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} />
                </View>
                <View style={styles.container}>
                     <CustomInput placeholder="Email" value={email} setValue={setEmail} />
                </View>
                <View style={styles.container}>
                     <CustomInput secureTextEntry={true} placeholder="Password" value={password} setValue={setPassword} />
                </View>
                <View style={styles.container}>
					 <CustomInput secureTextEntry={true} placeholder="Confirm Password" value={passwordCheck} setValue={setPasswordCheck} />
                </View>
                <View style={styles.container}>
                     {/*Button to Save Changes or Delete*/}
                     <CustomButton text="Save Changes" onPress={() => updateAccountDetails(firstName, lastName, email, password, passwordCheck)} />
                </View>
                <View style={styles.container}>
                     {/*Button to Photo and Button to Upload*/}
                            <CustomButtonSmall text="Choose Photo" onPress={choosePhoto}/> <CustomButtonSmall text="Upload Photo" onPress={() => uploadPhoto(photo)} />
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
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    body:{
        marginTop:40,
    },
	container: {
        alignItems: 'center',
        paddingTop: 10,
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

export default AccountSettings;