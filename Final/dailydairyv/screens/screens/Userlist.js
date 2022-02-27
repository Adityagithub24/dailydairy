import React, {Component, useReducer, useState} from 'react';
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
import { Avatar, Headline, Paragraph, RadioButton, Subheading, Title, Card, Caption, FAB, Searchbar,Modal, } from 'react-native-paper';




function CurrentSubscription() {

  const[people,setPeople]=useState([
    {name:'Raam Singh',product:'Milk',quantity:'1 liter',address:'Shantanu Vihar',status:'Delivered',id:'1'},
    {name:'Sharan Sharma',product:'Milk',quantity:'1 liter',address:'Namandan Nagar',status:'Pending',id:'2'},
    {name:'Naman Gupta',product:'Milk',quantity:'2 liter',address:'Gandhi Park',status:'Pending',id:'3'},
    {name:'Mayur Jain',product:'Milk',quantity:'1 liter',address:'Housing Colony',status:'Delivered',id:'4'},
    
  ]);

  return(
    <View style={{height:840,marginTop:80,padding:10,}} >
      <Animatable.View animation="fadeInLeft" duration={2500}>
      <Title style={{ fontSize: 25, marginLeft: 20, marginTop: -60, marginBottom:10 }}>Current Subscriptions</Title>
      
      <FlatList
      keyExtractor={(item)=>item.id}
      data={people}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <Card style={styles.cardview}>
          <View >
            
            <Text style={{fontSize:19,padding:2, color:'#000',}}> 🤵   {item.name}</Text>
               </View>
        </Card>
        
      )}
      />
     
      </Animatable.View>
      <Animatable.View animation="fadeInRight" duration={2500}>
      <Title style={{ fontSize: 25, marginLeft: 20, marginTop: 20, marginBottom:10 }}>Upcomming Subscriptions</Title>
    
      <FlatList
      keyExtractor={(item)=>item.id}
      data={people}
      horizontal={false}
       showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <Card style={styles.cardview}>
          <View >
            <Text style={{fontSize:19,padding:2, color:'#000',}}> 🤵   {item.name}</Text>
          </View>
        </Card>
        
      )}
      />
      </Animatable.View>
      
    </View>
  )
  
}




export default class Userlist extends Component {
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
            <Text style={styles.login}>Customer Details</Text>
            <FontAwesome
              name="chevron-right"
              color="#fff"
              size={25}
              style={{ marginRight: 0, marginTop: 15, paddingLeft: 28 }}
            />
          </View>
        </Animatable.View>
      </View>
      <CurrentSubscription/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0d467e',
    height:79,
  },container: {
    flex: 1,
  },
  login: {
    color: '#fff',
    marginLeft: 0,
    fontSize: 25,
    marginTop: 10,
    paddingBottom: '2%',
    fontWeight: 'bold',
  },
  modalview: {
    opacity:1,
    height: 450,
    width: 350,
    marginLeft:45,
    marginRight:20,
    marginTop:200,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#0d467e',
    shadowOffset: {
      height: 900,
      width: 900,
    },
    elevation:80,
    shadowOpacity: 50,
    padding:10,
   },
   cardview: {
    height: 40,
    width: 300,
    marginLeft:20,
    marginRight:10,
    marginBottom:5,
    marginTop:10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#0d467e',
    elevation: 15,
    padding: 5,
   },   
});
