import React, { Component } from 'react';
import { Image, View, Text, SectionList } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class LoansListItem extends React.PureComponent {

  imageSize = 25;
  cellHeight = 50;

  render() {
    return (
      <View
        style={{flex: 1,
          height: this.cellHeight,
          flexDirection: 'row',
          backgroundColor: '#A1C363',
          justifyContent: 'flex-start',
          alignItems: 'center'}}>
          <View style={{flex: 1, height: this.cellHeight, flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Image
              style={{width: this.imageSize, height: this.imageSize, borderRadius: this.imageSize/2}}
              source={{uri: this.props.item.icon_url}}
            />
            <Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight, marginLeft: 10}}>
              {this.props.item.name}
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight}}>
              {this.props.item.amount}
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold', lineHeight: this.cellHeight, marginRight: 10}}>
              {this.props.item.time}
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold', lineHeight: this.cellHeight, marginRight: 10}}>
              {this.props.item.evolution}
            </Text>
          </View>
        </View>
      );
    }
  }

  class LoansFlatList extends React.Component {

    _keyExtractor = (item, index) => item.id;

    _renderSeparator = () => {
      return (
        <View
          style={{ height: 1, width: '86%', backgroundColor: 'black', marginLeft: '14%' }}
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
        data: []
      }
    }

    makeRequest() {
      list = []
      for (let i = 0; i < 10; i++) {
        list.push({
          name: 'BTC',
          icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/600px-Bitcoin.svg.png',
          amount: '0.02' ,
          time: '2 Days',
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
          <SectionList
            sections={[
              { title: 'Bitfinex', data: this.state.data },
              { title: 'Poloniex', data: this.state.data },
              { title: 'Quoine', data: this.state.data }]}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              ItemSeparatorComponent={this._renderSeparator}
            />
          </List>
        );
      }
    }


    class LoansScreen extends React.Component {

      render() {
        return (
          <View>
            <LoansFlatList />
          </View>
        );
      }
    }

    module.exports = LoansScreen;
