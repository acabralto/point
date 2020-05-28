import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
export default class PosterCard extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      let item = this.props.item;
      let variation = this.props.variation;
      let sizes = {
        GoTo: {
          width:125,
          height:190
        },
        DirectPlay: {
          width:205,
          height:100
        },
        Menu: {
          width:165,
          height:90
        }
      }
      return (
        <TouchableOpacity
            onPress={() => this.props.selectedItem(item) } //pass press to parent
            onFocus={() => this.props.focusedItem(item) } //pass focused to parent
        >
            <View style={styles[variation]}>
                <Image source={{uri: item.poster}} style={{flex: 1, resizeMode: 'stretch', width: sizes[variation].width, height: sizes[variation].height }} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </TouchableOpacity>
      );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 10
    },
    GoTo: {
      backgroundColor: '#e1eb34',
      height: 190,
      width: 125,
      marginHorizontal: 10
    },
    DirectPlay: {
      backgroundColor: '#e1eb34',
      height: 100,
      width: 205,
      marginHorizontal: 10
    },
    Menu: {
        backgroundColor: 'red',
        height: 90,
        width: 165,
        color: 'white',
        marginHorizontal: 10
    },
    title: {
      fontSize: 20,
      color: 'white'
    },
  });
