import { LOCATION } from "../constants/type";

  const initialState = {
    data: [],
  };
  const locationReducer = (state = initialState, action) => {
     
    switch (action.type) {
      case LOCATION:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  export default locationReducer;
  