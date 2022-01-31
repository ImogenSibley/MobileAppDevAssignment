import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component, useState, useEffect } from 'react';


/*export default function App() {
    return ( <
        View style = { styles.container } >
        <
        Text > The very first line of text on this application! Woo! < /Text> <
        Text > This is going to be a very cool app. < /Text> <
        Text > Beep Boop! < /Text> <
        StatusBar style = "auto" / >
        <
        /View>
    );
}*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Blink = (props) => {
    const [isShowingText, setIsShowingText] = useState(true);
    useEffect(() => {
        const toggle = setInterval(() => {
            setIsShowingText(!isShowingText);
        }, 1000);
        return () => clearInterval(toggle);
    })
    if (!isShowingText) {
        return null;
    }

    return <Text>{props.text}</Text>;
}

const BlinkApp = () => {
    return (
        <View style={{ marginTop: 50 }}>
            <Blink text='Blinking' />
            <Blink text='Boop Beep' />
            <Blink text='Blinking Text, Blink blink woo!' />
            <Blink text='Hehehehehe' />
        </View>
    );
}


class SayHello extends Component {
    render() {
        return (
            <View>
                <Text>Hello {this.props.name}</Text>
            </View>
        )
    };
}

class SayGoodbye extends Component {
    render() {
        return (
            <View>
                <Text>Bye then, {this.props.name} go have a coffee...</Text>
            </View>
        )
    };
}

class HelloWorldApp extends Component {
    render() {
        return (
            <View>
                <SayGoodbye name="Imoge" />
            </View>
    );
  }
}

//export default HelloWorldApp
export default BlinkApp
