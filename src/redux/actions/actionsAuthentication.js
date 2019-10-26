import * as types from './../types'
import axios from 'axios'

export const login = (inputUsername,inputPassword) => ({
    type : types.LOGIN,
    payload : axios.post('http://192.168.73.2:5000/hotelky/login',{
        email : inputUsername,
        password : inputPassword
    })
})