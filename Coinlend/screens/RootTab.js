import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

import SettingsScreen from './SettingsScreen';
import BotsScreen from './BotsScreen';
import InterestsScreen from './InterestsScreen';
import LoansScreen from './LoansScreen';
import HomeScreen from './HomeScreen';

const RootTab = TabNavigator(
  {
    Today: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          let iconName = 'line-graph'
          return <Icon name={iconName} size={22} color={tintColor} />;
        },
      }),
    },
    Loans: {
      screen: LoansScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          let iconName = 'circular-graph'
          return <Icon name={iconName} size={22} color={tintColor} />;
        },
      }),
    },
    Interests: {
      screen: InterestsScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          let iconName = 'gauge'
          return <Icon name={iconName} size={22} color={tintColor} />;
        },
      }),
    },
    Bots: {
      screen: BotsScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          let iconName = 'cloud'
          return <Icon name={iconName} size={22} color={tintColor} />;
        },
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          let iconName = 'cog'
          return <Icon name={iconName} size={22} color={tintColor} />;
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
