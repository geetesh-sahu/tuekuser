import {SIGN_IN_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS} from '../constants/type';
import { BASE_URL } from '../../constants';
import axios from 'axios';

export const signin = () => {
  return async dispatch => {
    dispatch({type:SIGN_IN_REQUEST });
    axios
    .post(`${BASE_URL}Login`)
    .then(async res => {
      if(!res.data.message.status){
        alert("wrong number")
        dispatch({type:SIGN_IN_FAILURE,Payload: {error :true}})
      }
   
    })
  }
}




