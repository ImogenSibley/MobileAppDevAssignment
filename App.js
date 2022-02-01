import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, View, StyleSheet, Text, ScrollView, TextInput, Keyboard } from 'react-native';
import React, { useState } from 'react';
import Task from './components/Task';

//----------------------------------------------
//TO DO LIST APP

export default function App() {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);
		
	const handleAddTask = () => {
		Keyboard.dismiss();
		setTaskItems([...taskItems, task])
		setTask(null);
	}

	const completeTask = (index) => {
		let itemsCopy = [...taskItems];
		itemCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	}

	return(
		<View style={styles.container}>
		{/*Today's Tasks*/}
			<View style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>Today's Tasks</Text>
				<View style={styles.items}>
					{/*This is where the tasks will go! */}
						<Task text={'Task 1'} />
						<Task text={'Task 2'} />
						<Task text={'Task 3'} />
						<Task text={'Task 4'} />
						<Task text={'Task 5'} />
	
					{/*
						tastItems.map((item, index) => {
							return (
								<TouchableOpacity key={index} onPress={() => completeTask(index)}>
									<Task text={item} />
								</TouchableOpacity>
							)
						})
					}*/}

				</View>

			</View>

			{/*Text Input for writing a task
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
				<TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
				<TouchableOpacity onPress={() => handleAddTask()}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
			*/}

		</View>

	);
}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#ffcfe6',

		},
		tasksWrapper: {
			paddingTop: 80, 
			paddingHorizontal: 40,
			},
		sectionTitle: {
			fontSize: 24,
			fontFamily: 'helvetica',
			fontWeight: 'bold',
			},
		items: {
			marginTop: 30,
		},
		addText: {},
		addWrapper: {
			width: 60,
			height: 60,
			backgroundColor: '#fff',
			borderRadius: 60,
			justifyContents: 'center',
			alignItems: 'center',
		},
		input: {
			paddingVertical: 15,
			paddingHorizontal: 15,
			backgroundColor: '#fff',
			borderRadius: 60,
			borderColor: '#ffcfe6',
			borderWidth: 1,
			width: 250,
		},
		writeTaskWrapper: {
			position: 'absolute',
			bottom: 60,
			width: '100%',
			flexDirection: 'row',
			justifyContents: 'space-around',
			alignItems: 'center',
		},
	});

