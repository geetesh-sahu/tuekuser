import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonImagePicker from '../../components/CommonImagePicker';

const VehiclePicture = ({navigation}) => {

  return (
    <View style={styles.container}>
      <CustomHeader  onPress={()=>navigation.goBack()} />
      <Text style={styles.textStyle}>Take photo of your vehicle</Text>

      <Text
        style={
          styles.subheading
        }>{`Please make sure the license plate of your\nvehicle is showing clearly in this photo`}</Text>

      <CommonImagePicker isFilled={true} onPress={()=>navigation.navigate("LicenseScreen")} />
    </View>
  );
};

export default VehiclePicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  textStyle: {
    fontSize: fs(22),
    color: 'black',
    alignSelf: 'center',
    marginTop: h(2),
    fontWeight: 'bold',
    marginBottom: w(3),
  },
  subheading: {
    marginTop: 33,
    alignSelf: 'center',
    marginBottom: h(5),
    
  },
});
