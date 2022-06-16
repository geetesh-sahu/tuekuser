import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
// import FastImage from 'react-native-fast-image'

export default function MapAnnotation({
  event,
  select,
  presentBottomSheet,
  centerCamera,
  closeHosting,
  isSelected,
  navToEvent,
}) {
  const {id, location, category} = event;
  const {asset} = category;

  return (
    <MapboxGL.PointAnnotation
      key={id}
      id={id}
      coordinate={[location.x, location.y]}
      anchor={{x: 0.5, y: 0.5}}>
      <TouchableOpacity
        style={{
          zIndex: isSelected ? 1000 : 50,
          elevation: isSelected ? 1000 : 50,
        }}
        onPress={select}>
        <View
          style={{alignItems: 'center', marginTop: isSelected ? 'auto' : 'auto', 
          borderColor: isSelected ? '#9701F2' : '#CCC'}}>
          <View
            style={[
              styles.annotationWrapper,
              {
                height: isSelected ? 60 : 50,
                width: isSelected ? 60 : 50,
                borderRadius: isSelected ? 30 : 25,
                backgroundColor: 'rgba(91, 90, 92, 0.8)',
              },
            ]}>
            <View
              style={[
                styles.annotationContainer,
                {
                  height: isSelected ? 57 : 48,
                  width: isSelected ? 57 : 48,
                  borderRadius: isSelected ? 29 : 24,
                },
              ]}>
              <Image
                style={{
                  height: isSelected ? 40 : 35,
                  width: isSelected ? 40 : 35,
                }}
                resizeMode="contain"
                source={{
                  uri: `https://api.roamy.io/assets/${asset}`,
                  // priority: Image.priority.high,
                  // cache: Image.cacheControl.immutable
                }}
              />
            </View>
          </View>
          {isSelected && <View style={styles.emptyView}></View>}
        </View>
      </TouchableOpacity>
    </MapboxGL.PointAnnotation>
  );
}

const styles = StyleSheet.create({
  annotationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: '#9701F2',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  annotationContainer: {
    borderRadius: 24,
    height: 48,
    width: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyView: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#9701F2',
    marginTop: 5,
  },
});