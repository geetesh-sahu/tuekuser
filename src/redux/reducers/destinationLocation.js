import { DESTINATIONlOCATION } from "../constants/type";

  const initialState = {
    data: [],
  };
  const destinationLocationReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case DESTINATIONlOCATION:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  export default destinationLocationReducer;
  