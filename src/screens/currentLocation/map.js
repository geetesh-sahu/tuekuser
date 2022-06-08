// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   Image,
//   Dimensions,
// } from 'react-native';
// import React, {useState, useRef, useEffect} from 'react';
// import MapView, {Marker} from 'react-native-maps';
// import {fs, h, height, w} from '../../config';
// import CustomHeader from '../../components/CustomHeader';
// import MapViewDirections from 'react-native-maps-directions';
// import {colors} from '../../constants';
// import {useSelector} from 'react-redux';

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const Map = ({navigation}) => {
//   const [mapLocation, setmapLocation] = useState({
//     pickupcords: {
//       latitude: 12.97194,
//       longitude: 77.532745,
//     },
//     droplocationcords: {},
//   });

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

//   useEffect(() => {
//     setmapLocation({
//       ...mapLocation,
//       pickupcords: {
//         latitude: currentLocationLatitude,
//         longitude: currentLocationLongitude,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       },
//       droplocationcords: {
//         latitude: destinationLocationLatitue,
//         longitude: destinationLocationLongitude,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       },
//     });
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       console.log('git live location ');
//       setmapLocation({
//         ...mapLocation,
//         pickupcords: {
//           latitude: currentLocationLatitude,
//           longitude: currentLocationLongitude,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         },
//       });
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const mapRef = useRef();
//   const {pickupcords, droplocationcords} = mapLocation;
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <CustomHeader onPress={() => navigation.goBack()} text="Confirmation" />
//       <View style={{height: h(70)}}>
//         <MapView
//           // provider='AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464' // remove if not using Google Maps
//           ref={mapRef}
//           style={styles.map}
//           // region={{
//           //   ...mapLocation,
//           //   latitudeDelta: LATITUDE_DELTA,
//           //   longitudeDelta: LONGITUDE_DELTA,
//           // }}
//           initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           initialCamera={{
//             altitude: 15000,
//             center: {
//               latitude: 23.7603,
//               longitude: 90.4125,
//             },
//             heading: 0,
//             pitch: 0,
//             zoom: 11,
//           }}
//           region={pickupcords}>
//           <Marker coordinate={pickupcords}     >
//             <Image source={require("../../assets/images/flagImage.png")} />
//           </Marker>
//           {Object.keys(droplocationcords).length > 0 && (
//             <Marker coordinate={droplocationcords} />
//           )}

// {Object.keys(droplocationcords).length > 0 && (
//              <MapViewDirections
//              origin={pickupcords}
//              destination={droplocationcords}
//              apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
//              strokeWidth={7}
//              strokeColor={'blue'}
//              optimizeWaypoints={true}
//              onReady={result => {
//                mapRef.current.fitToCoordinates(result.coordinate, {
//                  edgePadding: {
//                   //  right: 530,
//                   //  bottom: 300,
//                   //  left: 530,
//                   //  top: 500,
//                  },
//                });
//              }}
//            />
//           )}

//         </MapView>
//       </View>
//       <View style={styles.footerBox}>
//         <Text style={{fontSize: fs(16)}}>Location a suitable vehicle ...</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.cancelBtn}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
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
//   cancelBtn: {
//     color: 'black',
//     fontSize: fs(17),
//     fontWeight: '600',
//   },
//   footerBox: {
//     justifyContent: 'space-between',
//     flex: 1,
//     marginVertical: w(8),
//     alignItems: 'center',
//   },
// });


import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {fs, h, height, w} from '../../config';
import CustomHeader from '../../components/CustomHeader';
import MapViewDirections from 'react-native-maps-directions';
import {colors} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { loader } from '../../redux/actions/loader';


const Map = ({navigation}) => {
  const [mapLocation, setmapLocation] = useState({
    pickupcords: {
      latitude: 12.97194,
      longitude: 77.532745,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    droplocationcords: {
      latitude: 22.7377,
      longitude: 75.8788,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  });

  const dispatch = useDispatch()

  useEffect(() => {
    // setmapLocation({
    //   pickupcords: {
    //     latitude : currentLocationLatitude,
    //     longitude : currentLocationLongitude,
    //     latitudeDelta: 0.015,
    //     longitudeDelta: 0.0121,
    //   },
    //   droplocationcords: {
    //     latitude: destinationLocationLatitue,
    //     longitude: destinationLocationLongitude,
    //     latitudeDelta: 0.015,
    //     longitudeDelta: 0.0121,
    //   },
    // })
    axios
        .get(
          `http://tuketuke.azurewebsites.net/api/OrderDetails/GetDriverTrackingInOrder?Order_No=10051 `,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(function (response) {
           console.log('response--->>',response)
          if (response.status == 200) {
            if (response.data.status == 'Success') {
              // signIn(response.data.data);
              dispatch(loader(false));
            }else{
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

  }, [])

  const currentLocationLatitude = useSelector(
    state => state.locationReducer.data.latitude,
  );
  const currentLocationLongitude = useSelector(
    state => state.locationReducer.data.longitude,
  );

  const destinationLocationLatitue = useSelector(
    state => state.destinationLocationReducer.data.latitude,
  );
  const destinationLocationLongitude = useSelector(
    state => state.destinationLocationReducer.data.longitude,
  );

  const mapRef = useRef();
  const {pickupcords, droplocationcords} = mapLocation;
  return (
    <View style={{flex: 1}}>
      <CustomHeader onPress={() => navigation.goBack()} text="Confirmation" />
      <View style={{height: h(70)}}>
        <MapView
          // provider='AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464' // remove if not using Google Maps
          ref={mapRef}
          style={styles.map}
          region={pickupcords}>
          <Marker coordinate={pickupcords} />
          <Marker coordinate={droplocationcords}   />
          <MapViewDirections
            origin={pickupcords}
            destination={droplocationcords}
            apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
            strokeWidth={7}
            strokeColor={'blue'}
            optimizeWaypoints={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinate, {
                edgePadding: {
                  right: 530,
                  bottom: 300,
                  left: 530,
                  top: 500,
                },
              });
            }}
          />
        </MapView>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          marginVertical: w(8),
          alignItems: 'center',
        }}>
        <Text style={{fontSize: fs(16)}}>Location a suitable vehicle ...</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: 'black', fontSize: fs(17), fontWeight: '600'}}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '95%',
    marginTop: h(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

