import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomButtonSmall from '../../components/customButtonSmall';
import CalendarPicker from 'react-native-calendar-picker';

const Drafts = ({ navigation }) => {
    const [post, setPost] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMess, setErrorMess] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            refreshPage();
        })
        checkLoggedIn();
        viewDraft();
    }, [])

    const refreshPage = () => {
        checkLoggedIn();
        viewDraft();
    }

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    }

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

    function dateDifference(dateScheduled) {
        //gets current date and returns difference between date scheduled.
        const currentDate = Date.now();
        //console.log(currentDate);
        //console.log(dateScheduled);
        //console.log(Math.floor(dateScheduled - currentDate));
        return Math.floor(Math.floor(dateScheduled - currentDate));
    }

    const onScheduleDraftPressed = (textInput) => {
        //set timeout time between scheduled date and current date
        const startDate = Date.parse(selectedStartDate ? selectedStartDate.toString() : '');
        var intervalTime = dateDifference(startDate);
        setTimeout(() => {
            //console.log('Post will be called here.');
            postDraft(textInput);
        }, intervalTime)
        //after interval => post draft
        setErrorMess('Post Scheduled.');
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
                    {/*Drafts Page*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Drafts</Text>
                    </View>
                </View>
                <Text style={styles.text}>{errorMess}</Text>
                <View style={styles.body}>
                <View>
                     <CalendarPicker
                         startFromMonday={true}
                         minDate={new Date(2018, 1, 1)}
                         maxDate={new Date(2050, 6, 3)}
                         weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                         months={['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]}
                         previousTitle="Previous"
                         nextTitle="Next"
                         todayBackgroundColor="#45ded0"
                         selectedDayColor="#28a3a5"
                         selectedDayTextColor="#000000"
                         scaleFactor={375}
                         textStyle={{
                             color: '#000000',
                         }}
                         onDateChange={onDateChange}
                     />
                     <Text style={styles.text}>
                         Selected Date :
                     </Text>
                     <Text style={styles.text}>
                         {selectedStartDate ? selectedStartDate.toString() : ''}
                     </Text>
                    </View>
                <View style={styles.buttonContainer}>
                        <CustomButtonSmall text="Schedule Post" onPress={() => onScheduleDraftPressed(post)}/>
                </View>
                {/*Draft displayed here*/}
                <View style={styles.postContainer}>
                    <Text style={styles.post}>{post}</Text>
                </View>
                <View style={styles.container}>
                     {/*Text Input for Editing a Draft*/}
                     <CustomInput placeholder="Edit your Draft here..." value={post} setValue={setPost} />
                     {/*Button to Post or Delete*/}
                     <CustomButton text="Save Edited Draft" onPress={() => saveDraft(post)} />
                     <CustomButtonSmall text="Delete Draft" onPress={() => deleteDraft()} />
                     <CustomButtonSmall text="Post Draft" onPress={() => postDraft(post)} />
                    </View>
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
        marginTop: 40,
        padding: 20,
    },
	container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 10,
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

export default Drafts;
