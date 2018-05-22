import React from 'react';
import { Switch, FlatList, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { View, TextInput, Text } from 'react-native-ui-lib';
import { FormLabel, FormInput } from 'react-native-elements'

import APIClient from '../network/APIClient';

class BotListItem extends React.PureComponent {

	render() {
		return (
			<View backgroundColor='#1C2A37' style={styles.item}>
          <View style={{height: 80, backgroundColor: '#4F9DED', justifyContent: 'center', alignItems: 'center'}} >
            <Text style={{color: 'white'}}>{this.props.item.mainTitle}</Text>
            <Text style={{color: 'white'}}>{this.props.item.subtitle}</Text>

          </View>
					<View flex backgroundColor='#151F29'>
									<FormInput containerStyle={{marginTop: 32}}>{this.props.item.fields[0]}</FormInput>
									<FormInput containerStyle={{marginTop: 25}}>{this.props.item.fields[1]}</FormInput>

					        <View>
										<Button style={{marginTop: 40}} backgroundColor='transparent' color='#4596EC' title='Setup guide'/>
										<Switch alignSelf='center' style={{marginTop: 20}} value={this.props.item.switchValue}></Switch>
					          <Button style={{marginTop: 20}}backgroundColor='#4596EC' borderRadius={5} title='Save'/>
					        </View>
					</View>
			</View>
		);
	}
}

class BotsList extends React.Component {

	_keyExtractor = (item, index) => item.id.toString();

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
			data: []
		}
	}

	makeRequest() {
		list = []

    list.push({
      mainTitle: 'Poloniex',
      subtitle: 'Poloniex API Key & Secret',
      fields: ['API Key', 'API Secret'],
      setupLink: 'https://www.google.com',
      switchValue: false,
      buttonTitle: 'Save',
      id: 0
    });

    list.push({
      mainTitle: 'Quoine',
      subtitle: 'Quoine API Key & Secret',
      fields: ['API Key', 'API Secret'],
      setupLink: 'https://www.google.com',
      switchValue: true,
      buttonTitle: 'Save',
      id: 1
    });

    list.push({
      mainTitle: 'Bitfinex',
      subtitle: 'Bitfinex API Key & Secret',
      fields: ['API Key', 'API Secret'],
      setupLink: 'https://www.google.com',
      switchValue: false,
      buttonTitle: 'Save',
      id: 2
    });

		this.setState({
			data: list
		})
	}

	componentDidMount() {
		this.makeRequest()
	}

	render() {
		return (
				<FlatList
					backgroundColor='#27292A'
          style={styles.itemContainer}
					data={this.state.data}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
          numColumns={1}
				/>
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
			<SafeAreaView backgroundColor='#27292A'>
				<BotsList />
			</SafeAreaView>
		);
	}
}

module.exports = BotsScreen;
