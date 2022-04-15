import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {h} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader onPress={()=> navigation.goBack()} />
      <View style={{marginTop: 60}}>
        <View>
          <Image source={images.commonLogo} style={styles.appLogo} />
          <Text style={styles.heading}>Login to Tuketuke</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.fieldName}>Enter your number</Text>
        </View>
        <CommonInputField />
      </View>
      <Text style={styles.otpSendText}>
        {' '}
        We will send you verification to this number
      </Text>
      <CommonBtn text="Confirm" onPress={()=>navigation.navigate("OtpScreen")} />
      <TouchableOpacity onPress={()=>navigation.navigate("LoginWithPassword")}>
      <Text style={styles.passwordText}>Login with a password </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  appLogo: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 9,
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
  inputFieldContainer: {
    alignItems: 'center',
    marginTop: 28,
    fontSize: 19,
    marginBottom: 12,
  },
  fieldName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpSendText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  passwordText: {
    alignSelf:"center",
    marginTop: 22,
    fontSize: 16,
  },
});
