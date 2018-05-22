import React from 'react';
import { Button, View, Text } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import { FormattedProvider } from 'react-native-globalize';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Module SafeAreaManager', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

import LoginScreen from './screens/LoginScreen';
import RootTab from './screens/RootTab';

const MainNavigator = SwitchNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: RootTab
  }
}, {
  initialRouteName: 'Login'
})

module.exports = MainNavigator;

export default class App extends React.Component {
  render() {
    return (
    <FormattedProvider locale="en">
      <MainNavigator/>
    </FormattedProvider>
    );
  }
}
