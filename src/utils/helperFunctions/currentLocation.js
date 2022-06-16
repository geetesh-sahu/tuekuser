import React,{useState} from 'react'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';


Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');

export const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(async json => {
            const addressComponent = json.results[0].address_components;
            const addresCurrent = addressComponent[1].long_name;
            setaddress({
              Address: addresCurrent,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            const address = await getAddressObject(
              position.coords.latitude,
              position.coords.longitude,
              addresCurrent,
              addressComponent,
            );
            setOrderData({
              ...orderData,
              pick_City: address.city,
              Pick_Late: position.coords.latitude,
              Pick_Long: position.coords.longitude,
              pick_Location: address.street ? address.street : address.city,
              pick_Address: addresCurrent ? addresCurrent : address.city,
            });
            // dispatch({type: LOCATION, payload: address});
          })
          .catch(error => console.log('error===>>', error));
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };