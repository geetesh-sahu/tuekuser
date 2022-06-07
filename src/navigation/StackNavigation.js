import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
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
import {AuthContext, UserContext} from '../utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();

const StackNavigation = () => {
  const {loading} = useSelector(state => state.loaderReducer);
  const [userData, setUserData] = useContext(UserContext);

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
      if (userToken) {
        setUserData(JSON.parse(userData));
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    } catch (error) {
      console.log('error==>>', error);
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async res => {
        const token = res.id;
        setUserData(res.data);
        await EncryptedStorage.setItem('user_session', token);
        await EncryptedStorage.setItem('@userData', JSON.stringify(res));
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            <>
              <Auth.Screen name="SplashScreen" component={SplashScreen} />
            </>
          ) : state.userToken == null ? (
            <>
              <Auth.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Auth.Screen name="LoginWithNumber" component={LoginWithNumber} />
              <Auth.Screen name="LoginScreen" component={LoginScreen} />
              <Auth.Screen name="OtpScreen" component={OtpScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="CurrentLocation"
                component={CurrentLocation}
              />
              <Stack.Screen
                name="Orders"
                component={Orders}
                options={{headerShown: true}}
              />

              {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}

              <Stack.Screen name="PickupLocation" component={PickupLocation} />

              <Stack.Screen name="PickupTime" component={PickupTime} />
              <Stack.Screen name="SelectVehicle" component={SelectVehicle} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="Map" component={Map} />
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
              {/* <Stack.Screen name="PayStack" component={PayStack} /> */}
            </>
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
