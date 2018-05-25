import React, { Component } from 'react';
import { Button, View, Text, Switch, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Buffer } from 'buffer';
import Icon from 'react-native-vector-icons/Entypo';

import APIClient from '../network/APIClient';

class SettingsListItem extends React.PureComponent {

  imageSize = 25;
  cellHeight = 50;


  async _willLogout(navigate) {
    await APIClient.shared().deleteLoginDetails()
    APIClient.shared().reset()
    navigate('Login')
  }

  _onPress(id, navigate) {
    if (id == 3) {
      Alert.alert(
        'Sign out',
        'Are you sure ?',
        [
          { text: 'Yes', onPress: () => this._willLogout(navigate) },
          { text: 'No', onPress: () => console.log('OK Pressed'), style: 'cancel' }
        ],
        { cancelable: false }
      )
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation
    if (this.props.item.isActive) {
      return (
        <TouchableOpacity onPress={() => this._onPress(this.props.item.id, navigate)}>
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
          </TouchableOpacity>
        );
      } else {
        return null;
      }
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
      <SettingsListItem navigation={this.props.navigation} item={item} containerStyle={{ borderBottomWidth: 0 }}/>
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

    async fetchUser() {
      const responseJson = await APIClient.shared().fetchUser()
      this.setState({
        headerData: {email: responseJson['email'], level: responseJson['level'], isUsdActive: !responseJson['isUsdActive'] }
      })
    }

    makeRequest() {
      list = []
      list.push({
        mainTitle: 'Notifications',
        id: '1',
        isActive: false
      }, {
        mainTitle: 'Features',
        id: '2',
        isActive: false
      },
      {
        mainTitle: 'Sign out',
        id: '3',
        isActive: true
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

    constructor(props) {
      super(props)
    }

    componentDidMount() {
    }

    render() {
      return (
          <SettingsFlatList navigation={this.props.navigation}/>
      );
    }
  }

  module.exports = SettingsScreen;
