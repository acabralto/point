import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import UnknownUserScreen from './screens/UnknownUserScreen';
import ExpiredScreen from './screens/ExpiredScreen';
import * as Config from './config';
const Stack = createStackNavigator();
export default class ActivityDemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Demo text for custom edit menu',
      isLoading: true,
      isValid: false,
      invalidReason: ''
    };
  }

  async componentDidMount() {
    let that = this;
    DeviceInfo.getAndroidId().then(androidId => {
      console.log(`Android ID : ${androidId}`);
      fetch('http://api.point5.live/api/auth/' + androidId)
      .then((response) => response.json())
      .then((data) => {
        if (data.auth.status) {
          that.setState({isLoading: false, isValid: true})
        } else {
          that.setState({isLoading: false, isValid: false, invalidReason: 'expired'}); //TODO: change this to response `invalidReason` for invalid accounts, implement more complex auth FIRST! on API
        }
      })
      .catch((error) => {
        console.error(error);
      });
    });

  }

  render() {
    if (this.state.isLoading) { //Load auth, data etc..
      return (<SplashScreen />);
    } else {
      if(this.state.isValid) { //Valid user, show app
        return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        );
      } else {//invalid user (expired,unknown)
        if (this.state.invalidReason == 'expired') {
          return (<ExpiredScreen />);
        } else if (this.state.invalidReason == 'unknown_user') {
          return (<UnknownUserScreen />);
        }
      }

    }
  }
}

AppRegistry.registerComponent('ActivityDemoComponent', () => ActivityDemoComponent);