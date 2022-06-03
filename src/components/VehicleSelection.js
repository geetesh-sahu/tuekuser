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
  const {
    customViewStyle,
    customImageStyle,
    data,
    vehicledetail,
    vehicleContianer,
    opacityCallback,
    onScreenChange=()=>{},
  } = props;
  const vehicleL = useSelector(state => state.vehicleListReducer.vehicle.data);
  const actualData = vehicleL ? vehicleL : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicle());
  }, []);

  return (
    <View style={{height: h(32)}}>
      <Swiper
        style={{flex: 1}}
        currentSelectIndex={0}
        swipeData={actualData}
        renderSwipeItem={(item, index) => {
          return (
            <View style={styles.slide1}>
                <FastImage
                  source={{
                    uri: `https://driverfiles.blob.core.windows.net/driverfiles/${item.image_Url}`,
                  }}
                  style={[
                    styles.flatlistImage,
                    //  customImageStyle
                  ]}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    styles.area,
                    //  vehicledetail
                  ]}>
                  {item.vehicle_Weight} /{item.other_Specification}/{' '}
                  {item.vehicle_Type}
                </Text>
            </View>
          );
        }}
        onScreenChange={(index)=>onScreenChange(actualData[index])}
      />
    </View>
  );
};

export default VehicleSelection;

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: w(29),
  },
  flatlistImage: {
    width: 280,
    height: 130,
    alignSelf: 'center',
    marginVertical: h(3),
  },
  area: {
    textAlign:"center"
  },
  wrapper: {},
  slide1: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: w(100),
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
