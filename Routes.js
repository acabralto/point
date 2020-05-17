import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import HomeScreen from './screens/HomeScreen'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {HomeScreen} title = "HomeScreen" initial = {true} />
      </Scene>
   </Router>
)
export default Routes