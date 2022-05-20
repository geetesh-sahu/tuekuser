import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {images} from '../constants';
import {fs, h, w} from '../config';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

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
  
  const {customViewStyle, customImageStyle,data,vehicledetail,vehicleContianer} = props;

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight:w(6)
      }}>
      <FlatList
        data={data}
        // pagingEnabled={true}
        contentContainerStyle={{marginLeft:w(-15)}}
        horizontal={true}
        onEndReachedThreshold = {82}
        showsHorizontalScrollIndicator={false}
        renderItem={ ({item}) => {
          return (
            <View style={[styles.horizontalView]}>
              <TouchableOpacity style={[customViewStyle,vehicleContianer]} onPress={()=> alert('okkk')}>
                <Image
                  source={{uri: `data:image/jpg;base64,${item.imageFormat}`}}
                  style={[styles.flatlistImage, customImageStyle]}
                  resizeMode="cover"
                />
                <Text style={[styles.area,vehicledetail]}>{item.vehicle_Weight} /{item.other_Specification}/ {item.vehicle_width}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity>
        <Ionicons name="chevron-forward" size={26} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default VehicleSelection;

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
    flex:1,
    marginLeft:w(29),
   
  },
  flatlistImage: {
    width: 280,
    height: 160,
    alignSelf: 'center',
    marginVertical:h(3),

  },
  area: {
    marginLeft: h(6),
  },
});
