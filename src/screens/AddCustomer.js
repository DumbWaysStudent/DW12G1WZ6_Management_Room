import React, { Component } from 'react';
import { View, Text,StyleSheet,SafeAreaView,Image,TouchableOpacity,Dimensions,AsyncStorage } from 'react-native';
import { 
    Item, 
    Input,
    Icon,
    Header,
    Body,
    Title
   } from 'native-base';
import * as actionsCustomer from '../redux/actions/actionCustomer'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name  : '',
          idCard : '',
          phoneNumber : ''
        };
      }

  addDataCustomerHandler= async()=>{
    const token = await AsyncStorage.getItem('user-token')
    const params = {name:this.state.name,idCard:this.state.idCard,phoneNumber:this.state.phoneNumber} 
    await this.props.addDataCustomers(params)
    await this.props.getDataCustomers(token)
    this.props.navigation.navigate('Customer')
  }  

  handleCamera=()=>{
    const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let tmpPhoto = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          const source = response;
          this.setState({
            cover: tmpPhoto,
          });
        }
      });
  }

  render() {
    return (
      <SafeAreaView>
           <Header>
          <Body>
            <Title> Room Management</Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <View style={styles.form}>
            <Image style={{height:120,width:120,alignSelf:'center',borderRadius:60,marginBottom:10}} source={require('../assets/room/suit.jpg')}/>
            <TouchableOpacity style={{height:40,borderRadius:10,justifyContent:'center',marginBottom:10,width:150,backgroundColor:'#273c75',alignSelf:'center'}}>
              <View style={{flexDirection:'row'}}>
              <Icon name='camera' style={{color:'white',marginLeft: 10,}}/>
              <Text style={{marginTop:4,marginLeft:10,color:'white',fontWeight:'bold'}}>Take Photo</Text>
              </View>
              
            </TouchableOpacity>
            <Item regular style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ name: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Customer Name '
               />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ idCard: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='ID Card'
               />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Phone Number'
               />
            </Item>
            <View style={{flexDirection:'row',width:'98%',alignSelf:"center"}}>
               
                <TouchableOpacity 
                style={{width:'100%',justifyContent:'center',height:50,backgroundColor:'#1B9CFC',borderRadius:5}}
                onPress={this.addRoom}
                >
                  <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>Add Customer</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      marginTop:10,
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
      borderRadius:10,
      marginBottom: 20
    },
    txtLink: {
      color: 'blue'
    }
  });
  const mapStateToProps = state => {
    return {
      customerData : state.customer, // reducers/index.js
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      addDataCustomers: (params) => dispatch(actionsCustomer.addCustomer(params)),
      getDataCustomers: (token) => dispatch(actionsCustomer.getCustomer(token)),
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddCustomer);