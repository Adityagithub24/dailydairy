import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class SignupScreen extends Component {
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
    Vendorid:'',
  };

  namechange = val => {
    this.setState({
      name: val,
    });
  };

  checkname = () => {
    if (this.state.name.length < 5) {
      Alert.alert('Wrong Input!', 'Enter valid name', [{text: 'Edit'}]);
      return;
    }
  };

  textInputChange = val => {
    if (val.length >= 10 && val.endsWith('@gmail.com')) {
      this.setState({
        email: val,
        check_textInputChange: true,
        isValidemail: true,
      });
    } else {
      this.setState({
        email: val,
        check_textInputChange: false,
        isValidemail: false,
      });
    }
  };
  checkEmail = () => {
    if (!this.state.email.endsWith('@gmail.com')) {
      Alert.alert('Wrong Input!', 'Enter valid email address', [
        {text: 'Edit'},
      ]);
      return;
    }
  };
  contactInputChange = val => {
    this.setState({
      contactno: val,
      isValidno: true,
    });
  };
  checkContactno = () => {
    if (this.state.contactno.length != 10) {
      Alert.alert('Wrong Input!', 'Enter valid phone no', [{text: 'Edit'}]);
      return;
    }
  };

  handlePasswordChange = val => {
    if (val.length >= 6) {
      this.setState({
        password: val,
        isValidPassword: true,
      });
    } else {
      this.setState({
        password: val,
        isValidPassword: false,
      });
    }
  };

  handleConfirmPasswordChange = val => {
    if (val === this.state.password) {
      this.setState({pswd_check: true, confirm_password: val});
    } else {
      this.setState({
        confirm_password: val,
        pswd_check: false,
      });
    }
  };

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  updateConfirmSecureTextEntry = () => {
    this.setState({
      confirm_secureTextEntry: !this.state.confirm_secureTextEntry,
    });
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

  signUpHandle = () => {
    if (this.state.name.length < 5) {
      Alert.alert('Wrong Input!', 'Enter valid name', [{text: 'Edit'}]);
      return;
    }

    if (
      this.state.email == 0 ||
      this.state.password == 0 ||
      this.state.confirm_password == 0
    ) {
      Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (!this.state.email.endsWith('@gmail.com')) {
      Alert.alert('Wrong Input!', 'Enter valid email id', [{text: 'Edit'}]);
      return;
    }

    if (this.state.contactno.length != 10) {
      Alert.alert('Wrong Input!', 'Enter 10 digit phone no..!', [
        {text: 'Edit'},
      ]);
      return;
    }

    if (!this.state.pswd_check) {
      Alert.alert('Wrong Input!', 'Password is not Matching..!', [
        {text: 'Okay'},
      ]);
      return;
    }

    Alert.alert(
      'Confirmation.!',
      'Press confirm is all above information is correcct.',
      [
        {
          text: 'Edit',
          style: 'cancel',
        },
        {text: 'Confirm', onPress: this.signUp},
      ],
      {cancelable: false},
    );
  };

  generateRandome = () => {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(text);
    // this.setState({
    //   Vendorid : text,
    // });

}

  signUp = () => {
    this.setState({loading: true});

    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user)=>{
        user.user.updateProfile({
          photoURL:"Vendor"
        })
      })
      .then(this.onLoginSuccess)
      .catch(err => {
        this.setState({
          error: err.message,
          loading: false,
        });
      });
  };
  onLoginSuccess = () => {
    console.log('function running');
    var user = firebase.auth().currentUser;
    if (user) {
      this.setState({userID: user.uid});
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      console.log(text);
      this.setState({Vendorid:text});
      console.log('user created');
      //console.log(auth().currentUser.email);
    }
    firestore()
      .collection('Vendor')
      .doc(user.uid)
      .set({
        contact: this.state.contactno,
        name: this.state.name,
        //userid: this.state.userID,
        vendorId:user.uid,
        })
      .then(() => {
        console.log('user added');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          <Animatable.View
            animation="fadeInLeft"
            useNativeDriver={true}
            duration={1500}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={styles.login}>SIGN UP</Text>
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
            <Text style={styles.text_footer}>Full Name</Text>
            <View
              style={[
                styles.action,
                {borderBottomColor: '#f2f2f2', borderBottomWidth: 1},
              ]}>
              <TextInput
                placeholder="Enter your full name"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={this.namechange}
                value={this.state.name}
                onEndEditing={this.checkname}
              />
              {this.state.name.length >= 5 ? (
                <Animatable.View animation="fadeInLeft">
                  <Feather name="check" color="green" size={30} />
                </Animatable.View>
              ) : null}
            </View>
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
                onChangeText={this.textInputChange}
                value={this.state.email}
                onEndEditing={this.checkEmail}
              />
              {this.state.isValidemail ? (
                <Animatable.View animation="fadeInLeft">
                  <Feather name="check" color="green" size={30} />
                </Animatable.View>
              ) : null}
            </View>
            <Text style={styles.text_footer}>Phone no.</Text>
            <View
              style={[
                styles.action,
                {borderBottomColor: '#f2f2f2', borderBottomWidth: 1},
              ]}>
              <TextInput
                placeholder="Enter 10 digit no."
                style={styles.textInput}
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={this.contactInputChange}
                value={this.state.contactno}
                onEndEditing={this.checkContactno}
              />
              {this.state.contactno.length == 10 ? (
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
                onChangeText={this.handlePasswordChange}
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

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}>
              Confirm Password
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Confirm Your Password"
                secureTextEntry={
                  this.state.confirm_secureTextEntry ? true : false
                }
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={this.handleConfirmPasswordChange}
                //   onEndEditing={this.checkpswd}
              />
              <TouchableOpacity onPress={this.updateConfirmSecureTextEntry}>
                {this.state.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {this.state.pswd_check ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password is not matching...!
                </Text>
              </Animatable.View>
            )}

            {this.state.error === '' ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.userErr}>{this.state.error}</Text>
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
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                  {' '}
                  Terms of service
                </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
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
                onPress={this.signUpHandle}>
                {this.state.loading ? (
                  <ActivityIndicator size="small" color="#F1FAEE" />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.textSign}>SIGN UP</Text>
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
            onPress={() => this.props.navigation.goBack()}
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
              Already have an account?
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
        {/* </ImageBackground> */}
      </View>
    );
  }
}

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
    // fontFamily: "alatsi-regular",
    color: 'white',
    fontSize: 35,
  },
  logview: {
    height: '74%',
    width: '90%',
    marginLeft: '5%',
    marginTop: 30,
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

export default SignupScreen;
