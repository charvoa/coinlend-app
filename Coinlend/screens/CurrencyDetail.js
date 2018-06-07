import React from 'react';
import { Switch, FlatList, Dimensions, StyleSheet, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
import { View, TextInput, Text } from 'react-native-ui-lib';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { uniqueId } from 'lodash-es';
import { StackNavigator } from 'react-navigation';

import APIClient from '../network/APIClient';

class CurrencyDetail extends React.Component {

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#27292A',
		},
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	render() {
		return (
				<View>
					<Text>Hello Currency Detail</Text>
				</View>
		);
	}
}

module.exports = CurrencyDetail;
