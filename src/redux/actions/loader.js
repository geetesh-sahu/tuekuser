import { LOADER } from "../constants/type";
  
  export function loader(data) {
    return {
      type: LOADER,
      payload: data,
    };
  }