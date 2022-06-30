import React, {createContext, useState} from 'react';
export const AuthContext = createContext();


export const OrderContext = React.createContext();
export const OrderContextProvider = props => {
  const [orderData, setOrderData] = useState({
    // "pickup_Date": "2022-06-29T10:45:48.237Z",
    // "pickup_Time": "string",
    // "pick_Location": "string",
    // "pick_Address": "string",
    // "pick_Late": 0,
    // "pick_Long": 0,
    // "pick_City": "string",

    pickup_Date: '',
    pickup_Time: '',
    pick_Late: '',
    pick_Long: '',
    pick_Location: '',
    pick_Address: '',
    pick_City: '',
    destination_Late: '',
    destination_Long: '',
    destiNation_City: '',
    destination_Address: '',
    destination_Location: '',
    vehicle_ID: '',
    reciver_Name: '',
    reciver_MobileNo: '',
    user_MobileNo: '',
    estimated_Cost: '',
    distance:'',
  });
  return (
    <OrderContext.Provider value={[orderData, setOrderData]}>
      {props.children}
    </OrderContext.Provider>
  );
};


export const UserContext = React.createContext();
export const UserProvider = props => {
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};
