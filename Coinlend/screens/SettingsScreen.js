import React, { Component } from 'react';
import { Button, View, Text, Switch, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';

class SettingsListItem extends React.PureComponent {

  imageSize = 25;
  cellHeight = 50;

  render() {
    return (
      <View
        style={{flex: 1,
          height: this.cellHeight,
          flexDirection: 'row',
          backgroundColor: '#171F27',
          justifyContent: 'flex-start',
          alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, marginLeft:16}}>{this.props.item.mainTitle}</Text>
        </View>
      );
    }
  }

  class SettingsFlatList extends React.Component {

    _keyExtractor = (item, index) => item.id;

    _renderSeparator = () => {
      return (
        <View
          style={{ height: 1, width: '86%', backgroundColor: 'black', marginLeft: '14%' }}
        />
      );
    }

    _renderItem = ({ item }) => (
      <SettingsListItem item={item} containerStyle={{ borderBottomWidth: 0 }}/>
    );

    _renderHeader = () => {
      return (
        <View style={{ flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor:'#151F29'}}>
          <View style={{ flex: 1,
            marginTop: 30,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor:'#151F29'}}>
            <Text style={{color: 'white', fontSize:20}}>demo@coinlend.org</Text>
            <Text style={{color: 'white', fontSize:20, marginTop: 30}}>Level 6</Text>
            <View style={{flex: 1, flexDirection:'row', marginTop:30}}>
              <Text style={{color: 'white', fontSize:20, lineHeight:31}}>USD</Text>
              <Switch style={{marginLeft:20, marginRight:20}}></Switch>
              <Text style={{color: 'white', fontSize:20, lineHeight:31}}>EUR</Text>
            </View>

          </View>
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
      list.push({
        mainTitle: 'Notifications',
        id: '1'
      });
      list.push({
        mainTitle: 'Features',
        id: '2'
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
        <List containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0}} >
          <FlatList
            style={{backgroundColor: '#171F27'}}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListHeaderComponent={this._renderHeader}
            ItemSeparatorComponent={this._renderSeparator}
          />
        </List>
      );
    }
  }


  class SettingsScreen extends React.Component {

    render() {
      return (
        <View>
          <SettingsFlatList />
        </View>
      );
    }
  }

  module.exports = SettingsScreen;
