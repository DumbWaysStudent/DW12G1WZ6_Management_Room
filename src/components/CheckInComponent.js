import React, { Component } from 'react';
import { View, Text,TouchableOpacity,AsyncStorage,Picker } from 'react-native';
import {connect} from 'react-redux';
import {Icon,Header,Input,Item,Body,Title,Left,Right,Fab,Button, Label} from 'native-base';
import * as actionsOrders from '../redux/actions/actionsOrders';
import * as actionsRooms from '../redux/actions/actionsRooms';
import * as actionsCustomers from '../redux/actions/actionCustomer'

class CheckInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        durationCheckin:'',
        selectedValue : '',
        selectedRoom : ''
    };
  }
  componentDidMount = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getCustomer(token)
    this.setState({
      selectedValue: this.props.customersData.customers[0].id,
    })
  }
  checkIn = async() =>{
    const dateNow = new Date()
    let dateCheckOut = new Date(dateNow)
    dateCheckOut.setMinutes(dateNow.getMinutes()+Number(this.state.durationCheckin))
    console.log(dateNow)
    console.log(dateCheckOut)
    const params = {
      customerId: this.state.selectedValue,
      roomId: this.props.idRoom,
      orderEndTime: dateCheckOut,
      duration: this.state.durationCheckin,
    }
    await this.props.checkInOrder(params)
    await this.props.checkInRoom(params)
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataRooms(token,this.props.typeRoom)
    await this.props.closeModal()
  }
  render() {
    return (
      <View style={{backgroundColor:'#f0f6fb', height:'100%'}}>
        <Header>
          <Body>
            <Title> Check In</Title>
          </Body>
          <Right>
              <Icon name='close' onPress={this.props.closeModal} style={{marginRight:10,color:'white'}}/>
          </Right>
        </Header>
        <View style={{flex:1, justifyContent: "center",}}>
         <View style={{borderRadius:10,backgroundColor:'white',height:'95%',width:'95%',alignSelf:'center', justifyContent: "center"}}>
          <View style={{height:'95%',width:'95%',alignSelf:'center'}}>
            <Text>Room Name</Text>
            <Item regular style={{borderRadius:5,marginBottom:10}}>
                <Input
                value={this.props.roomName}
                autoCapitalize='none'
                placeholder='Input Name Room' />
            </Item>
            <Text>Customer</Text>
            <Picker
                selectedValue={this.state.selectedValue}
                onValueChange={ (text) => ( this.setState({selectedValue:text}) ) } >
                { 
                  this.props.customersData.customers.map((item)=>{
                     return <Picker.Item key={item.id} value={item.id} label={item.name} />
                  }
                )}
            </Picker>
            <Text>Duration</Text>
            <Item regular style={{borderRadius:5,marginBottom:10}}>
                <Input
                onChangeText={(text) => this.setState({ durationCheckin: text })}
                autoCapitalize='none'
                placeholder='Input Name Room' />
             
            </Item>
            <View style={{flexDirection:'row',width:'98%',alignSelf:"center"}}>
               
                <TouchableOpacity 
                style={{width:'100%',justifyContent:'center',height:40,backgroundColor:'#1B9CFC',borderRadius:5}}
                onPress={this.checkIn}
                >
                    <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>Submit</Text>
                </TouchableOpacity>
            </View>
          </View>
         </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
    return {
      roomsData : state.rooms,
      customersData : state.customers, // reducers/index.js
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      checkInOrder: (params) =>dispatch(actionsOrders.checkInOrder(params)),
      checkInRoom: (params) =>dispatch(actionsRooms.checkInRoom(params)),
      getDataRooms: (token,type) => dispatch(actionsRooms.getRooms(token,type)),
      getCustomer: (token) => dispatch(actionsCustomers.getCustomer(token)),
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckInComponent);