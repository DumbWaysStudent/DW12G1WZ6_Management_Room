import React, { Component } from 'react';
import { View, Text,AsyncStorage,FlatList,TouchableOpacity,StyleSheet,Image } from 'react-native';
import * as actionsCustomers from '../redux/actions/actionCustomer'
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base';
import {connect} from 'react-redux'
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      cardId:'',
      phoneNumber:'',
      
    };
  }
  gotoUpdateCustomer = (idCustomer) =>{
    this.props.navigation.navigate('UpdateCustomer',idCustomer)
  }
  goAddCustomer = ()=>{
    this.props.navigation.navigate('AddCustomer')
  }
  componentDidMount=async()=>{
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getCustomer(token)
    await this.props.customersData.customers
  }

  render() {
   
    return (
      <View style={{flex:1}}>
      <FlatList
        style={{margin:10}}
        data={this.props.customersData.customers}
        renderItem={({item})=>
        <TouchableOpacity
        onPress={()=>this.gotoUpdateCustomer(item.id)} 
        style={styles.cardCustomer}>
  
        <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 50, height: 50,marginRight:10,borderRadius:25}}
          source={item.image==null?require('./../assets/defaultUser.png'):{uri:`http://192.168.73.2:5000/mangaky/${item.image}`}}
        />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text>Name : </Text>    
              <Text>{item.name}</Text>
            </View>  
            <View style={{flexDirection: 'row', }}>
              <Text>Card ID : </Text>    
              <Text>{item.id_card}</Text>
            </View> 
              <View style={{flexDirection: 'row'}}>
              <Text>Phone Number : </Text>    
              <Text>{item.phone_number}</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>  
        }
      />
       <TouchableOpacity style={styles.buttonAdd}
         onPress={this.goAddCustomer}>
       <Icon name='add' style={{color:'white',padding:10}}></Icon>
     </TouchableOpacity>
    </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    customersData : state.customers, // reducers/index.js
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCustomer: (token) => dispatch(actionsCustomers.getCustomer(token)),
  }
}

const styles = StyleSheet.create({
  buttonAdd:{
    borderRadius:30,
    alignItems: 'center',
    width:50,
    backgroundColor:'orange',
    margin:20,
    alignSelf:'flex-end'
  },
  cardCustomer: {
    borderRadius :10,
    marginBottom:5,
    padding:20,
    borderColor:'#dcdde1',
    borderWidth: 1
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);