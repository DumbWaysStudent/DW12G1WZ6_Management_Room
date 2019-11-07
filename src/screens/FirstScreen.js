import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,Image,SafeAreaView,TouchableHighlight,AsyncStorage } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Icon,Header,Body,Title,Left,Right,Fab,Button} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as actionsRooms from '../redux/actions/actionsRooms';
import {connect} from 'react-redux';
class FirstScreen extends Component {
  constructor(props) {
    super(props);
      this.state = {
        activeIndex:0,
        rooms:[
          {roomName:'Standard Room',type:1,image:require('../assets/room/standard_room.jpg'),total:16,available:4},
          {roomName:'Premium Room',type:2,image:require('../assets/room/premium.jpg'),total:18,available:6},
          {roomName:'Deluxe Room',type:3,image:require('../assets/room/deluxe.jpg'),total:23,available:21},
          {roomName:'Suit Room',type:4,image:require('../assets/room/suit.jpg'),total:23,available:21},
          {roomName:'Presidential Room',type:5,image:require('../assets/room/president.jpg'),total:23,available:21},
        ]
    }
  }
  goToRoomScreen = (item) =>{
   this.props.navigation.navigate('Home',item)
  }
  componentDidMount = async() =>{
    const token = await AsyncStorage.getItem('user-token');
    this.state.rooms.map(async(item,index)=>{
      await this.props.getDataRooms(token,item.type)
      const dataRoom = await this.props.roomsData.rooms
      const totalRoom = dataRoom.length
      const totalRoomAvailable = dataRoom.filter(data =>{
        return data.available==true
      }).length
      let prevState = this.state.rooms
      prevState[index].total = totalRoom
      prevState[index].available = totalRoomAvailable
      this.setState({
        rooms :prevState
      })
    })
    console.log(this.state.rooms)
  }
  render() {

    return (
    <View style={{flex:1,backgroundColor:'#f0f6fb'}}>
      <Header>
        <Body>
          <Title> Room Management</Title>
        </Body>
      </Header>
      <View style={{ marginTop:10, alignItems:'center',
      justifyContent:'center'}}>
        <View>
          <Carousel
            style={styles.carousel}
            ref={ref => this.carousel = ref}
            data={this.state.rooms}
            sliderWidth={Dimensions.get('window').width*0.9}
            itemWidth={Dimensions.get('window').width*0.9}
            renderItem={({item})=>
              <View style={styles.insideCarousel}>
              <View style={styles.contentCarousel}>
                <Image source={item.image} style={styles.imageRoom}/>
                <Text style={styles.roomName}>{item.roomName}</Text>
                <Text style={styles.roomStatus}>
                {`Available ${item.available} room of ${item.total} total rooms`}</Text>
                <Text> </Text>
                <TouchableOpacity style={styles.buttonLogin} onPress={()=>this.goToRoomScreen(item)}>
                  <Text style={styles.fontButton} >Manage Room</Text>
                </TouchableOpacity> 
              </View>
            </View>}
            onSnapToItem = { index => this.setState({activeIndex:index}) }
            />
        </View>
      </View>
     
    </View>
      
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor:'#f1f2f6',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  carouselContainer: {
    
    height: Dimensions.get('window').height*0.5,
    backgroundColor:'#f0f6fb'
  },
  roomName: {
    color:'#192a56',
    fontWeight:'bold',
    marginTop:10,
    marginLeft:17,
    fontSize:20
  },
  roomStatus: {
    color:'#353b48',
    marginLeft:17,
    fontSize:12
  },
  carousel: {
  },
  insideCarousel: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor:'#f0f6fb',
  },
  imageRoom:{
 
    borderRadius:5,
    height: Dimensions.get('window').height*0.5,
    width: Dimensions.get('window').width*0.9,
  },
  contentCarousel: {
   
    height: Dimensions.get('window').height*0.75,
    width: Dimensions.get('window').width*0.9,
    backgroundColor:'white',
    borderRadius:10,
  },
  buttonLogin: {
    alignSelf:'center',
    borderRadius:5,
    backgroundColor:'#1ea7cf',
    alignItems:'center',
    justifyContent:'center', 
    height:'30%',
    width: '90%',
    marginTop:10
  },
  fontButton: {
    color:'white',
    fontWeight:'bold'
  },
});
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
)(FirstScreen);