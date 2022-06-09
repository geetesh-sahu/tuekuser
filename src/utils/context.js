import React, {createContext, useState} from 'react';
export const AuthContext = createContext();


export const OrderContext = React.createContext();
export const OrderContextProvider = props => {
  const [orderData, setOrderData] = useState({
    pickup_Date: '',
    pickup_Time: '',
    Pick_Late: '',
    Pick_Long: '',
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
