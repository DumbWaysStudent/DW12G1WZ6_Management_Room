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
export const checkInRoom = (params) =>({
    type: types.ROOMSCHECKIN,
    payload: axios.put(`http://192.168.73.2:5000/hotelky/rooms/checkin/${params.roomId}`,{
        available: false
    })
})
export const checkOutRoom = (params) =>({
    type: types.ROOMSCHECKOUT,
    payload: axios.put(`http://192.168.73.2:5000/hotelky/rooms/checkout/${params.idRoom}`,{
        available: true
    })
})
export const updateRooms = (roomId,name) =>({
    types: types.ROOMSUPDATE,
    payload: axios.put(`http://192.168.73.2:5000/hotelky/rooms/update/${roomId}`,{
        name: name
    })
})
export const detailRooms = (params) =>({
    types: types.ROOMSDETAIL,
    payload: axios.get(`http://192.168.73.2:5000/hotelky/rooms/detail/${params}`)
})