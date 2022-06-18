// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useState, useRef, useEffect} from 'react';
// import MapView, {Marker} from 'react-native-maps';
// import {fs, h, height, w} from '../../config';
// import CustomHeader from '../../components/CustomHeader';
// import MapViewDirections from 'react-native-maps-directions';
// import {colors} from '../../constants';
// import {useDispatch, useSelector} from 'react-redux';
// import axios from 'axios';
// import { loader } from '../../redux/actions/loader';

// const Map = ({navigation}) => {
//   const [mapLocation, setmapLocation] = useState({
//     pickupcords: {
//       latitude: 12.97194,
//       longitude: 77.532745,
//       latitudeDelta: 0.015,
//       longitudeDelta: 0.0121,
//     },
//     droplocationcords: {
//       latitude: 22.7377,
//       longitude: 75.8788,
//       latitudeDelta: 0.015,
//       longitudeDelta: 0.0121,
//     },
//   });

//   const dispatch = useDispatch()

//   useEffect(() => {
//     // setmapLocation({
//     //   pickupcords: {
//     //     latitude : currentLocationLatitude,
//     //     longitude : currentLocationLongitude,
//     //     latitudeDelta: 0.015,
//     //     longitudeDelta: 0.0121,
//     //   },
//     //   droplocationcords: {
//     //     latitude: destinationLocationLatitue,
//     //     longitude: destinationLocationLongitude,
//     //     latitudeDelta: 0.015,
//     //     longitudeDelta: 0.0121,
//     //   },
//     // })
//     axios
//         .get(
//           `http://tuketuke.azurewebsites.net/api/OrderDetails/GetDriverTrackingInOrder?Order_No=10051 `,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           },
//         )
//         .then(function (response) {
//            console.log('response--->>',response)
//           if (response.status == 200) {
//             if (response.data.status == 'Success') {
//               // signIn(response.data.data);
//               dispatch(loader(false));
//             }else{
//               dispatch(loader(false));
//             }
//           } else {
//             dispatch(loader(false));
//           }
//         })
//         .catch(function (error) {
//           console.log('error: ', error);
//           dispatch(loader(false));
//         });

//   }, [])

//   const currentLocationLatitude = useSelector(
//     state => state.locationReducer.data.latitude,
//   );
//   const currentLocationLongitude = useSelector(
//     state => state.locationReducer.data.longitude,
//   );

//   const destinationLocationLatitue = useSelector(
//     state => state.destinationLocationReducer.data.latitude,
//   );
//   const destinationLocationLongitude = useSelector(
//     state => state.destinationLocationReducer.data.longitude,
//   );

//   const mapRef = useRef();
//   const {pickupcords, droplocationcords} = mapLocation;
//   return (
//     <View style={{flex: 1}}>
//       <CustomHeader onPress={() => navigation.goBack()} text="Confirmation" />
//       <View style={{height: h(70)}}>
//         <MapView
//           // provider='AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464' // remove if not using Google Maps
//           ref={mapRef}
//           style={StyleSheet.absoluteFill}
//           region={pickupcords}>
//           <Marker coordinate={pickupcords} />
//           <Marker coordinate={droplocationcords}   />
//           <MapViewDirections
//             origin={pickupcords}
//             destination={droplocationcords}
//             apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
//             strokeWidth={7}
//             strokeColor={'blue'}
//             optimizeWaypoints={true}
//             onReady={result => {
//               mapRef.current.fitToCoordinates(result.coordinate, {
//                 edgePadding: {
//                   right: 530,
//                   bottom: 300,
//                   left: 530,
//                   top: 500,
//                 },
//               });
//             }}
//           />
//         </MapView>
//       </View>
//       <View
//         style={{
//           justifyContent: 'space-between',
//           flex: 1,
//           marginVertical: w(8),
//           alignItems: 'center',
//         }}>
//         <Text style={{fontSize: fs(16)}}>Location a suitable vehicle ...</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{color: 'black', fontSize: fs(17), fontWeight: '600'}}>
//             Cancel
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Map;

// const styles = StyleSheet.create({
//   map: {
//     width: '100%',
//     height: '95%',
//     marginTop: h(2),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
// });

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Geolocation from 'react-native-geolocation-service';
import {locationPermission} from '../../utils/helperFunctions/locationPermission';
import {loader} from '../../redux/actions/loader';
import {useContext} from 'react';
import {OrderContext} from '../../utils/context';
import {fs, h, w} from '../../config';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import LottieView from 'lottie-react-native';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({navigation}) => {
  const [orderData, setOrderData] = useContext(OrderContext);
  const [searching, setsearching] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setsearching(false);
    }, 5000);
  }, []);

  const mapRef = useRef();
  const markerRef = useRef();

  const [state, setState] = useState({
    curLoc: {
      latitude: orderData.Pick_Late,
      longitude: orderData.Pick_Long,
    },
    destinationCords: {
      latitude: orderData.destination_Late,
      longitude: orderData.destination_Long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: orderData.Pick_Late,
      longitude: orderData.Pick_Long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      console.log('get live location after 4 second', heading);
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude: orderData.Pick_Late, longitude: orderData.Pick_Long},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const animate = (latitude, longitude) => {
    const newCoordinate = {
      latitude: orderData.Pick_Late,
      longitude: orderData.Pick_Long,
    };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  return (
    <View style={styles.container}>
      {distance !== 0 && time !== 0 && (
        <View style={{alignItems: 'center', marginVertical: 16}}>
          <Text>Time left: {time.toFixed(0)} </Text>
          <Text>Distance left: {distance.toFixed(0)}</Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image
              source={require('../../assets/images/bike.png')}
              style={{
                width: 40,
                height: 40,
                transform: [{rotate: `${heading}deg`}],
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode="contain"
            />
          </Marker.Animated>

          {Object.keys(destinationCords).length > 0 && (
            <Marker
              coordinate={destinationCords}
              source={require('../../assets/images/greenMarker.png')}
            />
          )}

          {/* {Object.keys(destinationCords).length > 0 && ( */}
          <MapViewDirections
            origin={curLoc}
            destination={destinationCords}
            apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
            strokeWidth={3}
            strokeColor="red"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
              fetchTime(result.distance, result.duration),
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // right: 30,
                    // bottom: 300,
                    // left: 30,
                    // top: 100,
                  },
                });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
          {/* )} */}
        </MapView>
        {searching ? (
          <LottieView
            source={require('../../assets/lottie/searching.json')}
            autoPlay
            loop
            style={{position: 'absolute'}}
          />
        ) : null}

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          onPress={onCenter}>
          <Image source={require('../../assets/images/greenIndicator.png')} />
        </TouchableOpacity>
      </View>
      {searching ? (
        <View
          style={{
            padding: h(3),
            alignItems: 'center',
          }}>
          <Text style={{fontSize: fs(16)}}>
            Location a suitable vehicle ...
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: 'black',
                fontSize: fs(17),
                fontWeight: '600',
                marginTop: h(8),
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{padding: h(2)}}>
          <Text style={{fontSize: fs(17)}}>
            Order Confirmed, your driver is on the way!
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: h(2),
            }}>
            <Text>Order #29745</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: w(4),
              }}>
              <Image
                source={require('../../assets/images/userIcon.png')}
                style={{width: w(14), height: w(14)}}
              />
              <View style={{marginLeft: w(2)}}>
                <Text style={{fontSize: fs(17)}}>Vehicle number</Text>
                <Text style={{fontSize: fs(20), color: 'black'}}>NH25663</Text>
              </View>
            </View>
          </View>
          <Text>Driver's Tel: 08066997423</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default Map;
