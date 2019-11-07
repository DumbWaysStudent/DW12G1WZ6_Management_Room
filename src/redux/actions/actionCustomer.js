import * as types from './../types'
import axios from 'axios'

export const getCustomer = (token) => ({
    type : types.CUSTOMER,
    payload : axios.get(`http://192.168.73.2:5000/hotelky/customers`,{
        headers : {"Authorization" : `Bearer ${token}`}
    })
})

export const addCustomer = (params) =>({
    type : types.ADDCUSTOMER,
    payload : axios.post(`http://192.168.73.2:5000/hotelky/customers/add`,params)
})

export const detailCustomer = (params,token) =>({
    type : types.DETAILCUSTOMER,
    payload : axios.get(`http://192.168.73.2:5000/hotelky/customers/detail/${params}`,{
        headers : {"Authorization" : `Bearer ${token}`}})
})

export const updateCustomer = (params) =>({
    type : types.UPDATECUSTOMER,
    payload : axios.put(`http://192.168.73.2:5000/hotelky/customers/edit/${params.id}`,{
        name : params.name,
        id_card : params.idCard,
        phone_number : params.phoneNumber
    })
})
