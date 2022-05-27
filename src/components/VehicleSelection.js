import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {images} from '../constants';
import {fs, h, w} from '../config';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image'

const VehicleSelection = props => {
  const {
    customViewStyle,
    customImageStyle,
    data,
    vehicledetail,
    vehicleContianer,
    opacityCallback,
  } = props;
  const [imageOpacity, setimageOpacity] = useState(true);
  const actualData = data ? data : [];

  const onPressOpacity = () => {
    setimageOpacity(!imageOpacity);
    opacityCallback(imageOpacity);
  };
  return (
    <View style={{height: h(32)}}>
      <Swiper
        nextButton = {<Ionicons name="chevron-forward" size={32} color="black" />}
        prevButton = {<Ionicons name="chevron-back" size={32} color="black" />}
        style={styles.wrapper}
        showsButtons={true}
        showsPagination={false}>
        {actualData &&
          actualData.map(item => {
          
            return (
              <View style={styles.slide1}>
                <TouchableOpacity
                  style={[customViewStyle, vehicleContianer]}
                  // onPress={onPressOpacity}
                >
                  <FastImage
                    source={{
                      uri: `https://driverfiles.blob.core.windows.net/driverfiles/${item.image_Url}`,
                    }}
                    style={[styles.flatlistImage, customImageStyle]}
                    resizeMode="cover"
                  />
                  <Text style={[styles.area, vehicledetail]}>
                    {item.vehicle_Weight} /{item.other_Specification}/{' '}
                    {item.vehicle_width}
                  </Text>
                
                </TouchableOpacity>
              </View>
            );
          })}
      </Swiper>
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
    marginLeft: h(10),
  },
  wrapper: {
   
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
