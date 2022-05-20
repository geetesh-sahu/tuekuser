import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useState,useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {fs, h, w} from '../../config';
import CustomHeader from '../../components/CustomHeader';
import MapViewDirections from 'react-native-maps-directions';

const Map = ({navigation}) => {
  const [mapLocation, setmapLocation] = useState({
    pickupcords: {
      latitude: 22.7244,
      longitude: 75.8839,
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

  const mapRef = useRef();
  const {pickupcords, droplocationcords} = mapLocation;
  return (
    <View style={{flex: 1}}>
      <CustomHeader onPress={() => navigation.goBack()} text="Confirmation" />

      <MapView
      // provider='AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464' // remove if not using Google Maps
      ref={mapRef}
      style={styles.map}
      region={pickupcords}>
      <Marker coordinate={pickupcords} />
      <Marker coordinate={droplocationcords} />
      <MapViewDirections
        origin={pickupcords}
        // destination={droplocationcords}
        apikey={'AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464'}
       
        // strokeWidth={8}
        // strokeColor="red"
        // optimizeWaypoints={true}
        // onReady={result => {
        //   mapRef.current.fitToCoordinates(result.coordinate, {
        //     edgePadding: {
        //       right: 30,
        //       bottom: 300,
        //       left: 30,
        //       top: 100,
        //     },
        //   });
        // }}
      />
    </MapView>
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
    height: '70%',
    marginTop: h(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// const Map = () => {
//   return (
//     <View>
//        <MapView

//        style={styles.map}
//        region={{
//          latitude: 37.78825,
//          longitude: -122.4324,
//          latitudeDelta: 0.015,
//          longitudeDelta: 0.0121,
//        }}
//      >
//      </MapView>
// </View>
//   )
// }

// export default Map

// const styles = StyleSheet.create({
//   map:{
//    width:'100%',
//    height:'90%'
//   }
// })
