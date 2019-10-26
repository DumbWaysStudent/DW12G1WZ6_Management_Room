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
    this.props.navigation.navigate('Home')
    
  }

  render() {
    return (
      <SafeAreaView>
      <View style={styles.container}>

        <View style={[styles.textInfo, styles.textInfoTop]}>
          <Text style={styles.title}>HotelKy</Text>
          <Text style={styles.subTitle}>SigIn with your account</Text>
        </View>

        <View style={styles.form}>
          <Item rounded style={styles.formItem}>
            <Input
              value={this.state.inputUsername}
              onChangeText={(text) => this.setState({ inputUsername: text })}
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Input your email' />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              value={this.state.inputPassword}
              onChangeText={(text) => this.setState({ inputPassword: text })}
              secureTextEntry={true}
              keyboardType='default'
              placeholder='Input your password' />
          </Item>
          {/* <Button
            title={"Let's Get Started"}
            onHandleButton={() => this.authentication()} /> */}
          <TouchableOpacity style={{padding:10,backgroundColor:'blue'}} onPress={this.authentication}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textInfo}>
          <Text> Don't have an account?
            <Text
              onPress={() => this.handleSignUp()}
              style={styles.txtLink}> Sign Up </Text>
          </Text>
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
    marginBottom: 60
  },
  title: {
    fontSize: 50
  },
  subTitle: {
    fontSize: 24,
    marginTop: 10
  },
  formItem: {
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