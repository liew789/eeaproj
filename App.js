/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';


firebase.messaging().hasPermission()
  .then(enabled => {
    if (enabled) {
      // user has permissions
    } else {
      // user doesn't have permission
    } 
  });
  
    firebase.messaging().requestPermission()
  .then(() => {
    // User has authorised  
  })
  .catch(error => {
    // User has rejected permissions  
  });

 firebase.auth().signInAnonymouslyAndRetrieveData()
  .then(credential => {
    if (credential) {
      //console.log('default app user ->', credential.user.toJSON());
    }
  }); 

  
  FCM = firebase.messaging();
//ref = firebase.firestore().collection("users");
// check to make sure the user is authenticated  
firebase.auth().onAuthStateChanged(user => {
  // requests permissions from the user
  //FCM.requestPermissions();
  // gets the device's push token
  FCM.getToken().then(token => {
   console.log('tokenis=>>>>>>>>>>>'+token)
   console.log(user)
   // stores the token in the user's document
   //this.ref.doc(user.uid).update({ pushToken: token });
  });
  
});
  
FCM.onMessage(message => {
	console.log('message received', message);
	alert(message);
});
  
  
/*   firebase.messaging().getInitialNotification()
  .then((payload) => {
    alert('getInitialNotification');
    console.log(payload);
  }); */

firebase.messaging().onMessage(() => {
  alert('OnMessage');
});

firebase.messaging().onMessage(function(payload) {
console.log('Message received. ', payload);
appendMessage(payload);
});
  
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
	
	componentDidMount() {
		
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        // Process your message as required
		alert(message)
    });
}

componentWillUnmount() {
    this.messageListener();
}
	
	
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Native!
				</Text>
				<Text style={styles.instructions}>
					To get started, edit App.js
				</Text>
				<Text style={styles.instructions}>
					{instructions}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
