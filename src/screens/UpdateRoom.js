import React, { Component } from 'react';
import { View, Text,StyleSheet,SafeAreaView,Image,TouchableOpacity,Dimensions,AsyncStorage } from 'react-native';
import { 
    Item, 
    Input,
   } from 'native-base';
import * as actionsRooms from '../redux/actions/actionsRooms'
import {connect} from 'react-redux'

 class UpdateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          room : '',
        };
      }

  updateDataRoomHandler= async()=>{
    
    const roomId= this.props.navigation.state.params
    const name= this.state.room
    
    const token = await AsyncStorage.getItem('user-token')
    await this.props.updateDataRooms(roomId,name)
    await this.props.getDataRooms(token)
    await this.props.navigation.navigate('Home')
  }
  componentDidMount = async() =>{
    const idRoom = this.props.navigation.state.params
    const dataRoom = await this.props.roomsData.rooms
    const dataRoomFilter = dataRoom.filter(data=>{
        return data.id == idRoom
    })
    this.setState({
      room: dataRoomFilter[0].name
    })
  }  
  
  render() {
    return (
        <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.room}
                onChangeText={(text) => this.setState({ room: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Name Room'
               />
            </Item>
            <TouchableOpacity style={{padding:20,backgroundColor:'#1B9CFC',borderRadius:30}} onPress={this.updateDataRoomHandler}>
                <Text style={{alignSelf:'center',fontWeight:'bold', color:'white'}}>Update</Text>
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
      marginTop:50,
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
      roomsData : state.rooms, // reducers/index.js
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      updateDataRooms: (roomId,name) => dispatch(actionsRooms.updateRooms(roomId,name)),
      getDataRooms: (token) => dispatch(actionsRooms.getRooms(token))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateRoom);