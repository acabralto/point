import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default class HomeScreen extends Component {
    constructor() {
      super();
    }
    render() {
      return (
        <View style={style.wrapBox}>
          <Text>
            Home Screen
          </Text>
        </View>
      );
    }
}
const style = StyleSheet.create({
  wrapBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'black',
    flex: 1
  }
});