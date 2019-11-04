import React, { Component } from 'react';
import { View, Text,TouchableOpacity,AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import {Icon,Header,Input,Item,Body,Title,Left,Right,Fab,Button, Label} from 'native-base';
import * as actionsRooms from '../redux/actions/actionsRooms'
class UpdateRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nameRoom: ''
    };
  }

  componentDidMount = () =>{
    this.setState({
        nameRoom: this.props.nameRoom
    })
  }
  deleteRooms = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const idRoom = this.props.idRoom
    console.log(idRoom)
    await this.props.deleteDataRooms(idRoom)
    await this.props.getDataRooms(token,this.props.typeRoom)
    await this.props.closeModal()
  }
  updateRooms = async() =>{
    const name= this.state.nameRoom
    const idRoom = this.props.idRoom
    const token = await AsyncStorage.getItem('user-token')
    await this.props.updateDataRooms(idRoom,name)
    await this.props.getDataRooms(token,this.props.typeRoom)
    await this.props.closeModal()
  }
  render() {
    return (
        <View style={{backgroundColor:'#f0f6fb', height:'100%'}}>
        <Header>
          <Body>
            <Title> Edit Room</Title>
          </Body>
          <Right>
              <Icon name='close' onPress={this.props.closeModal} style={{marginRight:10,color:'white'}}/>
          </Right>
        </Header>
        <View style={{flex:1, justifyContent: "center",}}>
         <View style={{borderRadius:10,backgroundColor:'white',height:'95%',width:'95%',alignSelf:'center', justifyContent: "center"}}>
          <View style={{height:'95%',width:'95%',alignSelf:'center'}}>
            <Text>Room Name</Text>
            <Item regular style={{borderRadius:5,marginBottom:20}}>
                <Input
                value={this.state.nameRoom}
                onChangeText={(text) => this.setState({ nameRoom: text })}
                autoCapitalize='none'
                placeholder='Input Name Room' />
            </Item>
            <View style={{flexDirection:'row',width:'98%',alignSelf:"center"}}>
                <TouchableOpacity 
                style={{justifyContent:'center',flex:1,width:'50%',marginRight:2,height:40,backgroundColor:'#ff3f34',borderRadius:5}}
                onPress={this.deleteRooms}
                >
                    <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{width:'50%',justifyContent:'center',height:40,backgroundColor:'#1B9CFC',borderRadius:5}}
                onPress={this.updateRooms}
                >
                    <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>Update</Text>
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
      roomsData : state.rooms, // reducers/index.js
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      updateDataRooms: (roomId,name) => dispatch(actionsRooms.updateRooms(roomId,name)),
      getDataRooms: (token,type) => dispatch(actionsRooms.getRooms(token,type)),
      deleteDataRooms : (params) => dispatch(actionsRooms.deleteRooms(params))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateRoomComponent);