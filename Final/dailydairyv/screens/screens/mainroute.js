// @ts-check
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import CMS from './customeside.js';
import HomeScreen from './Homescreen.js';
import Landing from './landing.js';
import SignupScreen from './Signup.js';
import Login from './login.js';
import AboutUs from './aboutus.js';
import Contact from './Contact.js';
import Profile from './Profile.js';
import Loading from './loadingscreen.js';
import Statistics from './Statistics.js';
import Userlist from './Userlist.js';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

function SideBar(props) {
  return (
    <Drawer.Navigator
    screenOptions={
      {
        headerShown:false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#05375a",
        tabBarInactiveBackgroundColor: "#05375a",
        tabBarStyle: [
          {
            "display": "flex"
          },
          null
        ]
      }}  
    // drawerContentOptions={{
      //   activeTintColor: '#000',
      //   itemStyle: {marginVertical: 10},
      // }}
      drawerContent={props => <CMS {...props} />}
      initialRouteName="Home">
      <Drawer.Screen name="🏠 Home" component={HomeScreen} />
      <Drawer.Screen name="😃 Profile" component={Profile} />
      <Drawer.Screen name="🙏 About Us" component={AboutUs} />
      <Drawer.Screen name="📞 Reach To Us" component={Contact} />
      {/* <Drawer.Screen name=" FAQ" component={HomeScreen} /> */}
    </Drawer.Navigator>
  );
}

class Main extends Component {
  state = {
    LoggedIn: null,
  };

  componentDidMount() {
    setTimeout(
      () =>
        auth().onAuthStateChanged(user => {
          if (user) {
            this.setState({
              LoggedIn: true,
            });
          } else {
            this.setState({
              LoggedIn: false,
            });
          }
        }),
      3000,
    );
  }

  //#05375a
  BottomBar(props) {
    return (
      <Tabs.Navigator
        screenOptions={{
          unmountOnBlur: true,
          headerShown:false,
          headerTitleAlign:'center',
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#fff",
          tabBarActiveBackgroundColor: "#05375a",
          tabBarInactiveBackgroundColor: "#05375a",
  tabBarStyle: [
    {
      display: "flex"
    },
    null
  ]
        }}
        initialRouteName="Home">
        <Tabs.Screen
          name="Home"
          component={SideBar}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name="home"
                size={25}
                color={!focused ? color : '#fff'}
                focused={focused}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Statistics"
          component={Statistics}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name="bar-chart"
                size={25}
                color={!focused ? color : '#fff'}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Customer Details"
          component={Userlist}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialCommunityIcons
                name="clipboard-list"
                size={25}
                color={focused ? color : '#fff'}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={!focused ? color : '#fff'}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={
            {
              headerShown:false,
            }}
          >
            {this.state.LoggedIn === true ? (
              <>
                <Stack.Screen name="Home" component={this.BottomBar} />
              </>
            ) : (
              <>
                {/* <Stack.Screen name="Loading" component={Loading} /> */}
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Login" component={Login} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default Main;
