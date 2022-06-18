import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
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
import MapRowItem from '../../components/MapRowItem';

Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');
const PickupLocation = ({navigation, route}) => {
  const {ulocation} = route?.params;


  const ref = useRef();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useContext(OrderContext);
  const [isHeader, setIsHeader] = useState(true);

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
    if (ulocation == 'Pickup address') {
      setOrderData({
        ...orderData,
        Pick_Late: lat,
        Pick_Long: lng,
        pick_City: address.city,
        pick_Address: address.street ? address.street : formatAddress,
        pick_Location: formatAddress ? formatAddress : address.street,
      });
    } else if (ulocation == 'Destination address') {
      setOrderData({
        ...orderData,
        destination_Late: lat,
        destination_Long: lng,
        destiNation_City: address.city,
        destination_Address: address.street ? address.street : formatAddress,
        destination_Location: formatAddress ? formatAddress : address.street,
      });
    }
    navigation.navigate('CurrentLocation');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isHeader && (
        <CustomHeader onPress={() => navigation.goBack()} text={ulocation} />
      )}
      <View style={styles.address}>
        <GooglePlacesAutocomplete
          ref={ref}
          renderRow={(data, index) => {
            return (
              <View>
                <MapRowItem data={data} />
              </View>
            );
          }}
          enablePoweredByContainer={false}
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
              width: w(100),
            },
            textInput: {
              backgroundColor: 'transparent',
            },
          }}
        />
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






// import React, {useState, useContext, useRef} from 'react';
// import {
//   StyleSheet,
//   View,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import CustomHeader from '../../components/CustomHeader';
// import {fs, h, w} from '../../config';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import Geocoder from 'react-native-geocoding';
// import {OrderContext} from '../../utils/context';
// import MapRowItem from '../../components/MapRowItem';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// import Entypo from 'react-native-vector-icons/dist/Entypo';

// Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');
// const PickupLocation = ({navigation, route}) => {
//   const {ulocation} = route?.params;
//   const clearLocation = useRef();
  
//   const dispatch = useDispatch();
//   const [orderData, setOrderData] = useContext(OrderContext);
//   const [isHeader, setIsHeader] = useState(true);

//   const _clearLocation = () => {
//     clearLocation?.current?.clear()
//   };

//   function getAddressObject(lat, lng, formatAddress, address_components) {
//     var ShouldBeComponent = {
//       home: ['street_number'],
//       postal_code: ['postal_code'],
//       street: ['street_address', 'route'],
//       region: [
//         'administrative_area_level_1',
//         'administrative_area_level_2',
//         'administrative_area_level_3',
//         'administrative_area_level_4',
//         'administrative_area_level_5',
//       ],
//       city: [
//         'locality',
//         'sublocality',
//         'sublocality_level_1',
//         'sublocality_level_2',
//         'sublocality_level_3',
//         'sublocality_level_4',
//       ],
//       country: ['country'],
//     };
//     var address = {
//       home: '',
//       postal_code: '',
//       street: '',
//       region: '',
//       city: '',
//       country: '',
//     };
//     address_components.forEach(component => {
//       for (var shouldBe in ShouldBeComponent) {
//         if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
//           address[shouldBe] = component.long_name;
//         }
//       }
//     });
//     return address;
//   }

//   const locationHandler = async (data, details) => {
//     console.log('details---->>>', details.formatted_address);
//     const lat = details.geometry.location.lat;
//     const lng = details.geometry.location.lng;
//     const formatAddress = details.formatted_address;
//     const destinationLocation = details.address_components[0].long_name;
//     const address = await getAddressObject(
//       lat,
//       lng,
//       formatAddress,
//       details.address_components,
//     );
//     if (ulocation == 'Enter Your Pickup Address') {
//       setOrderData({
//         ...orderData,
//         Pick_Late: lat,
//         Pick_Long: lng,
//         pick_City: address.city,
//         pick_Address: address.street ? address.street : formatAddress,
//         pick_Location: formatAddress ? formatAddress : address.street,
//       });
//     } else if (ulocation == 'Enter Your Destination Address') {
//       setOrderData({
//         ...orderData,
//         destination_Late: lat,
//         destination_Long: lng,
//         destiNation_City: address.city,
//         destination_Address: address.street ? address.street : formatAddress,
//         destination_Location: formatAddress ? formatAddress : address.street,
//       });
//     }
//     navigation.navigate('CurrentLocation');
//   };



//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.address}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons
//             name="chevron-back"
//             size={30}
//             color="black"
//             style={{position: 'absolute', marginTop: h(0.9), marginLeft: w(3)}}
//           />
//         </TouchableOpacity>
//         <GooglePlacesAutocomplete
//           ref={clearLocation}
//           renderRow={(data, index) => {
//             return (
//               <View>
//                 <MapRowItem data={data} />
//               </View>
//             );
//           }}
//           enablePoweredByContainer={false}
//           placeholder={`Enter Your ${ulocation}`}
//           fetchDetails={true}
//           query={{
//             key: 'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464',
//             language: 'en', // language of the results
//           }}
//           onPress={locationHandler}
//           onFail={error => console.error(error)}
//           requestUrl={{
//             url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
//             useOnPlatform: 'web',
//           }}
//           styles={{
//             textInputContainer: {
//               width: w(100),
              
//             },
//             textInput: {
//               backgroundColor: 'transparent',
//               marginLeft: w(15),
//               fontSize: fs(23),
//             },
//           }}
//         />
//         <TouchableOpacity
//           onPress={_clearLocation}
//           style={{position: 'absolute', left: w(90), marginTop: h(2)}}>
//           <Entypo name="circle-with-cross" size={17} color="gray" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PickupLocation;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10,
//     backgroundColor: '#ecf0f1',
//   },
//   verticleLine: {
//     height: h(5),
//     width: 1,
//     backgroundColor: 'black',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   placeName: {
//     fontSize: fs(18),
//     fontWeight: 'bold',
//     color: '#f66820',
//     marginLeft: w(2),
//   },

//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginRight: w(5),
//   },
//   box: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: h(4),
//     flex: 1,
//   },
//   dropdown: {
//     width: w(28),
//     borderColor: 'transparent',
//     backgroundColor: 'transparent',
//     paddingLeft: w(9),
//   },
//   box2: {
//     marginTop: h(2.2),
//     marginLeft: w(0),
//     flexDirection: 'row',
//   },
//   address: {
//     marginTop: h(2.5),
//     height: h(80),
//     marginLeft: w(0),
//     flexDirection: 'row',
//   },
// });

