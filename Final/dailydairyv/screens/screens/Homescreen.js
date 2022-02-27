import React, {Component, useReducer, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
// import flatlistdata from '../../data/flatlistdata';
import { Icon, CheckBox } from 'react-native-elements';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar, Button, Headline, Paragraph, RadioButton, Subheading, Title, Card, Caption, FAB, Searchbar } from 'react-native-paper';


const {width, height} = Dimensions.get('window');

 function CurrentSubscription() {

  const[people,setPeople]=useState([
    {name:'Raam Singh',product:'Milk',quantity:'1 liter',address:'Shantanu Vihar',status:'Delivered',id:'1'},
    {name:'Sharan Sharma',product:'Milk',quantity:'1 liter',address:'Namandan Nagar',status:'Pending',id:'2'},
    {name:'Naman Gupta',product:'Milk',quantity:'2 liter',address:'Gandhi Park',status:'Pending',id:'3'},
    {name:'Mayur Jain',product:'Milk',quantity:'1 liter',address:'Housing Colony',status:'Delivered',id:'4'},
    
  ]);

  return(
    <View style={{height:240}} >
      <Animatable.View animation="fadeInLeft" duration={2500}>
      <Title style={{ fontSize: 25, marginLeft: 20, marginTop: -60, marginBottom:10 }}>Current Subscriptions</Title>
      <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='handled'>
      <FlatList
      keyExtractor={(item)=>item.id}
      data={people}
      horizontal={true}
       showsHorizontalScrollIndicator={false}
      // nestedScrollEnabled={true}
      //horizontal={true}
      renderItem={({item})=>(
        <Card style={styles.cardview}>
          <View style={{padding:5,}}>
            
            <Text style={{fontSize:19,padding:2, color:'#000',}}> 🤵   {item.name}</Text>
            <Text style={{fontSize:19,padding:2, color:'#000',}}> 🥛   {item.product}</Text>
            <Text style={{fontSize:19,padding:2,color:'#000',}}> 🔢  {item.quantity}</Text>
            <Text style={{fontSize:19,padding:2,color:'#000',}}> 📍   {item.address}</Text>
            <Text style={{fontSize:19,padding:2,color:'green'}}>{item.status}</Text>
          </View>
        </Card>
        
      )}
      />
      {/* <Text style={{padding:10,justifyContent:'center',fontSize:20,marginLeft:110,marginTop:60,}}>No Current Subscriptions</Text> */}
     </ScrollView>
      </Animatable.View>
      
    </View>
  )
  
}

function ProductList() {

  const[product,setProduct]=useState([
    {name:'Milk',price:'50 Rs/l',description:'Fresh And Pure Milk Rich in High Protine and Carbohydrates.',image:'https://www.eatthis.com/wp-content/uploads/sites/4/2020/02/glass-of-milk.jpg?quality=82&strip=1&resize=970%2C546',id:'1'},
    {name:'Butter',price:'100 Rs/kg',description:'Freshly Manufactured Butter with Good and Healty Cholestrol.',image:'data:image/jpeg;base64,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',id:'2'},
    {name:'Paneer',price:'200 Rs/kg',description:'Pure milk Paneer Home Made With Healthy Protine And Fresh To Eat.',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHKLo4EMSfBQ9GaFkIYM-bQ0yBKjQm4N6ZWg&usqp=CAU',id:'3'},
    {name:'Ghee',price:'500 Rs/kg',description:'Home Made Pure Cow Ghee , Freshly Prepared , No chemicals',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCHLW3ibME_lobtWUVg5IWvALS8UXuuQqpw&usqp=CAU',id:'4'},
  ]);

  const [modalOpen,setModalOpen]=useState(false);

  addProduct = () => {
   console.log('low'); 
  };

  

  return(
    <View style={{height:420}} >
      <View style={{flexDirection:'row'}}>
      <Animatable.View animation="fadeInRight" duration={2500}>
      <Title style={{ fontSize: 25, marginLeft: 20, marginTop: -20, marginBottom:10 }}>Product List</Title>
      <TouchableOpacity
      onPress={()=> setModalOpen(true)}
      >
        <View style={{backgroundColor:'#0d467e',width:180,height:45,padding:10,borderRadius:15,marginLeft:220,marginBottom:25,marginTop:-50}}>
        <Text style={{color:'#fff',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Add Product  + </Text>
        </View>
      </TouchableOpacity>
      </Animatable.View>
      </View>
      
      <Modal
       animationType={'slide'}
       visible={modalOpen}
       transparent={true}
       backdropOpacity={0.9}
       
       >
      
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.4)',height:'100%',}}> 
        <View style={styles.modalview}>
          <TouchableOpacity onPress={()=>setModalOpen(false)}>
          <Text style={{fontSize:20}}>X</Text>
          </TouchableOpacity>
          <Title style={{ fontSize: 25, marginLeft:70, marginTop: -25, marginBottom:10 , }}>Add Product</Title>
          <View style={{marginLeft:50,marginTop:20,padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>Product name</Text>
               <TextInput
                  placeholder="Enter Product Name"
                  
                
                />
            <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>Product Price</Text>
               <TextInput
                  placeholder="Enter Price"
                />
            <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}> Product description</Text>
               <TextInput
                  placeholder="Enter Description"
                />
             <TouchableOpacity
              onPress={()=> {Alert.alert('Product Added Successfully ✔'); setModalOpen(false)}}
              >
        <View style={{backgroundColor:'#0d467e',width:90,height:45,padding:10,borderRadius:15,marginLeft:25,marginBottom:25,marginTop:20}}>
        <Text style={{color:'#fff',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Add + </Text>
        </View>
      </TouchableOpacity>

          </View>
        </View>
        </View>
      </Modal>
     


      <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='handled'>

      <Animatable.View animation="fadeInUp" duration={4000}>
      <FlatList
      keyExtractor={(item)=>item.id}
      data={product}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>(
        <Card style={styles.productcardview}>
          
          <View style={{flexDirection:'row',}}>
          <Image
            source={{uri:item.image}}
            style={{height:200,width:320,margin:0,borderRadius:10,}}
            ></Image>
            <View>
            
            
            {/* <Text style={{fontSize:10,color:'#000',}}>{item.id}</Text> */}
            </View>
           
          </View>
          <View style={{flexDirection:'row',marginBottom:-10,}}>
          <Text style={{fontSize:25,color:'#000',marginLeft:30,fontWeight:'bold',padding:10,}}>{item.name}</Text>
          <Text style={{fontSize:25,color:'#000',marginLeft:30,fontWeight:'bold',padding:10,}}>{item.price}</Text>
          </View>
          <Text style={{fontSize:18,color:'#000',marginTop:1,padding:10,}}>{item.description}</Text>
        </Card>
        
      )}
      />
      {/* <Text style={{padding:10,justifyContent:'center',fontSize:20,marginLeft:110,marginTop:60,}}>No Products Added</Text> */}
      </Animatable.View>
      </ScrollView>
    </View>
  )
  
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HomeScreen',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
  };

  state = {
    Vid:'',
    consumercount:'',

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
          Vid:snap.data().vendorId,
          });
        console.log(snap.data());
        console.log(this.state.Vid);
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
            <Text style={styles.login}>H o m e</Text>
            <FontAwesome
              name="chevron-right"
              color="#fff"
              size={25}
              style={{ marginRight: 0, marginTop: 15, paddingLeft: 28 }}
            />
          </View>
        </Animatable.View>
      </View>
     
      <View style={styles.body}>
        <ScrollView> 
        <View style={styles.bodyContent}>
        </View>
        <CurrentSubscription/>
        <ProductList/>
        </ScrollView>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  
  header: {
    backgroundColor: '#0d467e',
    height:79,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
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
  container: {
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
  logtxt: {
    color: 'white',
    fontSize: 35,
  },
  logview0: {
    justifyContent: 'center',
    alignItems:'center',
    height: 50,
    width: '77%',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop:'-10%' ,
    //marginBottom: '1%',
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#0d467e',
    shadowOffset: {
      height: 100,
      width: 100,
    },
    elevation: 4,
    shadowOpacity: 0.1,
    padding: 0,
   },
   logview1: {
    //justifyContent: 'center',
    alignItems:'center',
    height: 200,
    width: '96%',
    marginLeft: '2%',
    marginRight: '1%',
    marginTop:'1%' ,
    marginBottom: '1%',
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#0d467e',
    shadowOffset: {
      height: 100,
      width: 100,
    },
    elevation: 4,
    shadowOpacity: 0.1,
    padding: 0,
   },
   cardview: {
    height: 190,
    width: 250,
    marginLeft:20,
    marginRight:10,
    marginBottom:10,
    marginTop:10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#0d467e',
    elevation: 15,
    padding: 15,
   },  
   productcardview: {
    height: 350,
    width: 350,
    marginLeft:40,
    marginRight:20,
    marginBottom:30,
    marginTop:15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#0d467e',
    shadowOffset: {
      height: 100,
      width: 100,
    },
    elevation: 4,
    shadowOpacity: 0.1,
    padding: 15,
   },  

   modalview: {
    opacity:1,
    height: 400,
    width: 300,
    marginLeft:65,
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

  textInput: {
    color: '#000',
    fontSize: 20,
  },
  text_footer: {
    fontSize: 20,
    padding: 10,
    fontWeight: '600',
    letterSpacing: 2,
    marginLeft:10,
  },
 
});

export default HomeScreen;
