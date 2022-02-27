import react from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
}from '@react-navigation/drawer';

export function DrawerContent(props){
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}> 
            <Text>Main Content</Text>
            </DrawerContentScrollView>
        </View>
    );
}