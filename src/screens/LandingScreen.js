import React, { Component } from 'react';
import { View, Text,ImageBackground,Image,TouchableOpacity,StyleSheet } from 'react-native';

export default class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToLoginScreen= () =>{
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ImageBackground source={require('./../assets/background.png')}
        style={styles.imageBackground}>
            <Image source={require('./../assets/icon/hotel.png')} style={{height: 125,width:125}} />
            <Text style={styles.textTitle}>Hotelky</Text>
            <Text style={styles.subTitle}>Easy To Manage, Easy To Use</Text>
            <TouchableOpacity style={styles.buttonLogin} onPress={this.goToLoginScreen}>
              <Text style={styles.fontButton} >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRegister}>
              <Text style={styles.fontButton}>Register</Text>
            </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  textTitle: {
    marginTop:10,
    fontSize:28,
    fontWeight:'bold',
    color:'white'
  },
  subTitle: {
    marginTop:5,
    color:'white'
  },
  buttonLogin: {
    borderRadius:5,
    backgroundColor:'#1ea7cf',
    alignItems:'center',
    justifyContent:'center', 
    height:'8%',
    width: '80%',
    marginTop:100 
  },
  fontButton: {
    color:'white',
    fontWeight:'bold'
  },
  buttonRegister: {
    borderRadius:5,
    backgroundColor:'#133c49', 
    alignItems:'center',
    justifyContent:'center',
    height:'8%',
    width: '80%',
    marginTop:10
  }

})