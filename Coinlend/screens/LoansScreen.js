import React, { Component } from 'react';
import { Image, View, Text, SectionList, SafeAreaView, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Buffer } from 'buffer';
import { uniqueId } from 'lodash-es';

class LoansListItem extends React.PureComponent {

  imageSize = 25;
  cellHeight = 50;
  backgroundColor = '#000000';

	setTextColor() {
		if (this.props.item.rate > 30) {
			this.backgroundColor = '#95ceff'
		} else if (this.props.item.rate > 20) {
			this.backgroundColor = '#a9ff96'
		} else if (this.props.item.rate > 10) {
			this.backgroundColor = '#9eb0c0'
		} else {
			this.backgroundColor = '#ffbc75'
		}
	}
  render() {
    this.setTextColor()
    return (
      <View
        style={{flex: 1,
          height: this.cellHeight,
          flexDirection: 'row',
          backgroundColor: this.backgroundColor,
          justifyContent: 'flex-start',
          alignItems: 'center'}}>
          <View style={{flex: 1, height: this.cellHeight, flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Image
              style={{width: this.imageSize, height: this.imageSize, borderRadius: this.imageSize/2}}
              source={{uri: this.props.item.icon_url}}
            />
            <Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight, marginLeft: 10}}>
              {this.props.item.currency}
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight}}>
              {this.props.item.amount}
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold', lineHeight: this.cellHeight, marginRight: 10}}>
              {this.props.item.duration} days
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold', lineHeight: this.cellHeight, marginRight: 10}}>
              {this.props.item.rate}
            </Text>
          </View>
        </View>
      );
    }
  }

  class LoansFlatList extends React.Component {

    _keyExtractor = (item, index) => _.uniqueId();

    _renderSeparator = () => {
      return (
        <View
          style={{ height: 1, width: '100%', backgroundColor: '#171F27'}}
        />
      );
    }

    _renderItem = ({ item }) => (
      <LoansListItem item={item} containerStyle={{ borderBottomWidth: 0 }}/>
    );

    _renderSectionHeader = ({ section }) => {
      return (
        <View backgroundColor='#27292A' flex alignItems='center' justifyContent='center' height={40}>
          <Text alignSelf='center'style={{fontWeight: "700", fontSize:20, color:'white'}}>{section.title}</Text>
        </View>
      );
    }

    constructor(props) {
  		super(props);

  		this.state = {
  			data: [],
  			isLoading: true
  		}
  	}

    fetchLoans() {
      var headers = new Headers();
      headers.append('Authorization', 'Basic ' + Buffer.from('demo@coinlend.org:Demo2018').toString('base64'));
      fetch('https://coinlend.org/rest?method=loans2', {headers: headers})
      .then((response) => response.json())
      .then((responseJson) => {
        dataJson = Object.keys(responseJson).map((key) => {
          return { data: responseJson[key], title: key }
        });
        this.setState({
          data: dataJson,
          isLoading: false
        })
      })
      .catch((error) => {
        console.error(error);
      });
    }

    makeRequest() {
      this.fetchLoans()
    }

    componentDidMount() {
      this.makeRequest()
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
        <List containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0}} >
          <SectionList
            style={{backgroundColor: '#27292A'}}
            sections={this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              ItemSeparatorComponent={this._renderSeparator}
            />
          </List>
        </SafeAreaView>
        );
      }
    }


    class LoansScreen extends React.Component {

      render() {
        return (
            <LoansFlatList />
        );
      }
    }

    module.exports = LoansScreen;
