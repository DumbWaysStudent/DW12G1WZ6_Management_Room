import React, { Component } from 'react';
import { View, Text,StyleSheet,SafeAreaView,Image,TouchableOpacity,Dimensions,AsyncStorage } from 'react-native';
import { Item, Input,Label,Header,Body,Title} from 'native-base';
import {connect} from 'react-redux';
import * as actionsOrders from '../redux/actions/actionsOrders';
import * as actionsRooms from '../redux/actions/actionsRooms';
class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inputUsername : '',
          inputPassword : null,
          showPassword : false
        };
      }
  checkOut = async()=>{
    const token = await AsyncStorage.getItem('user-token');
    const params = {
      idOrder : this.props.id.id,
      idRoom : this.props.id.rooms.id
    };
    await this.props.roomCheckOut(params);
    await this.props.orderCheckOut(params);
    await this.props.getDataRooms(token);
    this.props.closeModal()
  }
  render() {
    const dataOrder = this.props.id;
    return (
      <View>
          
        <View style={styles.modal}>
      
      <View style={styles.container}>
        
          <View style={styles.form}>
            <Label>Customer Name</Label>
          <Item regular style={styles.formItem}>
            <Input
              style={styles.input}
              value={dataOrder.customers.name}
              onChangeText={(text) => this.setState({ inputUsername: text })}
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Input your email' />
          </Item>
          <Label>Room Name</Label>
          <Item regular style={styles.formItem}>
            <Input
              style={styles.input}
              value={dataOrder.rooms.name}
              onChangeText={(text) => this.setState({ inputPassword: text })}
              keyboardType='default'
              placeholder='Input your password' />
          </Item>
          <Label>Date Check In</Label>
          <Item regular style={styles.formItem}>
            <Input
              style={styles.input}
              value={dataOrder.order_end_time}
              onChangeText={(text) => this.setState({ inputPassword: text })}
              keyboardType='default'
              placeholder='Input your password' />
          </Item>
        </View>
      </View>
      <View style={{flexDirection:'row', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.buttonCheckout} onPress={this.checkOut}>
          <Text>Check Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCheckout} onPress={this.checkOut}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      
      </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: Dimensions.get('window').width*0.84,
      borderRadius:15
    },
    modal: {
      justifyContent: 'space-between',
      borderRadius:5
    },
    textInfo: {
      alignItems: 'center',
     
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
      borderRadius:4,
      marginBottom: 10,
      alignSelf:'center'
    },
    txtLink: {
      color: 'blue'
    },
    form: {
     
      justifyContent: 'center'
    },
    input: {
      padding:5,
      justifyContent: 'center'
    },
    buttonCheckout: {
      padding:10,
      backgroundColor:'blue', 
      width: Dimensions.get('window').width*0.4, 
      alignSelf: 'center',
    }
  });
  const mapStateToProps = state => {
    return {

    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      getDataRooms: (token) => dispatch(actionsRooms.getRooms(token)),
      roomCheckOut: (params) => dispatch(actionsRooms.checkOutRoom(params)),
      orderCheckOut: (params) => dispatch(actionsOrders.checkOutOrder(params))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckOut);