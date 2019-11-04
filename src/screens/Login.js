import React, { Component } from 'react';
import { View, Text,StyleSheet,SafeAreaView,Image,TouchableOpacity,Dimensions,AsyncStorage } from 'react-native';
import { 
  Card,
  
    Icon,
    Form, 
    Item, 
    Input,
    CardItem,
    Body,
   } from 'native-base';
import * as actionAuthentication from '../redux/actions/actionsAuthentication'
import {connect} from 'react-redux'
import Button from './../components/Button'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername : '',
      inputPassword : null,
      showPassword : false
    };
  }

  authentication= async() =>{
    console.log(this.state.inputPassword)
    console.log(this.state.inputUsername)
    await this.props.authentication(
      this.state.inputUsername,
      this.state.inputPassword
    )
    const data = this.props.authenticationLocal.user.token
    console.log(data)
    await AsyncStorage.setItem('user-token',data)
    this.props.navigation.navigate('MainApp')   
  }

  render() {
    return (
      <SafeAreaView>
      <View style={styles.container}>

        <View style={[styles.textInfo, styles.textInfoTop]}>
        <Image
          style={{width: 100, height: 100}}
          source={require('./../assets/icon/hotel.png')}
        />
          <Text style={styles.subTitle}>Room Management</Text>
        </View>
        <View style={styles.form}>
          <Item regular style={styles.formItem}>
            <Icon name='mail' style={{marginLeft:10,color:'grey'}}></Icon>
            <Input
              value={this.state.inputUsername}
              onChangeText={(text) => this.setState({ inputUsername: text })}
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Input your email' />
          </Item>
          <Item regular style={styles.formItem}>
          <Icon name='key' style={{marginLeft:10,color:'grey'}}></Icon>
            <Input
              value={this.state.inputPassword}
              onChangeText={(text) => this.setState({ inputPassword: text })}
              secureTextEntry={true}
              keyboardType='default'
              placeholder='Input your password' />
          </Item>
          <TouchableOpacity style={{padding:20,backgroundColor:'#1B9CFC',borderRadius:10}} onPress={this.authentication}>
            <Text style={{alignSelf:'center',fontWeight:'bold', color:'white'}}>Let's Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
    );
    }
}

const mapStateToProps = state => {
  return {
    authenticationLocal: state.authentication // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authentication: (inputUsername,inputPassword) => dispatch(actionAuthentication.login(inputUsername,inputPassword))
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: Dimensions.get('window').width,
    paddingHorizontal: 20
  },
  textInfo: {
    alignItems: 'center',
    padding: 20
  },
  textInfoTop: {
    marginTop: 40,
    marginBottom: 30
  },
  title: {
    fontSize: 50
  },
  subTitle: {
    fontWeight:'bold',
    fontSize: 24,
    marginTop: 10
  },
  formItem: {
    borderRadius:5,
    marginBottom: 20
  },
  txtLink: {
    color: 'blue'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);