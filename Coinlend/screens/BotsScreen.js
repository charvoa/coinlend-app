import React from 'react';
import { Switch, FlatList, Dimensions, StyleSheet, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
import { View, TextInput, Text } from 'react-native-ui-lib';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { uniqueId } from 'lodash-es';

import APIClient from '../network/APIClient';

class BotListItem extends React.PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			apikey: '',
			apiSecret: '',
			switchValue: props.item.isActivated,
			isCredentialsValid: props.item.isCredentialsValid,
			isLoading: false
		}
	}

	async _onSwitchPress(props) {
		this.setState({
			isLoading: true
		})
		const status = await APIClient.shared().changeBotState(props.item.botName, !this.state.switchValue)
		if (status == 1) {
			this.setState({
				switchValue: !this.state.switchValue,
			})
		}

		this.setState({
			isLoading: false
		})
	}

	async _onSavePress(props) {
		if (this.state.apiKey != '' && this.state.apiSecret != '') {
			this.setState({
				isLoading: true
			})
			const status = await APIClient.shared().updateBotCredentials(props.item.botName, this.state.apiKey, this.state.apiSecret)
			if (status == 1) {
				this.setState({
					isCredentialsValid: !this.state.isCredentialsValid
				})
			}
			this.setState({
				isLoading: false
			})
		}
	}

	_renderFields(isCredentialsValid) {
		if (isCredentialsValid) {
			return (
				<FormLabel containerStyle={{marginTop: 32}}>Bitfinex credentials valid</FormLabel>
			)
		} else {
			return (
				<View>
					<FormInput
						onChangeText={(apiKey) => this.setState({apiKey})}
						containerStyle={{marginTop: 32}}
						placeholder='API Key'
						placeholderTextColor='white'></FormInput>
			 		<FormInput
						onChangeText={(apiSecret) => this.setState({apiSecret})}
						containerStyle={{marginTop: 25}}
						placeholder='API Password'
						placeholderTextColor='white'></FormInput>
				</View>
			)
		}
	}

	render() {
		if (this.state.isLoading == true) {
			return (
				<View backgroundColor='#1C2A37' style={styles.item}>
					<View style={{height: 80, backgroundColor: '#4F9DED', justifyContent: 'center', alignItems: 'center'}} >
						<Text style={{color: 'white'}}>{this.props.item.botName}</Text>
						<Text style={{color: 'white'}}>{this.props.item.botName} API Key and Secret</Text>

					</View>
					<View style={{flex: 1, height: '100%'}} backgroundColor='#151F29'>
						<ActivityIndicator size="large" color="#000000" />
					</View>
				</View>
			)
		} else {
			return (
				<View backgroundColor='#1C2A37' style={styles.item}>
					<View style={{height: 80, backgroundColor: '#4F9DED', justifyContent: 'center', alignItems: 'center'}} >
						<Text style={{color: 'white'}}>{this.props.item.botName}</Text>
						<Text style={{color: 'white'}}>{this.props.item.botName} API Key and Secret</Text>

					</View>
					<View style={{flex: 1}} backgroundColor='#151F29'>
						{this._renderFields(this.state.isCredentialsValid)}
					<View>
							<Button
								style={{marginTop: 40}}
								onPress={ ()=>{ Linking.openURL(this.props.item.setupGuideLink)}}
								backgroundColor='transparent'
								color='#4596EC'
								title='Setup guide'/>
							<Switch
								disabled={!this.state.isCredentialsValid}
								onValueChange={() => this._onSwitchPress(this.props)} 
								alignSelf='center'
								style={{marginTop: 20}}
								value={this.state.switchValue}></Switch>
							{ !this.state.isCredentialsValid &&
								<Button
								style={{marginTop: 20}}
								onPress={ () => {this._onSavePress(this.props)}}
								backgroundColor='#4596EC'
								borderRadius={5}
								title='Save'/> }
						</View>
					</View>
				</View>
			);
		}
	}
}

class BotsList extends React.Component {

	_keyExtractor = (item, index) => _.uniqueId();

	_renderSeparator = () => {
		return (
			<View
				style={{ height: 1, width: '86%', backgroundColor: 'black', marginLeft: '14%' }}
			/>
		);
	}

	_renderItem = ({ item }) => (
		<BotListItem item={item} containerStyle={{ borderBottomWidth: 0 }}/>
	);

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoading: true
		}
	}

	async fetchBots() {
		const data = await APIClient.shared().fetchBots()
		this.setState({
			data: data,
			isLoading: false
		})
	}

	componentDidMount() {
		this.fetchBots()
	}

	render() {
		if (this.state.isLoading) {
			return (
				<SafeAreaView backgroundColor='#27292A' style={{flex: 1, height: '100%', justifyContent: 'center', alignItems:'center'}}>
					<ActivityIndicator size="large" color="#000000" />
				</SafeAreaView>
			);
		}
		return (
			<SafeAreaView backgroundColor='#27292A' style={{flex: 1, height: '100%', justifyContent: 'center', alignItems:'center'}}>
				<FlatList
					backgroundColor='#27292A'
          style={styles.itemContainer}
					data={this.state.data}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
          numColumns={1}
				/>
			</SafeAreaView>
		);
	}
}

const numColumns = 1;
const size = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  item: {
    flex: 1,
    margin: 20,
    backgroundColor: 'lightblue',
    width: size,
    height: size*1.3,
  }
});


class BotsScreen extends React.Component {

	render() {
		return (
				<BotsList />
		);
	}
}

module.exports = BotsScreen;
