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

const DATA = [
  {
    image: images.vehicle_image,
    area: '500kg / 1.8*1.3*1.1cm / 2.6cbm',
    icon: <Ionicons name="chevron-forward" size={26} color="grey" />,
  },
  {
    image: images.vehicle_image,
    area: '500kg / 1.8*1.3*1.1cm / 2.6cbm',
    icon: <Ionicons name="chevron-forward" size={26} color="grey" />,
  },
  {
    image: images.vehicle_image,
    area: '500kg / 1.8*1.3*1.1cm / 2.6cbm',
    icon: <Ionicons name="chevron-forward" size={26} color="grey" />,
  },
];

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
    // <View
    //   style={{
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     paddingRight: w(6),
    //   }}>
    //   <FlatList
    //     data={data}
    //     // pagingEnabled={true}
    //     contentContainerStyle={{marginLeft: w(-15)}}
    //     horizontal={true}
    //     onEndReachedThreshold={82}
    //     showsHorizontalScrollIndicator={false}
    //     renderItem={({item}) => {
    //       return (
    //         // <View style={[styles.horizontalView]}>
    //         //   <TouchableOpacity
    //         //     style={[customViewStyle, vehicleContianer]}
    //         //     onPress={onPressOpacity}>
    //         //     <Image
    //         //       source={{uri: `data:image/jpg;base64,${item.imageFormat}`}}
    //         //       style={[styles.flatlistImage, customImageStyle]}
    //         //       resizeMode="contain"
    //         //     />
    //         //     <Text style={[styles.area, vehicledetail]}>
    //         //       {item.vehicle_Weight} /{item.other_Specification}/{' '}
    //         //       {item.vehicle_width}
    //         //     </Text>
    //         //   </TouchableOpacity>
    //         // </View>
    //         <Swiper style={styles.wrapper} showsButtons={true}>
    //         <View style={styles.slide1}>
    //           <Text style={styles.text}>Hello Swiper</Text>
    //         </View>
    //         <View style={styles.slide2}>
    //           <Text style={styles.text}>Beautiful</Text>
    //         </View>
    //         <View style={styles.slide3}>
    //           <Text style={styles.text}>And simple</Text>
    //         </View>
    //       </Swiper>
    //       );
    //     }}
    //   />

    // </View>

    <View style={{height: h(32)}}>
      <Swiper style={styles.wrapper} showsButtons={true} showsPagination={false}    >
        {actualData && actualData.map(item => {
          return (
            <View style={styles.slide1}>
                <TouchableOpacity
                  style={[customViewStyle, vehicleContianer]}
                  onPress={onPressOpacity}>
                  <Image
                    source={{uri: `data:image/jpg;base64,${item.imageFormat}`}}
                    style={[styles.flatlistImage, customImageStyle]}
                    resizeMode="contain"
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
    height: 160,
    alignSelf: 'center',
    marginVertical: h(3),
  },
  area: {
    marginLeft: h(6),
  },
  wrapper: {},
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
