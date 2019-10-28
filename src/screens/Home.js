/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as actionsRooms from '../redux/actions/actionsRooms';
import {Icon} from 'native-base';
import * as actionsOrders from '../redux/actions/actionsOrders';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckOut from '../components/CheckOut';
import Modal from "react-native-modal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomDetail: [],
      modalVisible: false,
      orders: ''
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

  render() {
    const dataRooms = this.props.roomsData.rooms;
    return (
      <View>
        <View style={styles.modalContainer}>
        <Modal isVisible={this.state.modalVisible}>
            <View style={styles.modalInside}>
              <CheckOut 
              closeModal={()=>this.setState({modalVisible:false})}
              id={this.state.orders}></CheckOut>
            </View>
          </Modal>
        </View>
        <FlatList
          data={dataRooms}
          renderItem={({item})=>
            <View>
              <TouchableOpacity
                style={!item.available?styles.roomBooked:styles.roomAvailable}
                onPress={()=>{!item.available?this.showRoom(true,item.id):this.checkIn(true,item.id)}}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
          </View>             
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
const styles = StyleSheet.create({
  
  modalContainer: {
    backgroundColor: '#FFFFFF50',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInside: {
    alignSelf:'center',
    justifyContent: "center",
    backgroundColor:'white',
    width: Dimensions.get('window').width*0.85,
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
    alignItems:'center', 
    backgroundColor:'grey',
    margin:10,
    height:100,
  },
  roomAvailable: {
    alignItems: 'center', 
    backgroundColor: 'green',
    margin: 10,
    height: 100}
    
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