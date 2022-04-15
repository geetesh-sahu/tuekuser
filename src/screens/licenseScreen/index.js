import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonImagePicker from '../../components/CommonImagePicker';
import {fs, h, w} from '../../config';
import CustomHeader from '../../components/CustomHeader';
const LicenseScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
      <Text style={styles.textStyle}>
        {`Take photo of your\nDrivin License`}
      </Text>
      <Text
        style={
          styles.text2Style
        }>{`Please make sure all the information is accurate\nand the whole driving license is clearly visible in\nthe picture with all 4 corners shown.`}</Text>

      <CommonImagePicker
        isFilled={true}
        onPress={() => navigation.navigate('ProfileScreen')}
        imageStyle={styles.image}
      />
    </View>
  );
};

export default LicenseScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: fs(20),
    color: 'black',
    marginTop: h(2),
    fontWeight: 'bold',
    marginBottom: w(3),
    marginLeft: w(10),
  },
  text2Style: {
    marginTop: h(4),
    alignSelf: 'center',
    marginBottom: h(4),
  },
  image: {
    width: w(70),
    height: h(25),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
});
