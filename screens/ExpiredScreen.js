import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default class ExpiredScreen extends Component {
    constructor() {
      super();
    }
    render() {
      return (
        <View style={style.wrapBox}>
          <Text>
            Expired
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