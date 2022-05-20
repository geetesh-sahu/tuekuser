import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from '../constants/type';

const initialState = {
    data : null,
}


const signInReducer  = (state=initialState,action) => {
    switch(action.type){
        case SIGN_IN_REQUEST:
            return{
                ...state,
            };
        case  SIGN_IN_SUCCESS:
            return{
                ...state,
                data : action.payload,
            };
        case SIGN_IN_FAILURE : 
        return{
            ...state,
            data: action.payload
        };
        default: 
        return state;
    }
};
export default signInReducer
