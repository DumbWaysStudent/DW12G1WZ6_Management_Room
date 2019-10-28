import React, { Component } from 'react';
import { View, Text,StyleSheet,SafeAreaView,Image,TouchableOpacity,Dimensions,AsyncStorage,Picker } from 'react-native';
import { 
    Item, 
    Input,
    Label,
   } from 'native-base';
import * as actionsOrders from '../redux/actions/actionsOrders';
import * as actionsRooms from '../redux/actions/actionsRooms';
import {Dropdown} from 'react-native-material-dropdown'
import {connect} from 'react-redux'
import * as actionsCustomers from '../redux/actions/actionCustomer'
class Checkin extends Component {
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
    await this.props.getDataRooms(token)
    this.setState({
      selectedValue: this.props.customersData.customers[0].id,
      selectedRoom: this.props.roomsData.rooms[0].id,
    })
  }

  checkIn = async() =>{
    const dateNow = new Date()
    let dateCheckOut = new Date(dateNow)
    dateCheckOut.setMinutes(dateNow.getMinutes()+this.state.durationCheckin)
    const params = {
      customerId: this.state.selectedValue,
      roomId: this.state.selectedRoom,
      orderEndTime: dateCheckOut,
      duration: this.state.durationCheckin,
    }
    await this.props.checkInOrder(params)
    await this.props.checkInRoom(params)
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataRooms(token)
    alert('berhasil check in')
  }
  render() {
    return (
        <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
          <Label>Customer</Label>
            <Picker
                selectedValue={this.state.selectedValue}
                onValueChange={ (text) => ( this.setState({selectedValue:text}) ) } >
                { 
                  this.props.customersData.customers.map((item)=>{
                     return <Picker.Item key={item.id} value={item.id} label={item.name} />
                  }
                )}
            </Picker>
            <Label>Room Name</Label>
            <Picker
                selectedValue={this.state.selectedRoom}
                onValueChange={ (text) => ( this.setState({selectedRoom:text}) ) } >
                { 
                  this.props.roomsData.rooms.map((item)=>{
                     return <Picker.Item key={item.id} value={item.id} label={item.name} />
                  }
                )}
            </Picker>
            <Label>Duration</Label>
            <Item style={styles.formItem}>
              <Input
                onChangeText={(text) => this.setState({ durationCheckin: text })}
                keyboardType='default'
                placeholder='Duration Checkin' />
            </Item>
            <TouchableOpacity style={{padding:10,backgroundColor:'blue'}} onPress={this.checkIn}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView >
    );
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
      getDataRooms: (token) => dispatch(actionsRooms.getRooms(token)),
      getCustomer: (token) => dispatch(actionsCustomers.getCustomer(token)),
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Checkin);