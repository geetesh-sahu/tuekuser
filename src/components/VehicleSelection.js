import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {h, w} from '../config';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-custom-swiper';
import {getVehicle} from '../redux/actions/vehicleList';

const VehicleSelection = props => {
  const {uiType = false, onScreenChange = () => {}} = props;
  const vehicleL = useSelector(state => state.vehicleListReducer.vehicle.data);
  const actualData = vehicleL ? vehicleL : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicle());
  }, []);

  return (
    // <View style={{height: h(32)}}>
    <Swiper
      style={{flex: 1}}
      currentSelectIndex={0}
      swipeData={actualData}
      leftButtonImage={require('../assets/images/backwardIcon.png')}
      rightButtonImage={require('../assets/images/forwardIcon.png')}
      //  showSwipeBtn={false}
      renderSwipeItem={(item, index) => {
        if (uiType) {
          return (
            <View style={styles.horizontalView}>
              <FastImage
                source={{
                  uri: `https://driverfiles.blob.core.windows.net/driverfiles/${item.image_Url}`,
                }}
                style={[
                  styles.horizontalImage,
                  //  customImageStyle
                ]}
                resizeMode="cover"
              />
              <Text
                style={[
                  styles.area,
                  //  vehicledetail
                ]}>
                {item.vehicle_Type} {item.other_Specification}{' '}
                {item.vehicle_Weight}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.slide1}>
               <Text style={styles.slide}>Slide to select vehicle</Text>
              <FastImage
                source={{
                  uri: `https://driverfiles.blob.core.windows.net/driverfiles/${item.image_Url}`,
                }}
                style={[
                  styles.flatlistImage,
               
                ]}
                resizeMode="cover"
              />
              <Text
                style={[
                  styles.area,
                ]}>
                {item.vehicle_Type} /{item.other_Specification}/{' '}
                {item.vehicle_Weight}
              </Text>
            </View>
          );
        }
      }}
      onScreenChange={index => onScreenChange(actualData[index])}
    />
    // </View>
  );
};

export default VehicleSelection;

const styles = StyleSheet.create({
  flatlistImage: {
    width: 280,
    height: 130,
    alignSelf: 'center',
    marginVertical: h(1),
  },
  horizontalImage: {
    width: 180,
    height: 130,
    alignSelf: 'center',
    marginVertical: h(3),
  },
  area: {},
  wrapper: {},
  slide1: {
    alignItems: 'center',
   
    width:'100%',
    height:300,
    justifyContent:'center'
  },
  horizontalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: w(30),
    flexDirection: 'row',
    height: h(16),
    marginRight: w(3),
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
