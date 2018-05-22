import React from 'react';
import { Switch, FlatList, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { View, TextInput, Text } from 'react-native-ui-lib';
import { FormLabel, FormInput } from 'react-native-elements';
import APIClient from '../network/APIClient';

class LoginScreen extends React.Component {

		apiClient = new APIClient('demo@coinlend.org', 'Demo2018')

		constructor(props) {
			super(props)

			this.state = {
				data: []
			}
		}

		makeRequest() {
			this.apiClient.authenticate()
		}

		componentDidMount() {
			this.makeRequest()
		}

		render() {
			return (
				<View style={{flex: 1, flexDirection: 'column'}} backgroundColor='black'>
								<FormInput containerStyle={{marginTop: 278}} style={{height: 45, color: 'white'}} placeholder='mail@something.com' placeholderTextColor='white'></FormInput>
								<FormInput containerStyle={{marginTop: 40}} style={{height: 45, color: 'white'}} secureTextEntry={true} placeholder='*******' placeholderTextColor='white'></FormInput>
								<Button style={{marginTop: 30, height: 45}} backgroundColor='#4596EC' borderRadius={5} title='LOGIN'/>
								{/* <Button style={{marginTop: 30, height: 45}} backgroundColor='white' color='black' borderRadius={5} title='REGISTER'/> */}
				</View>
			);
		}
}

module.exports = LoginScreen;
