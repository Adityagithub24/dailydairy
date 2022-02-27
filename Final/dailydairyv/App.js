import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
//import Main from './screens/mainroute.js';

// import AboutUs from './screens/screens/aboutus';
// import Loading from './screens/screens/loadingscreen';
// import Login from './screens/screens/login';
// import Landing from './screens/screens/landing';
import SignupScreen from './screens/screens/Signup';
// import HomeScreen from './screens/screens/Homescreen';
import Main from './screens/screens/mainroute';
import Landing from './screens/screens/landing';

export default class App extends Component{

  render(){
    return(
      <Main/>
    )
  }

}
