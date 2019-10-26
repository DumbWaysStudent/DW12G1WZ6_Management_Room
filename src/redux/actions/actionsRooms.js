import * as types from './../types'
import axios from 'axios'

export const getRooms = (token) => ({
    type : types.ROOMS,
    payload : axios.get(`http://192.168.73.2:5000/hotelky/rooms`,{
        headers : {"Authorization" : `Bearer ${token}`}
    })
})
export const addRooms = (params) =>({
    type : types.ADDROOM,
    payload : axios.post(`http://192.168.73.2:5000/hotelky/rooms/add`,{
        name : params,
        available : true
    })
})