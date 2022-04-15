import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OtpField from '../../components/OtpField';
const OtpScreen = ({navigation}) => {
  const [resendOtp, setresendOtp] = useState(true);

  // setTimeout(() => {
  //   navigation.navigate('VehicleScreen');
  // }, 3000);

  return (
    <View style={styles.container}>
      <CustomHeader onPress={()=> navigation.goBack()} />
      <View style={{marginTop: 60}}>
        <View>
          <Image source={images.commonLogo} style={styles.appLogo} />
          <Text style={styles.heading}>Login to Tuketuke</Text>
        </View>
        <View style={styles.verificationTextView}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 12}}>
            Enter verification number
          </Text>
        </View>
        <View style={styles.otpView}>
          <OtpField />
          <OtpField />
          <OtpField />
          <OtpField />
        </View>
      </View>
      {resendOtp ? (
        <Text style={styles.sendOtp}>
          {`We will resend you verification code in (59)\nseconds`}
        </Text>
      ) : (
        <TouchableOpacity>
          <Text style={[styles.sendOtp, {color: 'red'}]}>Resend</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  appLogo: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 9,
  },
  sendOtp: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 25,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  verificationTextView: {
    alignItems: 'center',
    marginTop: 45,
    fontSize: 19,
    marginBottom: 12,
  },
  otpView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 300,
    alignSelf: 'center',
  },
});
