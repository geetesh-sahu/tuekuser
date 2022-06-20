import React, {useState, useContext} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {OrderContext} from '../context';

Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');

function getAddressObject(lat, lng, formatAddress, address_components) {
  var ShouldBeComponent = {
    home: ['street_number'],
    postal_code: ['postal_code'],
    street: ['street_address', 'route'],
    region: [
      'administrative_area_level_1',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'administrative_area_level_4',
      'administrative_area_level_5',
    ],
    city: [
      'locality',
      'sublocality',
      'sublocality_level_1',
      'sublocality_level_2',
      'sublocality_level_3',
      'sublocality_level_4',
    ],
    country: ['country'],
  };
  var address = {
    home: '',
    postal_code: '',
    street: '',
    region: '',
    city: '',
    country: '',
  };
  address_components.forEach(component => {
    for (var shouldBe in ShouldBeComponent) {
      if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
        address[shouldBe] = component.long_name;
      }
    }
  });
  return address;
}

export const getCurrentLocation = () => {
  const [orderData, setOrderData] = useContext(OrderContext);
  Geolocation.getCurrentPosition(
    position => {
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(async json => {
          const addressComponent = json.results[0].address_components;
          const addresCurrent = addressComponent[1].long_name;
          // setaddress({
          //   Address: addresCurrent,
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          // });
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
