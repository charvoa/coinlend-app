import React, { Component } from 'react';
import { Button, View, Text, Switch, FlatList, SafeAreaView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Buffer } from 'buffer';
import Icon from 'react-native-vector-icons/Entypo';

class SettingsListItem extends React.PureComponent {

  imageSize = 25;
  cellHeight = 50;

  render() {
    return (
      <View
        style={{flex: 1,
          height: this.cellHeight,
          flexDirection: 'row',
          backgroundColor: '#27292A',
          justifyContent: 'space-between',
          alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, paddingLeft:16}}>{this.props.item.mainTitle}</Text>
          <Icon style={{paddingRight: 10}} name="chevron-right" size={24} color="#C8C7CC" />
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
          backgroundColor:'#27292A'}}>
          <View style={{ flex: 1,
            marginTop: 30,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor:'#27292A'}}>
            <Text style={{color: 'white', fontSize:20}}>{this.state.headerData.email}</Text>
            <Text style={{color: 'white', fontSize:20, marginTop: 30}}>Level {this.state.headerData.level}</Text>
            <View style={{flex: 1, flexDirection:'row', marginTop:30, marginBottom:30}}>
              <Text style={{color: 'white', fontSize:20, lineHeight:31}}>USD</Text>
              <Switch style={{marginLeft:20, marginRight:20}} value={this.state.headerData.isUsdActive}></Switch>
              <Text style={{color: 'white', fontSize:20, lineHeight:31}}>EUR</Text>
            </View>

          </View>
        </View>
      );
    }

    constructor(props) {
      super(props);

      this.state = {
        data: [],
        headerData: {email: 'Loading ...', level: '...', isUsdActive: true}
      }
    }

    fetchUser() {
      var headers = new Headers();
      headers.append('Authorization', 'Basic ' + Buffer.from('demo@coinlend.org:Demo2018').toString('base64'));
    	fetch('https://coinlend.org/rest?method=user', {headers: headers})
        .then((response) => response.json())
        .then((responseJson) => {

    			this.setState({
            headerData: {email: responseJson['email'], level: responseJson['level'], isUsdActive: !responseJson['isUsdActive'] }
    			})
        })
        .catch((error) => {
          console.error(error);
        });
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

      this.fetchUser()
    }

    componentDidMount() {
      this.makeRequest()
    }

    render() {
      return (
        <SafeAreaView backgroundColor='#27292A'>
        <List containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0}} height='100%' >
          <FlatList
            style={{backgroundColor: '#27292A'}}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListHeaderComponent={this._renderHeader}
            ItemSeparatorComponent={this._renderSeparator}
          />
        </List>
      </SafeAreaView>
      );
    }
  }


  class SettingsScreen extends React.Component {

    render() {
      return (
          <SettingsFlatList />
      );
    }
  }

  module.exports = SettingsScreen;
