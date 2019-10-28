import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,

    isAddLoading : false,
    isAddError : false,
    isAddSuccess : false,

    rooms: [],
    addRooms : [],
    roomsCheckin: [],
    roomsCheckOut: [],
    roomsDetail: [],
};

const  reducerGetRooms = (state=initialState,action) =>{
    switch(action.type){
        case `${types.ROOMS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.ROOMS}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                rooms: action.payload.data
            }
        case `${types.ROOMS}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
            case `${types.ADDROOMS}_PENDING`:
                return{
                    ...state,
                    isAddLoading: true
                }
            case `${types.ADDROOMS}_FULFILLED`:
                return{
                    ...state,
                    isAddLoading: false,
                    isAddSuccess: true,
                    addRooms: action.payload.data
                }
            case `${types.ADDROOMS}_REJECTED`:
                return{
                    ...state,
                    isAddError:true,
                    isAddLoading:false
                }
                case `${types.ROOMSCHECKIN}_PENDING`:
                    return{
                        ...state,
                        isAddLoading: true
                    }
                case `${types.ROOMSCHECKIN}_FULFILLED`:
                    return{
                        ...state,
                        isAddLoading: false,
                        isAddSuccess: true,
                        roomsCheckin: action.payload.data
                    }
                case `${types.ROOMSCHECKIN}_REJECTED`:
                    return{
                        ...state,
                        isAddError:true,
                        isAddLoading:false
                    }
                    case `${types.ROOMSCHECKOUT}_PENDING`:
                        return{
                            ...state,
                            isAddLoading: true
                        }
                    case `${types.ROOMSCHECKOUT}_FULFILLED`:
                        return{
                            ...state,
                            isAddLoading: false,
                            isAddSuccess: true,
                            roomsCheckOut: action.payload.data
                        }
                    case `${types.ROOMSCHECKOUT}_REJECTED`:
                        return{
                            ...state,
                            isAddError:true,
                            isAddLoading:false
                        }
                        case `${types.ROOMSUPDATE}_PENDING`:
                            return{
                                ...state,
                                isAddLoading: true
                            }
                        case `${types.ROOMSUPDATE}_FULFILLED`:
                            return{
                                ...state,
                                isAddLoading: false,
                                isAddSuccess: true,
                                roomsCheckOut: action.payload.data
                            }
                        case `${types.ROOMSUPDATE}_REJECTED`:
                            return{
                                ...state,
                                isAddError:true,
                                isAddLoading:false
                            }
                            case `${types.ROOMSDETAIL}_PENDING`:
                                return{
                                    ...state,
                                    isAddLoading: true
                                }
                            case `${types.ROOMSDETAIL}_FULFILLED`:
                                return{
                                    ...state,
                                    isAddLoading: false,
                                    isAddSuccess: true,
                                    roomsDetail: action.payload.data
                                }
                            case `${types.ROOMSDETAIL}_REJECTED`:
                                return{
                                    ...state,
                                    isAddError:true,
                                    isAddLoading:false
                                }
    default :
        return state;
    }

  }

export default reducerGetRooms