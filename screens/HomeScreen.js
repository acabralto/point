import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
function onPress() {
  console.log(`button pressed`);
}
function Item({ title }) {
  return (
      <TouchableOpacity
          onPress={onPress}
        >
      <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default class HomeScreen extends Component {
    constructor() {
      super();
      this.data = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
    }
    //TODO: complete home by building an api endpoint with types and data
    async componentDidMount() {
      let that = this;
      DeviceInfo.getAndroidId().then(androidId => {
        console.log('http://api.point5.live/api/buildMenu/' + androidId);
        fetch('http://api.point5.live/api/buildMenu/' + androidId)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //use data to populate everything
        })
        .catch((error) => {
          console.error(error);
        });
      });
    }

    render() {
      return (
        <View style={style.wrapBox}>
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <Text>Cat 1</Text>
              <FlatList
                data={this.data}
                horizontal={true}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
              <Text>Cat 2</Text>
              <FlatList
                data={this.data}
                horizontal={true}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
              <Text>Cat 2</Text>
              <FlatList
                data={this.data}
                horizontal={true}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
              <Text>Cat 2</Text>
              <FlatList
                data={this.data}
                horizontal={true}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
              <Text>Cat 2</Text>
              <FlatList
                data={this.data}
                horizontal={true}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
              <Text>Cat 2</Text>
              <FlatList
                data={this.data}
                horizontal={true}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
              <Text>Cat 2</Text>
              <FlatList
                data={this.data}
                horizontal={true}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
            </ScrollView>
          </SafeAreaView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#e1eb34',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 90
  },
  title: {
    fontSize: 32,
    color: 'black'
  },
});
