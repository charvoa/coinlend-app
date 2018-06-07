import React from 'react';
import { ScrollView, Switch, FlatList, Dimensions, StyleSheet, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
import { View, TextInput, Text } from 'react-native-ui-lib';
import { FormLabel, FormInput, Button, Slider } from 'react-native-elements'
import { uniqueId } from 'lodash-es';
import { StackNavigator } from 'react-navigation';

import APIClient from '../network/APIClient';

const fullWidth = Dimensions.get('window').width;

class CurrencyDetail extends React.Component {

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#27292A',
		},
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<ScrollView overScrollMode='always'
			contentContainerStyle={{flexGrow: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}
			backgroundColor='#171F27'>

				<FormLabel containerStyle={{marginTop: 10}}>Reserved amount: $0.00</FormLabel>
				<FormInput
					containerStyle={{marginTop: 10, width: fullWidth*0.5}}
					style={{height: 45, color: 'white'}}
					placeholder='Reserved Amount'
					placeholderTextColor='white'
					autoCapitalize='none'
				/>

				<FormLabel containerStyle={{marginTop: 10}}>Minimum interest rate: $0.00</FormLabel>
				<Slider style={{marginTop: 10, width: fullWidth*0.8}} minimumValue={0} maximumValue={100} value={0} />

				<FormLabel containerStyle={{marginTop: 10}}>Always lend at the minimum duration of 2 days</FormLabel>
				<Switch style={{marginTop: 10}} value={false}/>

				<FormLabel containerStyle={{marginTop: 10}}>Threshold for max. loan duration:</FormLabel>
				<Slider style={{marginTop: 10, width: fullWidth*0.8}} minimumValue={0} maximumValue={100} value={0} />


				<FormLabel containerStyle={{marginTop: 10, width: fullWidth*0.8}}>Minimum (2 days) and maximum (30 days) loan duration</FormLabel>
				<View flex={1} flexDirection='row'>
					<FormInput
						containerStyle={{marginTop: 10, width: fullWidth*0.3}}
						style={{height: 45, color: 'white'}}
						placeholder='Min'
						placeholderTextColor='white'
						autoCapitalize='none'
					/>
					<FormInput
						containerStyle={{marginTop: 10, width: fullWidth*0.3}}
						style={{height: 45, color: 'white'}}
						placeholder='Max'
						placeholderTextColor='white'
						autoCapitalize='none'
					/>
				</View>

				<FormLabel containerStyle={{marginTop: 10}}>Use the Iceberg strategy. Only create loans with maximum amount of: $0.00</FormLabel>
				<Switch style={{marginTop: 10}} value={false}/>
				<FormInput
					containerStyle={{marginTop: 10, width: fullWidth*0.5, marginBottom: 20}}
					style={{height: 45, color: 'white'}}
					placeholder='Max'
					placeholderTextColor='white'
					autoCapitalize='none'
				/>
			</ScrollView>
			);
	}
}

module.exports = CurrencyDetail;
