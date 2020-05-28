import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
export default class DireCard extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <TouchableOpacity
            onPress={this.onPress}
        >
            <View style={styles.item}>
                <Text style={styles.title}>{this.props.item.title}</Text>
            </View>
        </TouchableOpacity>
      );
    }

    onPress(item) {
      console.log(item);
      console.log('^ onPress');
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e1eb34',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 40,
    width: 115
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
});
