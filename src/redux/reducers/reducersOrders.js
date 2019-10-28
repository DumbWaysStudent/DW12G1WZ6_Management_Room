import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    orders: [],
    orderCheckOut: [],
    orderCheckIn: [],
};

export default  reducerOrders = (state=initialState,action) =>{
    switch(action.type){
        case `${types.ORDERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.ORDERS}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                orders: action.payload.data
            }
        case `${types.ORDERS}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.ORDERCHECKOUT}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.ORDERCHECKOUT}_FULFILLED`:
            return{
                ...state,
                    isLoading: false,
                    isSuccess: true,
                    orderCheckOut: action.payload.data
                }
        case `${types.ORDERCHECKOUT}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
            case `${types.ORDERCHECKIN}_PENDING`:
                return{
                    ...state,
                    isLoading: true
                }
            case `${types.ORDERCHECKIN}_FULFILLED`:
                return{
                    ...state,
                        isLoading: false,
                        isSuccess: true,
                        orderCheckOut: action.payload.data
                    }
            case `${types.ORDERCHECKIN}_REJECTED`:
                return{
                    ...state,
                    isError:true,
                    isLoading:false
                }
        default :
            return state;
    
    }
  }
