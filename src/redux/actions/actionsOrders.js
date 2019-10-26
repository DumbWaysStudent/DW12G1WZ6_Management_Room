import * as types from './../types'
import axios from 'axios'

export const getOrders = (token,idRoom) => ({
    type : types.ORDERS,
    payload : axios.get(`http://192.168.73.2:5000/hotelky/orders/check/${idRoom}`,{
        headers : {"Authorization" : `Bearer ${token}`}
    })
})