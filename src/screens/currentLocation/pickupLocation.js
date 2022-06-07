import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {images} from '../../constants';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {DESTINATIONlOCATION, LOCATION} from '../../redux/constants/type';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {OrderContext} from '../../utils/context';

Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');
const PickupLocation = props => {
  const dispatch = useDispatch();
  const [hasLocationPermission, sethasLocationPermission] = useState(true);
  const [orderData, setOrderData] = useContext(OrderContext);
  const [address, setaddress] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Lagos', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
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

  const locationHandler = async (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const formatAddress = details.formatted_address;
    const destinationLocation = details.address_components[0].long_name;
    const address = await getAddressObject(
      lat,
      lng,
      formatAddress,
      details.address_components,
    );
    setOrderData({
      ...orderData,
      destination_Late: lat,
      destination_Long: lng,
      destiNation_City: address.city,
      destination_Address: address.street ? address.street : formatAddress,
      destination_Location: formatAddress ? formatAddress : address.street,
    });

    dispatch({
      type: DESTINATIONlOCATION,
      payload: {
        cityName: destinationLocation,
        fullAddress: formatAddress,
        latitude: lat,
        longitude: lng,
      },
    });
    props.navigation.navigate('CurrentLocation');
  };

  const userCurrentLocation = () => {
    showMessage({
      message: 'Simple message',
      type: 'info',
    });
    dispatch({type: LOCATION, payload: address});
    props.navigation.navigate('CurrentLocation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        onPress={() => props.navigation.goBack()}
        text="Pickup location"
      />
      <View style={styles.box}>
        <View style={{marginLeft: w(-4)}}>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={styles.box2}>
          <View style={{alignItems: 'center'}}>
            <Ionicons name="ios-location-outline" size={22} color="red" />
            <View style={styles.verticleLine} />
            <Image source={images.flag_image} style={{marginLeft: w(4.1)}} />
          </View>
          <View style={{}}>
            <TouchableOpacity onPress={userCurrentLocation}>
              <Text style={styles.placeName}>Use current location</Text>
            </TouchableOpacity>
            <View style={styles.address}>
              <GooglePlacesAutocomplete
                placeholder="Enter your address"
                fetchDetails={true}
                query={{
                  key: 'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464',
                  language: 'en', // language of the results
                }}
                onPress={locationHandler}
                onFail={error => console.error(error)}
                requestUrl={{
                  url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                  useOnPlatform: 'web',
                }}
                styles={{
                  textInputContainer: {
                    width: w(52),
                  },
                  textInput: {
                    backgroundColor: 'transparent',
                  },
                  listView: {
                    marginLeft: w(-32),
                    width: w(100),
                    marginTop: h(2),
                  },
                  row: {
                    fontSize: fs(22),
                    color: 'pink',
                  },
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PickupLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
  verticleLine: {
    height: h(5),
    width: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeName: {
    fontSize: fs(18),
    fontWeight: 'bold',
    color: '#f66820',
    marginLeft: w(2),
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: w(5),
  },
  box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: h(4),
    flex: 1,
  },
  dropdown: {
    width: w(28),
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    paddingLeft: w(9),
  },
  box2: {
    marginTop: h(2.2),
    marginLeft: w(0),
    flexDirection: 'row',
  },
  address: {
    marginTop: h(2.5),
    height: h(80),
    marginLeft: w(0),
  },
});
