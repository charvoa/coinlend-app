import React, { Component } from 'react';
import { Text } from 'react-native';

class CLText extends Component {
  render() {
    <Text style={{fontFamily:'Avenir-Next'}}>{this.props.children}</Text>
  }
}

module.exports = CLText;
