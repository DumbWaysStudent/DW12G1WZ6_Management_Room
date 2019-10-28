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
    const params = {
        idRoom: this.props.navigation.state.params,
        name: this.state.room
    }

    await this.props.addDataRooms(this.state.room)
    await this.props.getDataRooms(token)
    console.log(this.props.roomsData)
    this.props.navigation.navigate('Home')
  }
  componentDidMount = async() =>{
    const params = {
        idRoom: this.props.navigation.state.params,
        name: this.state.room
    }

    console.log(idRoom)
  }  
  
  render() {
    return (
        <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Input
                value={this.state.roomDetail}
                onChangeText={(text) => this.setState({ room: text })}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Name Room'
               />
            </Item>
            <TouchableOpacity style={{padding:20,backgroundColor:'#1B9CFC',borderRadius:30}} onPress={this.updateDataRoomHandler}>
                <Text style={{alignSelf:'center',fontWeight:'bold', color:'white'}}>Login</Text>
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
      updateDataRooms: (params) => dispatch(actionsRooms.updateRooms(params)),
      getDataDetailRooms: (params) => dispatch(actionsRooms.detailRooms(params)),
      getDataRooms: (token) => dispatch(actionsRooms.getRooms(token))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateRoom);