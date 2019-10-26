import React, { Component } from 'react';
import { View, Text, AsyncStorage,FlatList,Modal,TouchableHighlight,Alert,StyleSheet, } from 'react-native';
import * as actionsRooms from '../redux/actions/actionsRooms'
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base';
import * as actionsOrders from '../redux/actions/actionsOrders'
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckOut from '../components/CheckOut'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomDetail :[],
      modalVisible : false
    };
  }

  componentDidMount= async() =>{
    const token = await AsyncStorage.getItem('user-token')
    await this.props.getDataRooms(token)
    const dataRooms = this.props.roomsData.rooms
    console.log(dataRooms)
  }

  goAddRoom = async () =>{
    this.props.navigation.navigate('AddRoom')
  }

  // showRoom = async(visible,idRoom) =>{
  //   const token = await AsyncStorage.getItem('user-token')
  //   await this.props.getDataOrders(token,idRoom)
  //   const dataOrders = this.props.ordersData.orders
  //   console.log(dataOrders.customers.name)
  //   this.setState({
  //     roomDetail : dataOrders.customers.name
  //   })
  //   this.setState({modalVisible: visible});
  // }
  // closeModal = (visible) =>{
  //   this.setState({modalVisible: visible});
  // }

  render() {
    const dataRooms = this.props.roomsData.rooms
    return (
      <View style={{padding:10,flex:1}}>
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <CheckOut></CheckOut>
              <TouchableHighlight
                onPress={() => {
                  this.showRoom(false,'');
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}

        <FlatList
          data={dataRooms}
          renderItem={({item})=>{     
            <Text>{item.name}</Text>
            {if(!item.available){
              return(  <View>
                <TouchableOpacity 
                style={{alignItems:'center', backgroundColor:'grey',margin:10,height:100}}
                onPress={()=>{this.showRoom(true,item.id)}}>
                  <Text>{item.name}</Text>
               </TouchableOpacity>
               </View>)
            
            }
            else{
             return (
              <View>
              <TouchableOpacity 
              style={{alignItems:'center', backgroundColor:'green',margin:10,height:100}}
              onPress={()=>{this.showRoom(true,item.id)}}>
                <Text>{item.name}</Text>
             </TouchableOpacity>
             </View>)
            }}   
          }
          }
        />
         <TouchableOpacity style={styles.buttonAdd}
           onPress={this.goAddRoom}>
         <Icon name='add' style={{color:'white',padding:10}}></Icon>
       </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    roomsData : state.rooms, // reducers/index.js
    ordersData : state.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getDataRooms: (token) => dispatch(actionsRooms.getRooms(token)),
    getDataOrders: (token,idRoom) => dispatch(actionsOrders.getOrders(token,idRoom))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
const styles = StyleSheet.create({
  buttonAdd:{
    borderRadius:30,
    alignItems: 'center',
    width:50,
    backgroundColor:'orange',
    margin:20,
    alignSelf:'flex-end'
  },

  
})