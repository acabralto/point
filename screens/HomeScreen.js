import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from './SplashScreen';
import  PosterCard from '../components/PosterCard';
export default class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        menuLoaded: false,
        selectedItem: null,
        focusedItem: null
      }
    }
    async componentDidMount() {
      let that = this;
      DeviceInfo.getAndroidId().then(androidId => {
        fetch('http://api.point5.live/api/buildMenu/' + androidId)
        .then((response) => response.json())
        .then((data) => {
          that.setState({menu: data, menuLoaded: true});
        })
        .catch((error) => {
          console.error(error);
        });
      });
    }

    focusedItem(item) {
      this.setState({focusedItem: item});
    }

    selectedItem(item) {
      this.setState({selectedItem: item});
    }

    render() {
      let data = this.state.menu;
      if (this.state.menuLoaded) {
        let rowList = [];
        for (key in data) {
          let variation = data[key].variation;
          rowList.push((
            <View>
              <Text style={{color:'white', margin: 20, fontSize: 18}}>{data[key].title}</Text>
              <FlatList
                  data={data[key].rows}
                  horizontal={true}
                  renderItem={({ item }) => (<PosterCard item={item} variation={variation} selectedItem={(item) => this.selectedItem(item)} focusedItem={(item) => this.focusedItem(item)} />)}
                  keyExtractor={item => item.content_id}
                />
            </View>
          ));
        }
        return (
          <View style={style.wrapBox}>
            <SafeAreaView style={style.container}>

              <View style={{ height:200, backgroundColor: 'black'}}>
                <Text style={{color:'white', fontSize: 40}}>{this.state.focusedItem != null ? this.state.focusedItem.title : ""}</Text>
              </View>

              <ScrollView>
              {rowList}
              </ScrollView>
            </SafeAreaView>
          </View>
        );
      } else {
        return (<SplashScreen />);
      }
    }
}
const style = StyleSheet.create({
  wrapBox: {
    color: 'black',
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    margin: 30
  }
});