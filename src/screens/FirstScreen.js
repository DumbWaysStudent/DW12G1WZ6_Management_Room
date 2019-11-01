import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,Image } from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import {Icon,Header,Body,Title,Left,Right,Fab,Button} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array:[
        {roomName:'Standard Room',room:null,customer:null},
        {roomName:'Standard Room',room:null,customer:null},
        {roomName:'Standard Room',room:null,customer:null},
      ]
    };
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#f1f2f6'}}>
           <Header>
          <Body>
            <Title> Room Management</Title>
          </Body>
        </Header>
         <View style={{ alignItems:'center',
      justifyContent:'center'}}>
        <View style={styles.carouselContainer}>
          <Carousel style={styles.carousel}
            itemWidth={Dimensions.get('window').width*0.9}
            containerWidth={Dimensions.get('window').width*0.9} 
           
            data={this.state.array}
            separatorWidth={0}
                ref={(c) => {
                    this._carousel = c;
                }}
            renderItem={({item})=>(
              <View style={styles.insideCarousel}>
                <View style={styles.contentCarousel}>
                  <Image source={require('../assets/room/standard_room.jpg')} style={styles.imageRoom}/>
                  <Text style={styles.roomName}>Standard Room</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon name='bed'></Icon>
                  </View>
                  <TouchableOpacity style={styles.buttonLogin} onPress={this.goToLoginScreen}>
                    <Text style={styles.fontButton} >Manage Room</Text>
                  </TouchableOpacity> 
                </View>
              </View>
            )}
        />
        </View>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({ 
  carouselContainer: {
    marginTop:10,
    height: Dimensions.get('window').height*0.75,
    backgroundColor:'#f1f2f6'
  },
  roomName: {
    color:'#192a56',
    fontWeight:'bold',
    marginTop:10,
    marginLeft:17,
    fontSize:20
  },
  carousel: {
  },
  insideCarousel: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor:'#f1f2f6',
  },
  imageRoom:{
    marginTop:5,
    borderRadius:5,
    height: Dimensions.get('window').height*0.5,
    width: Dimensions.get('window').width*0.9,
  },
  contentCarousel: {
    marginTop:70,
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
    height:'25%',
    width: '90%',
    marginTop:50 
  },
  fontButton: {
    color:'white',
    fontWeight:'bold'
  },
})
