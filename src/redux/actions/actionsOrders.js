import * as types from './../types'
import axios from 'axios'

export const getOrders = (token,idRoom) => ({
    type : types.ORDERS,
    payload : axios.get(`http://192.168.73.2:5000/hotelky/orders/check/${idRoom}`,{
        headers : {"Authorization" : `Bearer ${token}`}
    })
})
export const checkOutOrder = (params) => ({
    type: types.ORDERCHECKOUT,
    payload: axios.put(`http://192.168.73.2:5000/hotelky/orders/checkout/${params.idOrder}`) 
})
export const checkInOrder = (params) => ({
    type: types.ORDERCHECKIN,
    payload: axios.post(`http://192.168.73.2:5000/hotelky/orders/checkin`,{
        customer_id: params.customerId,
        room_id: params.roomId,
        is_booked: true,
        duration: params.duration,
        order_end_time: params.orderEndTime,
        is_done: false,
    }) 
})