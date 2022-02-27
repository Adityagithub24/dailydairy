import React, {Component} from 'react';
//import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
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
import {Icon} from 'react-native-elements';
//import Home from './home.js';

class AboutUs extends Component {
  static navigationOptions = {
    title: 'AboutUs',
    headerStyle: {
      showHeader: true,
      backgroundColor: '#73C6B6',
    },
  };

  generateRandome = () => {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(text);
}


   

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#ffffff00"
          translucent={true}
          barStyle="dark-content"
        />

        <Animatable.View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="50"
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
          animation="fadeInUpBig">
          <Text
            style={[
              styles.title,
              {
                //color: colors.text
              },
            ]}
            onPress={() => {
              this.generateRandome();
           }}   
            >
            About Us 🙏 
          </Text>
          <Text style={styles.text}>
            DailyDairy is Daily Utility App Which Helps You to track record of your daily purchaces
            Founded by Aditya Purohit ,Anirudha Singh , Aditya Deshmukh , Aman Pratap Singh
            We expect to expand this to every country and city.
          </Text>
        </Animatable.View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}>
          <Icon
            style={{alignSelf: 'center'}}
            name="menu"
            size={24}
            type="material"
            color="#fff"
          />
        </TouchableOpacity>
      </View> 
    );
  }
}
export default AboutUs;

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  logo: {
    width: 400,
    height: 300,
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
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
    borderTopLeftRadius: 0,
    borderTopRightRadius: 700,
    paddingVertical: 60,
    paddingHorizontal: 40,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100,
  },
  text: {
    color: 'white',
    marginTop: 100,
    fontSize: 15,
  },
  // button: {
  //     alignItems: 'flex-end',
  //     marginTop: 30
  // },
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
  button: {
    flex: 1,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#05375a',
    // paddingTop:2,
    // paddingLeft:20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
