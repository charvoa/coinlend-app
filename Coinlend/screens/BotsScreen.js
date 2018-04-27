import React from 'react';
import { Button, View, Text, Switch, TextInput, FlatList, Dimensions, StyleSheet} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class BotListItem extends React.PureComponent {

	render() {
		return (
			<View style={styles.item}>
          <View style={{height: 80, backgroundColor: '#4F9DED', justifyContent: 'center', alignItems: 'center'}} >
            <Text style={{color: 'white'}}>{this.props.item.mainTitle}</Text>
            <Text style={{color: 'white'}}>{this.props.item.subtitle}</Text>

          </View>
          <View style={{backgroundColor: '#1C2A37', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput placeholder={this.props.item.fields[0]} placeholderTextColor='white' spellCheck={false}>
            </TextInput>
            <TextInput style={{marginTop: 10}} placeholder={this.props.item.fields[1]} placeholderTextColor='white' spellCheck={false}>
            </TextInput>
            <Switch style={{marginTop: 10}}></Switch>
          </View>
			</View>
		);
	}
}

class BotsList extends React.Component {

	_keyExtractor = (item, index) => item.id;

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
      switchValue: false,
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
    height: size,
  }
});


class BotsScreen extends React.Component {

	render() {
		return (
			<View>
				<BotsList />
			</View>
		);
	}
}

module.exports = BotsScreen;
