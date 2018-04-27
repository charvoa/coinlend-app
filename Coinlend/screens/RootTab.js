import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import SettingsScreen from './SettingsScreen';
import BotsScreen from './BotsScreen';
import InterestsScreen from './InterestsScreen';
import LoansScreen from './LoansScreen';
import HomeScreen from './HomeScreen';

const RootTab = TabNavigator(
  {
    Today: {
      screen: HomeScreen,
    },
    Loans: {
      screen: LoansScreen,
    },
    Interests: {
      screen: InterestsScreen,
    },
    Bots: {
      screen: BotsScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName: 'Today',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Today') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }

);

module.exports = RootTab;
