import React, { Component } from 'react'
import{Image} from 'react-native'

export default class ImageRoom extends Component {
    constructor(props){
        super(props)
    }
  render() {
    const imageType1 = '../assets/room/standard_room.jpg'
    const imageType2 = '../assets/room/premium.jpg'
    const imageType3 = '../assets/room/deluxe.jpg'
    const imageType4 = '../assets/room/suit.jpg'
    const imageType5 = '../assets/room/president.jpg'
    if(this.props.src==1){
      return (
        <Image source={require(imageType1)}
        style={this.props.style}>
        </Image>
      )
    }else if(this.props.src==2){
      return (
        <Image source={require(imageType2)}
        style={this.props.style}>
        </Image>
      )
    }else if(this.props.src==3){
      return (
        <Image source={require(imageType3)}
        style={this.props.style}>
        </Image>
      )
    }else if(this.props.src==4){
      return (
        <Image source={require(imageType4)}
        style={this.props.style}>
        </Image>
      )
    }else if(this.props.src==5){
      return(
        <Image source={require(imageType5)}
        style={this.props.style}>
       </Image>
      )
     
    }
   
  }
}