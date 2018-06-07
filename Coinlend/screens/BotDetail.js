import React, { Component } from 'react';
import { Image, View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { uniqueId } from 'lodash-es';

class BotDetailListItem extends React.PureComponent {

	render() {

		return (
			<View backgroundColor='#151F29'>
						<View
							style={{flex: 1,
								height: 50,
								flexDirection: 'row',
								backgroundColor: '#151F29',
								justifyContent: 'center',
								alignItems: 'center'}}>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 50}}>
										{this.props.item.coin}
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 50}}>
										{this.props.item.isLending}
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 50}}>
										{this.props.item.amountReserved}
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 50}}>
										{this.props.item.minRate}
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 50}}>
										{this.props.item.minDuration}
									</Text>
								</View>
							</View>
						</View>
					);
	}
}

class BotDetailFlatList extends React.Component {

	_keyExtractor = (item, index) => _.uniqueId();

	_renderSeparator = () => {
		return (
			<View
				style={{ height: 1, width: '86%', backgroundColor: 'black', marginLeft: '14%' }}
			/>
		);
	}

	_renderHeader = () => {
		return (
			<View backgroundColor='#151F29'>
						<View
							style={{flex: 1,
								height: 40,
								flexDirection: 'row',
								backgroundColor: '#27292A',
								justifyContent: 'center',
								alignItems: 'center'}}>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
										Coin
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
										Lend
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
										Reserved
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
										Min rate
									</Text>
								</View>
								<View style={{flex: 1, height: this.cellHeight}}>
									<Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
										Dur (%)
									</Text>
								</View>
							</View>
						</View>
					);
				}

	_renderItem = ({ item }) => (
		<BotDetailListItem item={item} containerStyle={{ borderBottomWidth: 0 }}/>
	);

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoading: true
		}
	}

	componentDidMount() {
		this.setState({
			isLoading: false
		})

		list = []

		for (let i = 0; i < 100; i ++) {
			list.push({
				coin: 'USD',
				isLending: true,
				amountReserved: 0.6,
				minRate: 0.2,
				minDuration: 2,
				maxDuration: 30,
				threshold: false,
				iceberg: true,
				icebergAmount: 0
			})

			this.setState({
				data: list
			})
		}
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
					ListHeaderComponent={this._renderHeader}
					ItemSeparatorComponent={this._renderSeparator}
				/>
		</SafeAreaView>
		);
	}
}


class BotDetail extends React.Component {

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
				<BotDetailFlatList />
		);
	}
}

module.exports = BotDetail;
