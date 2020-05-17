import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default class SplashScreen extends Component {
    constructor() {
      super();
    }
    render() {
      return (
        <View style={style.wrapBox}>
          <Text style={style.textBox}>
            Point
          </Text>
        </View>
      );
    }
}
const style = StyleSheet.create({
  wrapBox: {
    backgroundColor: '#e1eb34',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'black',
    flex: 1
  },
  textBox: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold'
  }
});