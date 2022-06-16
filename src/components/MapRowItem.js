import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {fs, h, w} from '../config';

const MapRowItem = props => {
  const {data} = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        
      }}>
      <View style={{flexDirection: 'row',alignItems:'center'}}>
        <View style={{flex: 1}}>
          <Ionicons name="ios-location-outline" size={16} color="grey" />
        </View>
        <View style={{flex: h(8), marginLeft: w(2), marginRight: w(5)}}>
          <Text
            style={{
              color: 'black',
              fontSize: fs(17),
              fontWeight: 'bold',
            }}>
            {data.structured_formatting.secondary_text}
          </Text>
          <Text>{data.description}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>5 km</Text>
        </View>
      </View>
    </View>
  );
};

export default MapRowItem;

const styles = StyleSheet.create({});
