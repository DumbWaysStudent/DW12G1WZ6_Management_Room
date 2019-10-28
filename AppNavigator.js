import React, {Component} from 'react';
import {Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screens/Home'
import AddRoom from './src/screens/AddRoom'
import Login from './src/screens/Login';
import Checkin from './src/screens/Checkin'
import Customer from './src/screens/Customer'
import Setting from './src/screens/Setting'
import AddCustomer from './src/screens/AddCustomer'
import UpdateCustomer from './src/screens/updateCustomer'
import UpdateRoom from './src/screens/UpdateRoom'

import {createBottomTabNavigator} from 'react-navigation-tabs';

const MainApp = createBottomTabNavigator(
    {
      Room : {screen:Home},
      Checkin :{screen:Checkin} ,
      Customer: {screen:Customer},
      Setting : {screen:Setting}
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
           if (routeName === 'Customer') {
            return (
              <Image
                source={ require('./src/assets/icon/user.png') }
                style={{ width: 20, height: 20, }} /> 
            );
          }
        else if(routeName==='Checkin') {
            return (
              <Image
                source={ require('./src/assets/icon/favorites.png') }
                style={{ width: 20, height: 20, }} /> 
            );
        }
        else if(routeName==='Room') {
            return (
              <Image
                source={ require('./src/assets/icon/menu.png') }
                style={{ width: 20, height: 20, }} /> 
            );
          }
          else if(routeName==='Setting') {
            return (
              <Image
                source={ require('./src/assets/icon/menu.png') }
                style={{ width: 20, height: 20, }} /> 
            );
          }
        },
        
      }),
      tabBarOptions: {
        activeTintColor: '#FF6F00',
        inactiveTintColor: '#263238',
      },
    }
  );
const AppNavigator = createStackNavigator({
   
    Login : {
      screen :Login,
      navigationOptions : {
      header:null
      }
    },
    Home: { 
      screen: MainApp,
      navigationOptions : {
          header:null
      }
    },
    AddRoom:{
      screen:AddRoom,
        navigationOptions:{
          header:null
        }
    },
    AddCustomer : {
      screen : AddCustomer,
      navigationOptions:{
        header:null
      }
    },
    UpdateCustomer : {
      screen : UpdateCustomer,
      navigationOptions:{
        header:null
      }
    },
    UpdateRoom : {
      screen : UpdateRoom,
      navigationOptions:{
        header:null
      }
    }
});

export default createAppContainer(AppNavigator);
