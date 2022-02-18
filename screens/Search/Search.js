import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  
    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
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
          this.setState({
            isLoading: false,
            listData: responseJson
          })
        })
        .catch((error) => {
            console.log(error);
        })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };

  searchFilterFunction(text) {
        if (text) {
            const listData = [this.state.listData];
            const newData = listData.filter(
                function (item) {
                    const itemData = item.user_givenname
                    ? item.user_givenname.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
  };

  render() {

    if (this.state.isLoading){
      return (
        <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Text>Loading..</Text>
        </View>
        </SafeAreaView>
      );
    }else{
      return (
        <SafeAreaView style={styles.root}>
        <View style={styles.container}>
			{/*Spacebook Logo*/}
			{/*Search Page*/}
            <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}>Search</Text>
			</View>
          
			{/*Text Input for Searching for friends*/}
			<CustomInput placeholder="Enter a name..." onChangeText={(text) => searchFilterFunction(text)}/>
			{/*Button to Search*/}
			<CustomButton text="Search"/>
            <FlatList
                data={this.state.listData}
                //if input matches results, display results
                renderItem={({item}) => (
                    <View>
                      <Text style={styles.results}>{item.user_givenname} {item.user_familyname}</Text>
                    </View>
                )}
                keyExtractor={(item,index) => item.user_id.toString()}
              />
        </View>
        </SafeAreaView>
      );
    }
    
  }
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#ffcfe6',
	},
	//logo: {
	//	width: 120,
	//	height: 120,
	//},
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
        marginTop:10
    }
});

export default Search;