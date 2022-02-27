import React, {Component, useState, useEffect} from 'react';
import {
  Dimensions,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  errortext,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import HomeScreen from './Homescreen.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
  };
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: false,
    isValidemail: null,
    isValidPassword: true,
    pswd_check: true,
    loading: false,
    contactno: '',
    isValidno: null,
  };

  handleEmail = text => {
    if (text.length >= 10 && text.endsWith('@gmail.com')) {
      this.setState({
        email: text,
        check_textInputChange: true,
        isValidemail: true,
      });
    } else {
      this.setState({
        email: text,
        check_textInputChange: false,
        isValidemail: false,
      });
    }
  };
  handlePassword = text => {
    if (text.length >= 6) {
      this.setState({
        password: text,
        isValidPassword: true,
      });
    } else {
      this.setState({
        password: text,
        isValidPassword: false,
      });
    }
  };

  loginUser(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user.user.toJSON());
        this.props.navigation.navigate('HomeScreen');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  checkEmail = () => {
    if (!this.state.email.endsWith('@gmail.com')) {
      Alert.alert('Wrong Input!', 'Enter valid email address', [
        {text: 'Edit'},
      ]);
      return;
    }
  };

  handleValidUser = val => {
    if (val.length >= 4) {
      this.setState({
        isValidUser: true,
      });
    } else {
      this.setState({
        isValidUser: false,
      });
    }
  };

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.view1}>
            <Animatable.View
              animation="fadeInLeft"
              useNativeDriver={true}
              duration={1000}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <FontAwesome name="arrow-circle-left" color="#FFF" size={30} />
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              animation="fadeInLeft"
              useNativeDriver={true}
              duration={1500}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={styles.login}>LOG IN PLEASE</Text>
                <FontAwesome
                  name="chevron-right"
                  color="#0d467e"
                  size={30}
                  style={{marginLeft: 170, marginTop: 10}}
                />
              </View>
            </Animatable.View>
          </View>

          {/*SignUp Form */}

          <Animatable.View
            animation="fadeInRight"
            useNativeDriver={true}
            duration={900}
            style={styles.logview}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.text_footer}>Email</Text>
              <View
                style={[
                  styles.action,
                  {borderBottomColor: '#f2f2f2', borderBottomWidth: 1},
                ]}>
                <TextInput
                  placeholder="Enter your email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={this.handleEmail}
                  value={this.state.email}
                  onEndEditing={this.checkEmail}
                />
                {this.state.isValidemail ? (
                  <Animatable.View animation="fadeInLeft">
                    <Feather name="check" color="green" size={30} />
                  </Animatable.View>
                ) : null}
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}>
                Password
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={this.state.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={this.handlePassword}
                  onEndEditing={this.handleValidUser}
                />
                <TouchableOpacity onPress={this.updateSecureTextEntry}>
                  {this.state.secureTextEntry ? (
                    <Feather name="lock" color="grey" size={30} />
                  ) : (
                    <Feather name="unlock" color="grey" size={30} />
                  )}
                </TouchableOpacity>
              </View>
              {this.state.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 6 characters long.
                  </Text>
                </Animatable.View>
              )}

              <View
                style={{
                  alignItems: 'flex-end',

                  padding: 4,
                }}>
                <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                  </Text>
                  <Text
                    style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                    {' '}
                    Terms of service
                  </Text>
                  <Text style={styles.color_textPrivate}> and</Text>
                  <Text
                    style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                    {' '}
                    Privacy policy
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 95,
                    padding: 12,
                    paddingHorizontal: 20,
                    backgroundColor: '#0d467e',
                    borderRadius: 5,
                    // shadowColor: "rgba(0,0,0,1)",
                    shadowOffset: {
                      height: 5,
                      width: 5,
                    },
                    elevation: 5,
                    shadowOpacity: 0.15,
                    shadowRadius: 0,
                    marginRight: 90,
                    marginTop: 15,
                  }}
                  onPress={() =>
                    this.loginUser(this.state.email, this.state.password)
                  }>
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color="#F1FAEE" />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.textSign}>Log In</Text>
                      <FontAwesome
                        name="check"
                        color="#FFF"
                        size={20}
                        style={{marginLeft: 5}}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
          <Animatable.View
            animation="bounceIn"
            useNativeDriver={true}
            duration={1200}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60,
              }}>
              <Text
                style={{
                  //fontFamily: "roboto-regular",
                  color: 'rgba(29,53,87,1)',
                  fontSize: 18,
                }}>
                Dont Have Account , Register.
              </Text>
              <Text
                style={{
                  // fontFamily: "roboto-700",
                  color: 'rgba(29,53,87,1)',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Log In
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </>
    );
  }
}

export default Login;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image2: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  image2_imageStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    resizeMode: 'stretch',
  },
  view1: {
    width: '100%',
    marginTop: '5%',
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  login: {
    // fontFamily: "alatsi-regular",
    color: '#0d467e',
    marginLeft: 10,
    fontSize: 35,
  },
  logtxt: {
    color: 'white',
    fontSize: 35,
  },
  logview: {
    height: '44%',
    width: '90%',
    marginLeft: '5%',
    marginTop: '30%',
    backgroundColor: '#FFF',
    // opacity: 0.3,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 3,
    shadowOpacity: 0.5,
    shadowRadius: 0,
    padding: 25,
    paddingBottom: 0,
  },
  action: {
    flexDirection: 'row',
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0d467e',
    paddingBottom: 7,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 7,
    color: '#05375a',
    fontSize: 16,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  textSign: {
    // fontFamily: "alatsi-regular",
    color: '#fff',
    fontSize: 14,
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  color_textPrivate: {
    color: 'grey',
    fontSize: 12,
  },
  otherbutton: {
    padding: 5,
    paddingHorizontal: 25,
    backgroundColor: '#4885ed',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 20,
      width: 20,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  text_footer: {
    fontSize: 16,
  },
});
