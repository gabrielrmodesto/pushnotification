import React, {Component} from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {View,Text,StyleSheet} from 'react-native';

class App extends Component{
	registerForPushNotificationsAsync = async() => {
	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;

	// only ask if permissions have not already been determined, because
	// iOS won't necessarily prompt the user a second time.
	if (existingStatus !== 'granted') {
		// Android remote notification permissions are granted during the app
		// install, so this will only ask on iOS
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	}

	// Stop here if the user did not grant permissions
	if (finalStatus !== 'granted') {
		return;
	}
	try {
		// Get the token that uniquely identifies this device
		let token = await Notifications.getExpoPushTokenAsync();

		// POST the token to your backend server from where you can retrieve it to send push notifications.
		console.log(token);

	} catch (error) {
		console.log(error);
	}
	
	};

	async componentDidMount(){
		await this.registerForPushNotificationsAsync();
	}
	render(){
		return(
			<View style={styles.container}>
				<Text>Hello</Text>
			</View>
		)
	}
}	

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});