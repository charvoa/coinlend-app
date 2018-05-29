import React from 'react';
import { Switch, FlatList, Dimensions, StyleSheet, SafeAreaView, Alert, ActivityIndicator, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { View, TextInput, Text } from 'react-native-ui-lib';
import { FormLabel, FormInput } from 'react-native-elements';

import APIClient from '../network/APIClient';

const fullWidth = Dimensions.get('window').width;

class LoginScreen extends React.Component {

		navigate = null
		constructor(props) {
			super(props)

			const { navigate } = this.props.navigation
			this.navigate = navigate

			this.state = {
				username: '',
				password: '',
				isLoading: false
			}
		}

		componentWillMount() {
			this.loginUser(null, null, true)
		}

		async _showMoreApp() {
			this.loginUser(this.state.username, this.state.password, false)
		}

		async loginUser(username, password, autoLogin) {
			this.setState({
				isLoading: true
			})
			let status = await APIClient.shared().authenticate(username, password)
			this.setState({
				isLoading: false
			})
			if (status == 1) {
				this.navigate('Home')
			} else {
				if (autoLogin === false) {
					Alert.alert(
						'Login Error',
						'Wrong email or password',
						[{text: 'OK'}], { cancelable: false })
					}
			}
		}

		render() {
			if (this.state.isLoading == true) {
				return (
					<SafeAreaView backgroundColor='#27292A' style={{flex: 1, height: '100%', justifyContent: 'center', alignItems:'center'}}>
						<ActivityIndicator size="large" color="#000000" />
					</SafeAreaView>
				)
			}
			return (
				<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}} backgroundColor='black'>
					<Image
						style={{width: 295, height: 70}}
						source={require('../assets/img/mainLogo.png')}
					/>
					<FormInput
						containerStyle={{marginTop: 139, width: fullWidth*0.8}}
						style={{height: 45, color: 'white'}}
						placeholder='mail@something.com'
						placeholderTextColor='white'
						onChangeText={(username) => this.setState({username})}
						autoCapitalize='none'
					/>
					<FormInput
						containerStyle={{marginTop: 40, width: fullWidth*0.8}}
						style={{height: 45, color: 'white'}}
						secureTextEntry={true}
						placeholder='*******'
						placeholderTextColor='white'
						onChangeText={(password) => this.setState({password})}
						autoCapitalize='none'
					/>
					<Button onPress={() => this._showMoreApp()}
						style={{marginTop: 30, height: 45, width: fullWidth*0.8}}
						backgroundColor='#4596EC'
						borderRadius={5}
						disabled={(this.state.username.trim() == '' || this.state.password.trim() == '')}
						title='LOGIN'
					/>
				</View>
			);
		}
}

module.exports = LoginScreen;
