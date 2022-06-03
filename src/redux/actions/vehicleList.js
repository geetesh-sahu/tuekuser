import { VEHICLE_LIST } from "../constants/type";
import { BASE_URL } from "../../constants";
import axios from "axios";
import {VHICLELIST} from '../../utils/apiEndPoints'



export const getVehicle = () => {
    try{
     return async dispatch => {
      const result =  await fetch(`${BASE_URL}VehicleList/VehicleList`,{
          method:'GET',
          headers: {
              'Content-type': 'application/json',
          }
      });
      const json = await result.json();
      
      if(json){
            dispatch({
                type:VEHICLE_LIST,
                payload:json
            })
      }else{
          console.log('unable to fetch')
      }
     }
    }catch(error){
        console.log('error',error)
    }
}