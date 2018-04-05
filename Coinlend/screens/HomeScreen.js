import React, { Component } from 'react';
import { Image, View, Text, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class HomeListItem extends React.PureComponent {

	imageSize = 25;
	cellHeight = 50;

	render() {
		return (
			<View 
			style={{flex: 1, 
				height: this.cellHeight, 
				flexDirection: 'row', 
				backgroundColor: '#171F27', 
				justifyContent: 'space-between',
				alignItems: 'center'}}>
				<Image 
					style={{width: this.imageSize, height: this.imageSize, borderRadius: this.imageSize/2, marginLeft: 10}}
          source={{uri: this.props.item.icon_url}}
					/>
				<Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight}}>
					{this.props.item.name}
				</Text>
				<Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight}}>
					{this.props.item.exchange}
				</Text>
				<Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight, marginRight: 10}}>
					{this.props.item.evolution}
				</Text>
			</View>
		);
	}
}

class HomeFlatList extends React.Component {

	_keyExtractor = (item, index) => item.id;

	_renderSeparator = () => {
		return (
			<View
				style={{ height: 1, width: '86%', backgroundColor: 'black', marginLeft: '14%' }} 
			/>
		);
	}

	_renderItem = ({ item }) => (
		<HomeListItem item={item} containerStyle={{ borderBottomWidth: 0 }}/>
	);

	constructor(props) {
		super(props);

		this.state = {
			data: []
		}
	}

	makeRequest() {
		console.log('Hello there')

		list = []
		for (let i = 0; i < 100; i++) {
			list.push({
				name: 'JP-YEN',
				icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/600px-Bitcoin.svg.png',
				exchange: 'Quoine ' + i.toString() ,
				evolution: '19,97%',
				id: i.toString()
			});
		}

		this.setState({
			data: list
		})
	}

	componentDidMount() {
		this.makeRequest()
	}

	render() {
		return (
			<List containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0}} >
				<FlatList
					data={this.state.data}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					ItemSeparatorComponent={this._renderSeparator}
				/>
			</List>
		);
	}
}


class HomeScreen extends React.Component {

	render() {
		return (
			<View>
				<HomeFlatList />
			</View>
		);
	}
}

module.exports = HomeScreen;