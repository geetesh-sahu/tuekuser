import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import {images} from '../../constants';
import {fs, h, w} from '../../config';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Avatar } from 'react-native-paper';


const Ongoing = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View style={{flex: 1, alignItems: 'center', marginTop: h(18)}}>
        <Image
          source={images.clip_board}
          style={{width: '40%', height: '30%'}}
        />
        <Text>No orders available at the moment</Text>
      </View> */}
      <View style={{flex: 1}}>
        <MapView
          //  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: h(5),
            alignItems:'center',
            marginHorizontal:w(5)
          }}>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
          <Avatar.Image size={38} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdWDzLOamaDu5EL-4RgpsPnSbE-xC-VvDyw&usqp=CAU'}} />
            <Text
              style={{color: '#414042', fontSize: fs(16), fontWeight: 'bold',marginLeft:w(2)}}>
              Mr. Donald Trump
            </Text>
          </View>
          <Text>New York M3598P</Text>
        </View>

        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Entypo name="dot-single" size={32} color="green" />
            <View style={styles.verticleLine} />
            <Entypo name="dot-single" size={32} color="red" />
          </View>
          <View style={styles.locationArea}>
            <View style={styles.horizontal}>
              <Text style={[styles.placeName, {marginBottom: h(1.5)}]}>
                New York University - North gate
              </Text>
            </View>
            <View style={[styles.horizontalLine]} />
            <View style={styles.horizontal}>
              <Text style={styles.placeName}>Women and Children Hospital</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: h(4),
            marginLeft: w(6),
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text
              style={{fontSize: fs(16), marginRight: w(1), color: '#414042'}}>
              Call Driver
            </Text>
            <Feather name="phone-call" size={14} color="black" />
          </View>
          <Text
            style={{marginLeft: w(22), color: '#414042', fontWeight: 'bold'}}>
            80866521489
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Ongoing;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '60%',
    marginTop: h(2),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: w(2),
    marginTop: h(3),
  },
  verticleLine: {
    height: h(3.5),
    width: 1,
    backgroundColor: 'black',
    marginVertical: h(-6),
  },
  placeName: {
    fontSize: fs(15),
    fontWeight: 'bold',
  },
});
