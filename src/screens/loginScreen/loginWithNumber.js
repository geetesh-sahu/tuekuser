import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {h, w, fs} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginWithNumber = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
      <View style={{marginTop: 60}}>
        <View>
          <Image source={images.commonLogo} style={styles.appLogo} />
          <Text style={styles.heading}>Login to Tuketuke</Text>
        </View>
      </View>
      <View style={{marginTop: h(6)}}>
        <Text style={styles.number}>997****335</Text>
      </View>
      <CommonBtn
        text="Login with this number"
        // onPress={() => navigation.navigate('CurrentLocation')}
        customBtnStyle={styles.loginBtn}
      />
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.passwordText}>Login with a different number </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginWithNumber;

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
    alignSelf: 'center',
    marginTop: h(4),
    fontSize: fs(17),
    fontWeight: 'bold',
  },
  loginBtn: {
    width: w(85),
    padding: 11,
    marginTop: h(6),
  },
  number: {
    alignSelf: 'center',
    fontSize: fs(27),
    color: 'black',
    fontWeight: 'bold',
  },
});
