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
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  errortext,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Icon} from 'react-native-elements';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Avatar, Button, Headline, Paragraph, RadioButton, Subheading, Title, Card, Caption, FAB, Searchbar } from 'react-native-paper';
import { fonts } from 'react-native-elements/dist/config';
//import Home from './home.js';

const MyBarChart = () => {
  return (
    <>
    <ScrollView>
     <View>
     <Title style={{ fontSize: 20, marginLeft: 25, marginTop: 10, marginBottom:10, fontWeight:'bold', }}>Monthly Profit Statistics JAN - JUNE </Title>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width/1.10} // from react-native
    height={420}
    yAxisLabel="Rs."
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
     backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#FFF"
      }
    }}
    bezier
    style={{
      //marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>

<View>
<Title style={{ fontSize: 20, marginLeft: 25, marginTop: 30, marginBottom:20, fontWeight:'bold', }}>Monthly Profit Statistics JULY - DEC</Title>
  <LineChart
    data={{
      labels: ["July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={420}
    yAxisLabel="Rs."
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      //backgroundColor: "#0d467e",
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0,0, 0, ${opacity})`,

      
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#fff"
      }
    }}
    bezier
    style={{
     // marginVertical: 8,
      borderRadius: 16,
      
    }}
  />
</View>


<View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width/1.10} // from react-native
    height={30}
    yAxisLabel="Rs."
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "blue",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>

</ScrollView>
    </>
  );
};


class Statistics extends Component {
  static navigationOptions = {
    title: 'Statistics',
    headerStyle: {
      showHeader: true,
      backgroundColor: '#73C6B6',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#ffffff00"
          translucent={true}
          barStyle="dark-content"
        />

        <View style={styles.view1}>
          <Animatable.View
            animation="fadeInLeft"
            useNativeDriver={true}
            duration={2500}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={styles.login}>S T A T I S T I C S</Text>
              <FontAwesome
                name="line-chart"
                color="#0d467e"
                size={30}
                style={{marginLeft: 70, marginTop: 10}}
              />
            </View>
            
          </Animatable.View>
        </View>

        <View style={styles.view2}>
          <Animatable.View
            animation="fadeInRight"
            useNativeDriver={true}
            duration={2500}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              
              {/* <FontAwesome
                name="line-chart"
                color="#0d467e"
                size={30}
                style={{marginLeft: 70, marginTop: 0}}
              /> */}
            </View>
            <MyBarChart />

            

           
          </Animatable.View>
        </View>
          
        {/* <Animatable.View
          style={[
            styles.footer,
            {
              //backgroundColor: colors.background
            },
          ]}
          animation="fadeInUpBig">
          
        </Animatable.View> */}
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
    );
  }
}
export default Statistics;

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
  header1:{

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
    backgroundColor: '#ADD8E6',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    paddingVertical:160,
    paddingHorizontal: 140,
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
  login: {
    // fontFamily: "alatsi-regular",
    color: '#0d467e',
    marginLeft: 10,
    fontSize: 35,
  },
  view1: {
    width: '100%',
    marginTop: '12%',
    marginBottom:10,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view2: {
    width: '100%',
    marginTop: '5%',
    marginBottom:'12%',
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
