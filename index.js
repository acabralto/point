import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import UnknownUserScreen from './screens/UnknownUserScreen';
import ExpiredScreen from './screens/ExpiredScreen';
const Stack = createStackNavigator();
export default class ActivityDemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Demo text for custom edit menu',
      isLoading: true,
      isValid: true,
      invalidReason: 'expired'
    };
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        5000
      )
    );
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