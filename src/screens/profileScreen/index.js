import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonImagePicker from '../../components/CommonImagePicker';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'lightgrey'}}>
      <CustomHeader  onPress={()=>navigation.goBack()} />
      <Text style={styles.heading}>Take your profile photo</Text>
      <View style={styles.textStyle}>
        <Text>{`Your profile photo helps people recognize you\n1. Face the camera directly with your eyes\nand mouth clearly visible\n\n2. Make sure the photo is not dark and is in focus.`}</Text>
      </View>
      <CommonImagePicker imageStyle={styles.image} onPress={()=>navigation.navigate("MapScreen")} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: fs(20),
    color: 'black',
    marginTop: h(2),
    fontWeight: 'bold',
    marginBottom: w(3),
    marginLeft: w(10),
  },
  textStyle: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: h(4),
  },
  image: {
    width: w(85),
    height: h(30),
    alignSelf: 'center',
  },
});
