import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import DateTimePicker from '@react-native-community/datetimepicker';

export default class Profile extends Component {
  state = {
    uid: '',
    name: '',
    phoneno: '',
    email: '',
    Vid:'',
  };

  componentDidMount() {
    console.log('inside userdata', auth().currentUser.uid);
    if(auth().currentUser.photoURL==='Vendor')
    {
    firestore()
      .collection('Vendor')
      .doc(auth().currentUser.uid)
      .onSnapshot((snap) => {
        this.setState({
          name: snap.data().name,
          phoneno: snap.data().contact,
          uid: snap.data().userid,
          email: auth().currentUser.email,
        });
        console.log(snap.data());
        console.log(this.state.email);
      });
    } 
    else 
    console.log('error'); 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.View animation="fadeInDown" duration={1000}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={styles.login}>P r o f i l e</Text>
              <FontAwesome
                name="chevron-right"
                color="#fff"
                size={30}
                style={{ marginRight: 0, marginTop: 38, paddingLeft: 28 }}
              />
            </View>
          </Animatable.View>
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
        />
        <View style={styles.body}>
          <ScrollView> 
          <View style={styles.bodyContent}>
        
            <Animatable.View
              animation="fadeInRight"
              useNativeDriver={true}
              duration={2500}
              style={styles.logview}>
              <Text style={styles.text_footer}>🏙 Name</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  placeholder="Enter City"
                  style={styles.textInput}
                  autoCapitalize="none"
                  //   onChangeText={this.citychange}
                  //   onEndEditing={this.checkcity}
                  value={this.state.name}
                />
              </View>
            </Animatable.View>

           


            <Animatable.View
              animation="fadeInRight"
              useNativeDriver={true}
              duration={2500}
              style={styles.logview}>
              <Text style={styles.text_footer}>📞 Contact</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  placeholder="Enter City"
                  style={styles.textInput}
                  autoCapitalize="none"
                  //   onChangeText={this.citychange}
                  //   onEndEditing={this.checkcity}
                  value={this.state.phoneno}
                />
              </View>
            </Animatable.View>

            <Animatable.View
              animation="fadeInRight"
              useNativeDriver={true}
              duration={2500}
              style={styles.logview}>
              <Text style={styles.text_footer}>📧 Email</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  placeholder="Enter City"
                  style={styles.textInput}
                  autoCapitalize="none"
                  //   onChangeText={this.citychange}
                  //   onEndEditing={this.checkcity}
                  value={this.state.email}
                />
              </View>
            </Animatable.View>

            <Animatable.View
              animation="fadeInRight"
              useNativeDriver={true}
              duration={2500}
              style={styles.logview}>
              <Text style={styles.text_footer}>🆔 Vendor ID</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  placeholder="Enter City"
                  style={styles.textInput}
                  autoCapitalize="none"
                  //   onChangeText={this.citychange}
                  //   onEndEditing={this.checkcity}
                  value={this.state.uid}
                />
              </View>
            </Animatable.View>

            {/* <Text style={styles.name}>John Doe</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 2</Text>
            </TouchableOpacity> */}
          </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0d467e',
    height: 200,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 110,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  container: {
    flex: 1,
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
    marginRight: -209,
    marginTop: 0,
    marginLeft: 30,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.54,
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: '#ADD8E6',
    borderRadius: 0,
    borderBottomLeftRadius: 1000,
    position: 'absolute',
    //bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.1,
    marginTop: 0,
    marginRight: 15,
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
  pick: {
    // height:20,
    // width:300,
    paddingTop: 50,
  },
  view1: {
    // width: '100%',
    marginTop: '5%',
    marginLeft: 10,
    //flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  login: {
    // fontFamily: "alatsi-regular",
    color: '#fff',
    marginLeft: 0,
    fontSize: 30,
    marginTop: 30,
    paddingBottom: '15%',
    fontWeight: 'bold',
  },
  logtxt: {
    // fontFamily: "alatsi-regular",
    color: 'white',
    fontSize: 35,
  },
  logview: {
    //flex:,
    justifyContent: 'center',
    //alignItems:'center',
    height: 100,
    width: 360,
    marginLeft: '12%',
    marginRight: '12%',
    marginTop: '1%',
    marginBottom: '6%',
    backgroundColor: '#fff',
    // opacity: 0.3,
    borderRadius: 18,
    shadowColor: '#0d467e',
    shadowOffset: {
      height: 100,
      width: 100,
    },
    elevation: 15,
    shadowOpacity: 0.1,
    // shadowRadius: 90,
    padding: 15,
    //paddingBottom: 15
  },
  action: {
    flexDirection: 'row',
    marginTop: 9,
    borderBottomWidth: 9,
    borderBottomColor: '#0d467e',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    //  // flex: 1,
    //  // marginTop: Platform.OS === 'ios' ? 0 : -12,
    //   //paddingLeft: 4,
    color: '#05375a',
    fontSize: 18,
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
    fontSize: 20,
    padding: 10,
    fontWeight: '600',
    letterSpacing: 3,
  },
  button: {
    flex: 1,
    position: 'absolute',
    // top: 70,
    // left: 150,
    bottom: 20,
    backgroundColor: '#05375a',
    // paddingTop:2,
    // paddingLeft:20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
  },
});
