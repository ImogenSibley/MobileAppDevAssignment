import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendRequests = () => {
	const [friendRequests, setFriendRequests] = useState('');

	const getFriendRequests = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id')
        return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
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
        }).then((responseJson) => {
            console.log(responseJson);
            setFriendRequests(responseJson);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            this.props.navigation.navigate('Login');
        }
    };

    const ItemView = ({item}) => {
        return (
            <View>
                <Text style={styles.text}>
                {item.id}{item.first_name}{' '}{item.last_name}
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
      getFriendRequests();
    }, []);

	return (
		<SafeAreaView style={styles.root}>
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.container}>
                    {/*Friends Requests Page*/}
                    <View style={styles.titleContainer}>
                        <Text style={styles.sectionTitle}>Friend Requests</Text>
			        </View>
                    <View style={styles.text}>
                        <FlatList
                            data={friendRequests}
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

export default FriendRequests;