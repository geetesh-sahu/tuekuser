import {StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import React, {useContext, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen/index';
import WelcomeScreen from '../screens/welcomeScreen';
import LoginScreen from '../screens/loginScreen';
import OtpScreen from '../screens/otpScreen/index';
import CurrentLocation from '../screens/currentLocation';
import PickupLocation from '../screens/currentLocation/pickupLocation';
import LoginWithNumber from '../screens/loginScreen/loginWithNumber';
import PickupTime from '../screens/currentLocation/pickupTime';
import SelectVehicle from '../screens/selectVehicle';
import Payment from '../screens/payment';
import Map from '../screens/currentLocation/map';
import Orders from '../screens/orders';
import Ongoing from '../screens/orders/ongoing';
import Completed from '../screens/orders/completed';
import Cancelled from '../screens/orders/cancelled';
import Invoice from '../screens/invoice';
import Wallet from '../screens/wallet';
import AddFund from '../screens/addFund';
import Coupon from '../screens/Coupon';
import Settings from '../screens/settings';
import HelpCenter from '../screens/helpCenter';
import FeedBack from '../screens/feedBack';
import {AuthContext, OrderContext, UserContext} from '../utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import DriverDetials from '../screens/driverDetails';
import {navigationRef} from './RootNavigation';
import axios from 'axios';
import {loader} from '../redux/actions/loader';

const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Auth.Screen name="LoginWithNumber" component={LoginWithNumber} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="OtpScreen" component={OtpScreen} />
    </Auth.Navigator>
  );
};

const StackNavigator = () => {
  const [orderData, setOrderData] = useContext(OrderContext);


  if (orderData && orderData.order_No) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="CurrentLocation" component={CurrentLocation} />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: true}}
        />
        <Stack.Screen name="PickupLocation" component={PickupLocation} />
        <Stack.Screen name="PickupTime" component={PickupTime} />
        <Stack.Screen name="SelectVehicle" component={SelectVehicle} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Ongoing" component={Ongoing} />
        <Stack.Screen name="Completed" component={Completed} />
        <Stack.Screen name="Cancelled" component={Cancelled} />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="AddFund" component={AddFund} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} />
        <Stack.Screen name="FeedBack" component={FeedBack} />

        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="DriverDetials" component={DriverDetials} />
        </Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CurrentLocation" component={CurrentLocation} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: true}}
        />
        <Stack.Screen name="PickupLocation" component={PickupLocation} />
        <Stack.Screen name="PickupTime" component={PickupTime} />
        <Stack.Screen name="SelectVehicle" component={SelectVehicle} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Ongoing" component={Ongoing} />
        <Stack.Screen name="Completed" component={Completed} />
        <Stack.Screen name="Cancelled" component={Cancelled} />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="AddFund" component={AddFund} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} />
        <Stack.Screen name="FeedBack" component={FeedBack} />

        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="DriverDetials" component={DriverDetials} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
};

const StackNavigation = () => {
  const {loading} = useSelector(state => state.loaderReducer);
  const [userData, setUserData] = useContext(UserContext);
  const [orderData, setOrderData] = useContext(OrderContext);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
    },
  );

  useEffect(() => {
    tokenUser();
  }, []);

  const tokenUser = async () => {
    var userToken = null;
    try {
      userToken = await EncryptedStorage.getItem('user_session');
      const userData = await EncryptedStorage.getItem('@userData');
      if (userToken && userData) {
        setUserData(JSON.parse(userData));
        axios
          .get(
            `http://tuketuke.azurewebsites.net/api/OrderDetails/UserActiveOrderDetails?Mobile_No=${
              JSON.parse(userData).mobile_No
            } `,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then(async function (response) {
          console.log('response: ', response);
            if (response.status == 200) {
              console.log('response.data: ', response.data);
              if (response.data.status == 'Success') {
                await setOrderData(response.data.data);
                dispatch({type: 'RESTORE_TOKEN', token: userToken});
              } else {
                dispatch({type: 'RESTORE_TOKEN', token: userToken});
              }
            } else {
              dispatch({type: 'RESTORE_TOKEN', token: userToken});
            }
          })
          .catch(function (error) {
            console.log('error: ', error);
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
          });
      }else{
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      }
      // setTimeout(() => {
      //   dispatch({type: 'RESTORE_TOKEN', token: userToken});
      // }, 2000);
    } catch (error) {
      showMessage({
        message: `${err.response.status} ${err.response.statusText}`,
        type: 'warning',
      });
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async res => {
        const token = res.id;
        setUserData(res);
        await EncryptedStorage.setItem('user_session', token);
        await EncryptedStorage.setItem('@userData', JSON.stringify(res));
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            <>
              <Auth.Screen name="SplashScreen" component={SplashScreen} />
            </>
          ) : state.userToken == null ? (
            <Auth.Screen name="AuthNavigator" component={AuthNavigator} />
          ) : (
            <Auth.Screen name="StackNavigator" component={StackNavigator} />
          )}
        </Stack.Navigator>
        {loading && (
          <ActivityIndicator
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            size="large"
            color="black"
          />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
