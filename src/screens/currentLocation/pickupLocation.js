import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
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

Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');
const PickupLocation = props => {
  const dispatch = useDispatch();
  const [hasLocationPermission, sethasLocationPermission] = useState(true);

  const [address, setaddress] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Lagos', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log('position', position);
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
              console.log('json===>>', json);
              const addressComponent = json.results[0].address_components;
              const addresCurrent = addressComponent[1].long_name;
              setaddress({
                Address: addresCurrent,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              // dispatch({type: LOCATION, payload: address});
            })
            .catch(error => console.log('error===>>', error));
        },
        error => {
          +console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, []);

  const locationHandler = (data, details) => {
    console.log('details====>>>>', details.geometry.location);

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const formatAddress = details.formatted_address;
    const destinationLocation = details.address_components[0].long_name;
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
    <View style={styles.container}>
      <CustomHeader
        onPress={() => props.navigation.goBack()}
        text="Pickup location"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: h(4),
          flex: 1,
        }}>
        <View style={{marginLeft: w(-4)}}>
          <DropDownPicker
            style={{
              width: w(28),
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              paddingLeft: w(9),
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View
          style={{marginTop: h(2.2), marginLeft: w(-2), flexDirection: 'row'}}>
          <View style={{alignItems: 'center'}}>
            <Ionicons name="ios-location-outline" size={22} color="red" />
            <View style={styles.verticleLine} />
            <Image source={images.flag_image} style={{marginLeft: w(3)}} />
          </View>
          <View style={{}}>
            <TouchableOpacity onPress={userCurrentLocation}>
              <Text style={styles.placeName}>Use current location</Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: h(2.5),
                height: h(80),
                marginLeft: w(-1),
              }}>
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
    </View>
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
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: w(5),
  },
});
