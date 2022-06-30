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
import {OrderContext, UserContext} from '../../utils/context';
import {fs, h, w} from '../../config';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({navigation}) => {
  const mapRef = useRef();
  const markerRef = useRef();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useContext(OrderContext);
  const [searching, setsearching] = useState(false);
  const [userData, setUserData] = useContext(UserContext);

  console.log('userData===>>', userData);

  const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const cords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            heading: position?.coords?.heading,
          };
          console;
          resolve(cords);
        },
        error => {
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
    });

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://tuketuke.azurewebsites.net/api/OrderDetails/GetDriverTrackingInOrder?Order_No=${10051} `,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )
  //     .then(function (response) {
  //       console.log('driver data>', response.data.data.driverLat);
  //       setdriverCoordinage({
  //         driverLattitue: response.data.data.driverLat,
  //         driverLongitue: response.data.data.driverLng,
  //       });
  //       if (response.status == 200) {
  //         if (response.data.status == 'Success') {
  //           // signIn(response.data.data);
  //           dispatch(loader(false));
  //         } else {
  //           dispatch(loader(false));
  //         };
  //       } else {
  //         dispatch(loader(false));
  //       };
  //     })
  //     .catch(function (error) {
  //       console.log('error: ', error);
  //       dispatch(loader(false));
  //     });
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setsearching(false);
    }, 5000);
  }, []);

  const [state, setState] = useState({
    curLoc: {
      latitude: 75.1263,
      longitude: 77.8852,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    destinationCords: {
      latitude: orderData.pick_Late,
      longitude: orderData.pick_Long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 75.1263,
      longitude: 77.8852,
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
    // getDriverLocation();
  }, []);

  const getDriverLocation = async () => {
    axios
      .get(
        `http://tuketuke.azurewebsites.net/api/OrderDetails/GetDriverTrackingInOrder?Order_No=${10051} `,
        {headers: {'Content-Type': 'application/json'}},
      )
      .then(async function (response) {
        if (response.status == 200) {
          if (response.data.status == 'Success') {
            const latitude = await response.data.data.driverLat;
            const longitude = await response.data.data.driverLng;
            animate(latitude, longitude);
            updateState({
              heading: heading,
              curLoc: {latitude, longitude},
              coordinate: new AnimatedRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }),
            });
            dispatch(loader(false));
          } else {
            dispatch(loader(false));
          }
        } else {
          dispatch(loader(false));
        }
      })
      .catch(function (error) {
        console.log('error: ', error);
        dispatch(loader(false));
      });

    // const latitude = orderData.pick_Late;
    // const longitude = orderData.pick_Long;
    // animate(latitude, longitude);
    // updateState({
    //   heading: heading,
    //   curLoc: {latitude, longitude},
    //   coordinate: new AnimatedRegion({
    //     latitude: latitude,
    //     longitude: longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA,
    //   }),
    // });

    // const locPermissionDenied = await locationPermission();
    // if (locPermissionDenied) {
    //   console.log('get live location after 4 second', heading);
    //   const latitude = orderData.pick_Late;
    //   const longitude = orderData.pick_Long;
    //   animate(latitude, longitude);
    //   updateState({
    //     heading: heading,
    //     curLoc: {latitude, longitude},
    //     coordinate: new AnimatedRegion({
    //       latitude: latitude,
    //       longitude: longitude,
    //       latitudeDelta: LATITUDE_DELTA,
    //       longitudeDelta: LONGITUDE_DELTA,
    //     }),
    //   });
    // }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDriverLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const animate = (latitude, longitude) => {
    const newCoordinate = {
      latitude: latitude,
      longitude: longitude,
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

  const onCancleOrder = (num, status) => {
    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/OrderDetails/UpdateOrderStatus',
        {
          order_No: orderData.order_No,
          order_StatuId: num,
          order_Status: status,
          driver_MobileNo: userData.mobile_No,
        },
      )
      .then(function ({data}) {
        console.log(data.data.order_Status);
        if (data) {
          if (data.data.order_Status == 'Order Canceled') {
            navigation.navigate('CurrentLocation');
          } else {
            // setOrderData('');
            // setIsOrderExist(false);
          }
        }
      })
      .catch(function (err) {
        // showMessage({
        //   message: `${err.response.status} ${err.response.statusText}`,
        //   type: 'warning',
        // });
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onCancleOrder(7, 'Order Canceled')}
        style={{alignItems: 'flex-end', padding: w(8)}}>
        <Text>Cancel order</Text>
      </TouchableOpacity>
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
              source={require('../../assets/images/bike.jpg')}
              style={{
                width: 40,
                height: 40,
                transform: [{rotate: `${heading}deg`}],
                // alignSelf: 'center',
                // justifyContent: 'center',
                // alignItems: 'center',
              }}
              resizeMode="contain"
            />
          </Marker.Animated>

          {/* {Object.keys(destinationCords).length > 0 && ( */}
          <Marker coordinate={destinationCords}>
            <Image source={require('../../assets/images/greenMarker.png')} />
          </Marker>
          {/* )} */}

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
