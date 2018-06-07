import React from 'react';
import { StackNavigator } from 'react-navigation';

import BotsScreen from './BotsScreen';
import BotDetail from './BotDetail';
import CurrencyDetail from './CurrencyDetail';

const BotsStackNavigator = StackNavigator({
  BotsScreen: {
    screen: BotsScreen
  },
  BotDetail: {
    screen: BotDetail
  },
	CurrencyDetail: {
		screen: CurrencyDetail
	}
}, {
  initialRouteName: 'BotsScreen'
})

module.exports = BotsStackNavigator;
