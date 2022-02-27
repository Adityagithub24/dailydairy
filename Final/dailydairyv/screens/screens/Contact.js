import React, { Component, useState, useEffect } from 'react';
import {
  Picker,
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
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
  state = {
    ContactNo: '',
    Message: '',
  };

  handleContactNo = (numeric) => {
    this.setState({ ContactNo: numeric });
  };
  handleMessage = (text) => {
    this.setState({ Message: text });
  };

  setData(ContactNo, Message) {
    firestore()
      .collection('contacts')
      .add({
        contact: ContactNo,
        message: Message,
      })
      .then(() => {
        Alert.alert('We Will Resolve Your Querry Shortly And Contact You');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          style={styles.bigCircle}
          animation="slideInDown"
          duration={4000}></Animatable.View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            {/* <View style={styles.logoBox}>
                <Icon
                  color='#fff'
                  name='home'
                  type='font-awesome'
                  size={50}
                />
              </View> */}
            <Text style={styles.loginTitleText}>Reach To Us</Text>
            <View style={styles.hr}></View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>📱 Contact No. </Text>
              <TextInput
                style={styles.input}
                // autoCapitalize={false}
                keyboardType="numeric"
                onChangeText={this.handleContactNo}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>📩 Message </Text>
              <TextInput
                style={styles.input1}
                // autoCapitalize={false}
                keyboardType="default"
                placeholder="Any Complaints And Querries"
                onChangeText={this.handleMessage}
              />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() =>
                this.setData(this.state.ContactNo, this.state.Message)
              }>
              <Text style={styles.loginButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').width * 0.98,
    height: Dimensions.get('window').height * 0.93,
    backgroundColor: '#7AA9DD',
    borderRadius: 10,
    borderBottomLeftRadius: 10000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.5,
    //top: -90,
    marginRight: -220,
    marginTop: 0,
    marginLeft: 20,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: 'grey',
    borderRadius: 100,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.2,
  },
  centerizedView: {
    width: '90%',
    top: '15%',
    marginLeft: 20,
  },
  authBox: {
    width: '89%',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  logoBox: {
    width: 80,
    height: 90,
    backgroundColor: '#0d467e',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'center',
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 25,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  input1: {
    width:320,
    height: 140,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#0d467e',
    marginTop: 50,
    paddingVertical: 5,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});
