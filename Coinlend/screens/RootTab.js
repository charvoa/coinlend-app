import React from 'react';
import { Image } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import SettingsScreen from './SettingsScreen';
import BotsStackNavigator from './BotsStackNavigator';
import InterestsScreen from './InterestsScreen';
import LoansScreen from './LoansScreen';
import HomeScreen from './HomeScreen';

const RootTab = TabNavigator(
  {
    Today: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return <Image source={require('../assets/icn/chart.png')} size={22} style={{tintColor: tintColor}} tintColor={tintColor} />;
        },
      }),
    },
    Loans: {
      screen: LoansScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return <Image source={require('../assets/icn/handshake.png')} size={22} style={{tintColor: tintColor}} tintColor={tintColor} />;
        },
      }),
    },
    Interests: {
      screen: InterestsScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return <Image source={require('../assets/icn/Investment.png')} size={22} style={{tintColor: tintColor}} tintColor={tintColor} />;
        },
      }),
    },
    Bots: {
      screen: BotsStackNavigator,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return <Image source={require('../assets/icn/security_checked.png')} size={22} style={{tintColor: tintColor}} tintColor={tintColor} />;
        },
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return <Image source={require('../assets/icn/settings.png')} size={22} style={{tintColor: tintColor}} tintColor={tintColor} />;
        },
      }),
    },
  },
  {
    initialRouteName: 'Today',
    tabBarOptions: {
      activeTintColor: '#4596EC',
      inactiveTintColor: '#929292',
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: '#27292A',
      },
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }

);

module.exports = RootTab;
