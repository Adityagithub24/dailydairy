import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class Category extends Component {
  render() {
    return (
      <View
        style={{
          height: 250,
          width: 250,
          marginLeft: 20,
          marginRight: 20,
          borderWidth: 0,
          borderColor: '#dddddd',
        }}>
        <View style={{flex: 2}}>
          <Image
            source={this.props.imageUri}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'stretch',
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
          <Text style={{fontSize: 18}}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
