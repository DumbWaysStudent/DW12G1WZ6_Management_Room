import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import * as actionsRooms from '../redux/actions/actionsRooms';
import {Icon,Header,Body,Title,Left,Right,Fab,Button} from 'native-base';
import * as actionsOrders from '../redux/actions/actionsOrders';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddRoom from '../components/AddRoomComponent';
import CheckOut from '../components/CheckOut';
import ImageRoom from '../components/ImageRoom'
import Modal from "react-native-modal";
import AddRoomComponent from '../components/AddRoomComponent';
import UpdateRoomComponent from '../components/UpdateRoomComponent'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomDetail: [],
      modalVisible: false,
      orders: '',
      active: false,
      modalAppear:'',
      idRoom:'',
      nameRoom:''
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('user-token');
    const params = await this.props.navigation.state.params
    await this.props.getDataRooms(token,params.type);
  };

  goAddRoom = async () => {
    //this.props.navigation.navigate('AddRoom',type);
    await this.setState({
      modalVisible: true,
      modalAppear:'addRoom'
    })
    console.log(this.state.modalAppear)
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
  editDelRoom = (idRoom,nameRoom) =>{
    this.setState({
      nameRoom: nameRoom,
      modalAppear: 'editRoom',
      idRoom: idRoom,
      modalVisible: true
    })
    console.log(this.state)
  }


  render() {
    const dataType = this.props.navigation.state.params
    const dataRooms = this.props.roomsData.rooms;
    const totalGuests = dataRooms.filter(data =>{
      return data.available==false
    }).length
    return (
      <View style={{flex:1, backgroundColor:'#f0f6fb'}}>
      
      <Header>
          <Body>
            <Title> Room Management</Title>
          </Body>
        </Header>
        <Modal isVisible={this.state.modalVisible}>
            <View style={
              this.state.modalAppear=='addRoom'||this.state.modalAppear=='editRoom'?
              styles.modalAddRoom:styles.modalInside
            }>
              {
                (this.state.modalAppear=='addRoom')?
                 <AddRoomComponent 
                  closeModal={()=>this.setState({modalVisible:false})}
                  typeRoom = {dataType.type}  
                  />
                :(this.state.modalAppear=='editRoom')?
                  <UpdateRoomComponent
                    closeModal={()=>this.setState({modalVisible:false})}
                    idRoom={this.state.idRoom}
                    nameRoom={this.state.nameRoom}
                    typeRoom = {dataType.type} 
                  />
                :(this.state.modalAppear=='checkIn')?
                  null
                :// checkout 
                  null
              }
             
              {/* <CheckOut 
              closeModal={()=>this.setState({modalVisible:false})}
              id={this.state.orders}>
              </CheckOut> */}
            </View>
          </Modal>
        
       <View style={styles.containerHeader}>
         <ImageRoom 
         src={dataType.type} 
         style={styles.imageRoom}>
           
         </ImageRoom>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <View>
             <Text style={styles.nameRoom}>{dataType.roomName}</Text>
             <Text style={styles.descRoom}>We currently have {totalGuests} guests in this type room</Text>
           </View>
           <View style={{alignContent:'flex-end'}}>
             <TouchableOpacity style={styles.buttonAdd} onPress={()=>this.goAddRoom()}>
               <Image source={require('../assets/icon/plus.png')} style={{height:10,width:10}} />
             </TouchableOpacity>
           </View>
         </View>
       </View>
       <View style={styles.containerListRooms}>
        <Text style={styles.textListRooms}>List Rooms</Text>
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          data={dataRooms}
          numColumns={3}
          renderItem={({ item }) => 
            <TouchableOpacity
              onLongPress={!item.available?false:()=>this.editDelRoom(item.id,item.name)}
              style={!item.available?styles.roomBooked:styles.roomAvailable}>
              <Text style={styles.nameRoomBooked}>{item.name}</Text>
              <Text style={styles.fontRoomBooked}>
                {!item.available?'Booked':'Available'}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
        />
       </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  modalContainer: {

    
  },
  containerHeader: {
    width:'100%',
    borderRadius:10,
    height:170,
    alignSelf:"center",
    backgroundColor:'white'
  },
  imageRoom: {
    height:100,
    width:'95%',
    alignSelf:'center',
    marginTop:8,
    borderRadius:5
  },
  nameRoom: {
    marginTop:7,
    marginLeft:10,
    fontSize:18,
    fontWeight:'bold',
    color:'#192a56'
  },
  descRoom: {
    marginTop:-1,
    marginLeft:10,
    fontSize:12,
    
  },
  buttonAdd: {
    borderRadius:5,
    marginRight:20,
    height:35,
    alignItems: 'center',
    justifyContent: 'center',
    width:35,
    marginTop:12,
    backgroundColor:'#192a56'
  },
  
  modalInside: {
    borderRadius: 5,
    alignSelf:'center',
    backgroundColor:'white',
    width: Dimensions.get('window').width*0.95,
    height: Dimensions.get('window').height*0.8,
  },
  modalAddRoom: {
    borderRadius: 5,
    alignSelf:'center',
    backgroundColor:'white',
    width: Dimensions.get('window').width*0.95,
    height: Dimensions.get('window').height*0.4,
  },

  roomBooked: {
    width:109,
    justifyContent:"flex-end",
    marginHorizontal:2,
    marginTop:10,
    borderRadius:10,
    height:70,
    backgroundColor:'#74b9ff'
  },
  roomAvailable: {
    width:109,
    justifyContent:"flex-end",
    marginHorizontal:2,
    marginTop:10,
    borderRadius:10,
    height:70,
    backgroundColor:'#55efc4'
  },
  fontRoomBooked: {
    marginLeft:10,
    fontSize:13, 
    marginTop:-1,
    marginBottom:10,
    color:'#000'
  },
  nameRoomBooked: {
    marginLeft:10,
    fontSize:13,
    fontWeight:'bold',
    color:'#192a56'
  },
  flatList: {
    marginLeft:7,
    marginRight:7,
    marginBottom:50
  },
  containerListRooms: {
    width:'98%',
    marginTop:5,
    borderRadius:10,
    height:'57%',
    alignSelf:"center",
    backgroundColor:'white'
  },
  textListRooms: {
    marginLeft:10,
    marginTop:7,
    fontSize:18,
    fontWeight:'bold',
    color:'#192a56'
  }
})

const mapStateToProps = state => {
  return {
    roomsData : state.rooms, // reducers/index.js
    ordersData : state.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getDataRooms: (token,type) => dispatch(actionsRooms.getRooms(token,type)),
    getDataOrders: (token,idRoom) => dispatch(actionsOrders.getOrders(token,idRoom))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

