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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Icon} from 'react-native-elements';

class Landing extends Component {
  static navigationOptions = {
    title: 'Landing',
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
            duraton={100}
            source={require('./logo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </Animatable.View>
        <Animatable.View
          style={[
            styles.footer,
            {
              //backgroundColor: colors.background
            },
          ]}
          animation="fadeInUpBig" duration={3500}>
          <Text
            style={[
              styles.title,
              {
                //color: colors.text
              },
            ]}>
            Daily Dairy Vendor Application
          </Text>
          <Text style={styles.text}>Manage Your Stats 💹 </Text>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.buttonTextStyle}>Login</Text>
              <Icon
                style={{alignSelf: 'center'}}
                name="login"
                size={30}
                type="material"
                color="#05375a"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.buttonTextStyle}>SignUp</Text>
              <Icon
                style={{alignSelf: 'center'}}
                name="person"
                size={30}
                type="material"
                color="#05375a"
              />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

export default Landing;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.4;

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
    height: 85,
    width: 70,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 0,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#05375a',
    paddingVertical: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#05375a',
    borderColor: '#05375a',
    height: 85,
    width: 70,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 100,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10,
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
    marginTop: 20,
    marginBottom :30,
    fontSize:30
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 30,
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
