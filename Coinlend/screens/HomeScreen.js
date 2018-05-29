import React, { Component } from 'react';
import { Image, View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { uniqueId } from 'lodash-es';

class HomeListItem extends React.PureComponent {

	imageSize = 25;
	cellHeight = 50;

	textColor = '#000000';

	setTextColor() {
		if (this.props.item.rate > 30) {
			this.textColor = '#95ceff'
		} else if (this.props.item.rate > 20) {
			this.textColor = '#a9ff96'
		} else if (this.props.item.rate > 10) {
			this.textColor = '#9eb0c0'
		} else {
			this.textColor = '#ffbc75'
		}
	}

	render() {

		this.setTextColor()

		return (
			<View
			style={{flex: 1,
				height: this.cellHeight,
				flexDirection: 'row',
				backgroundColor: '#171F27',
				justifyContent: 'flex-start',
				alignItems: 'center'}}>
				<View style={{flex: 1, height: this.cellHeight, flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
					<Image
						style={{width: this.imageSize, height: this.imageSize, borderRadius: this.imageSize/2}}
						source={{uri: this.props.item.icon_url}}
					/>
					<Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight, marginLeft: 10}}>
						{this.props.item.fullCurrency}
					</Text>
				</View>
				<View style={{flex: 1, height: this.cellHeight}}>
					<Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight}}>
						{this.props.item.platform}
					</Text>
				</View>
				<View style={{flex: 1, height: this.cellHeight}}>
					<Text style={{ color: this.textColor, textAlign: 'right', fontWeight: 'bold', lineHeight: this.cellHeight, marginRight: 10}}>
						{this.props.item.rate}%
					</Text>
				</View>
			</View>
		);
	}
}

class HomeFlatList extends React.Component {

	_keyExtractor = (item, index) => _.uniqueId();

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
			data: [],
			isLoading: true
		}
	}

fetchRates() {
	fetch('https://www.coinlend.org/rates?platform=combined')
    .then((response) => response.json())
    .then((responseJson) => {
			this.setState({
				data: responseJson["Rates"],
				isLoading: false
			})
    })
    .catch((error) => {
      console.error(error);
    });
	}

	componentDidMount() {
		this.fetchRates()
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
			<SafeAreaView backgroundColor='#27292A'>
				<FlatList
					style={{backgroundColor: '#171F27'}}
					data={this.state.data}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					ItemSeparatorComponent={this._renderSeparator}
				/>
		</SafeAreaView>
		);
	}
}


class HomeScreen extends React.Component {

	render() {
		return (
				<HomeFlatList />
		);
	}
}

module.exports = HomeScreen;
