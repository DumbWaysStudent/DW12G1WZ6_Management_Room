/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as actionsRooms from '../redux/actions/actionsRooms';
import {Icon,Header,Body,Title,Left,Right,Fab,Button} from 'native-base';
import * as actionsOrders from '../redux/actions/actionsOrders';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckOut from '../components/CheckOut';
import Modal from "react-native-modal";
import { FlatGrid } from 'react-native-super-grid'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomDetail: [],
      modalVisible: false,
      orders: '',
      active: false
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('user-token');
    await this.props.getDataRooms(token);
  };

  goAddRoom = async () => {
    this.props.navigation.navigate('AddRoom');
  };

  showRoom = async (visible, idRoom) => {
    const token = await AsyncStorage.getItem('user-token');
    await this.props.getDataOrders(token, idRoom);
    const dataOrders = await this.props.ordersData.orders;
    this.setState({
      roomDetail: dataOrders.customers.name,
      orders:dataOrders
    });

    this.setState({modalVisible: visible, idRoom: idRoom});
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };
  checkIn = () => {
    alert('checkin')
  }
  goUpdateRoom = (idRoom) =>{
    this.props.navigation.navigate('UpdateRoom',idRoom)
  }

  render() {
    const dataRooms = this.props.roomsData.rooms;
    return (
      <View style={{flex:1}}>
      <View >
      <Header>
          <Body>
            <Title> Room Management</Title>
          </Body>
        </Header>
        <View style={{backgroundColor:'blue'}}>
          
        <Modal isVisible={this.state.modalVisible}>
            <View style={styles.modalInside}>
              <CheckOut 
              closeModal={()=>this.setState({modalVisible:false})}
              id={this.state.orders}></CheckOut>
            </View>
          </Modal>
        </View>
        <FlatGrid
          style={{marginRight:20,marginBottom:120}}
          itemDimension={90}
          items={dataRooms}
          renderItem={({item})=>
            <View>
              <TouchableOpacity
                style={!item.available?styles.roomBooked:styles.roomAvailable}
                onPress={()=>{!item.available?this.showRoom(true,item.id):this.goUpdateRoom(item.id)}}>
                <View style={{padding:10}}>
                  <Text style={{color:'white',fontWeight:'bold'}}>{item.name}</Text>
                  <Text style={{color:'white'}}>{!item.available?'Booked':'Available'}</Text>
                </View>  
              </TouchableOpacity>
          </View>             
          }
        />
      </View>
        <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => this.goAddRoom()}>
        <Icon name="add" />
      </Fab>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  modalContainer: {

    
  },
  modalInside: {
    borderRadius: 5,
    alignSelf:'center',
    justifyContent: "center",
    backgroundColor:'white',
    width: Dimensions.get('window').width*0.95,
    height: Dimensions.get('window').height*0.8,
  },
  buttonAdd: {
    borderRadius:30,
    alignItems: 'center',
    width:50,
    backgroundColor:'orange',
    margin:20,
    alignSelf:'flex-end'
  },
  roomBooked: {
    borderRadius:10,
   justifyContent:"flex-end",
    backgroundColor:'#0097e6',
    margin:10,
    height:100,
    width:100,
  },
  roomAvailable: {
    borderRadius:10,
    justifyContent:"flex-end",
    backgroundColor: '#4cd137',
    margin: 10,
    height: 100,
    width:100}
    
})

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