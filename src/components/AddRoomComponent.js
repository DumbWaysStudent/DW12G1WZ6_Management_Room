import React, { Component } from 'react';
import { View, Text,TouchableOpacity,AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import {Icon,Header,Input,Item,Body,Title,Left,Right,Fab,Button, Label} from 'native-base';
import * as actionsRooms from '../redux/actions/actionsRooms'
class AddRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRoom:'',
      type:'',
    };
  }

  addRoom = async() =>{
    await this.setState ({
      type: this.props.typeRoom,
    })
    const token = await AsyncStorage.getItem('user-token')
    await this.props.addDataRooms(this.state)
    await this.props.getDataRooms(token,this.state.type)
    await this.props.closeModal()
  }

  render() {
    return (
      <View style={{backgroundColor:'#f0f6fb', height:'100%'}}>
        <Header>
          <Body>
            <Title> Add Room</Title>
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
                onChangeText={(text) => this.setState({ nameRoom: text })}
                autoCapitalize='none'
                placeholder='Input Name Room' />
             
            </Item>
            <View style={{flexDirection:'row',width:'98%',alignSelf:"center"}}>
               
                <TouchableOpacity 
                style={{width:'100%',justifyContent:'center',height:40,backgroundColor:'#1B9CFC',borderRadius:5}}
                onPress={this.addRoom}
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
    roomsData : state.rooms, // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addDataRooms: (params) => dispatch(actionsRooms.addRooms(params)),
    getDataRooms: (token,type) => dispatch(actionsRooms.getRooms(token,type)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRoomComponent);