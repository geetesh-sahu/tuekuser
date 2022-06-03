import { VEHICLE_LIST } from "../constants/type";
  const initialState = {
    vehicle: [],
    
  };

  const vehicleListReducer = (state = initialState, action) => {
    switch (action.type) {
      case VEHICLE_LIST:
        return {
          ...state,
          vehicle: action.payload,
        };
      default:
        return state;
    }
  };
  export default vehicleListReducer;
  