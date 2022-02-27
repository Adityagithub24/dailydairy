import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';

class Loading extends Component {
  static navigationOptions = {
    title: 'Loading',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <Animatable.View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="50"
            source={require('./logo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </Animatable.View>
      </View>
    );
  }
}

export default Loading;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#05375a',
    borderColor: '#05375a',
    height: 65,
    width: 70,
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 100,
    marginRight: 10,
    marginTop: -30,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#05375a',
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#05375a',
    borderColor: '#05375a',
    height: 65,
    width: 70,
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 100,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 80,
  },
  footer: {
    flex: 1,
    backgroundColor: '#05375a',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 450,
    height: height_logo,
  },
  title: {
    color: 'white',
    fontSize: 29,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
