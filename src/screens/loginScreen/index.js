import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { colors, images } from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import { h, regx, w } from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loader } from '../../redux/actions/loader';
import { showMessage, hideMessage } from 'react-native-flash-message';

const LoginScreen = ({ navigation }) => {
  const [number, setnumber] = useState('+919754944101');
  const [isError, setIsError] = useState(false);
  

  const dispatch = useDispatch();

  const onConfirmHandler = async () => {
    if (!number) {
      setIsError(true);
    } else {
      dispatch(loader(true));
      const string = encodeURIComponent('+');
      axios({
        url: `http://tuketuke.azurewebsites.net/api/Login/SMSNotification?Mobile_No=${string}${number}`,
        method: 'post',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log('response--->>',response)
          if (response.status == 200) {
            const { data } = response;
            if (data.status == 'Success') {
              
              dispatch(loader(false));
              navigation.navigate('OtpScreen', {
                loginData: data.data,
                mobileNo: number,
              });
            } else {
              dispatch(loader(false));
              showMessage({ message: data.message, type: "warning" })
            }
          } else {
            dispatch(loader(false));
            showMessage({ message: response.statusText, type: "warning" })
          }
        })
        .catch(function (error) {
          dispatch(loader(false));
          showMessage({
            message: `${error.response.status} ${error.response.statusText}`,
            type: 'danger',
            style: { padding: 93 },
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
      <View style={{ marginTop: 60 }}>
        <View>
          <Image source={images.commonLogo} style={styles.appLogo} />
          <Text style={styles.heading}>Login to Tuketuke</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.fieldName}>Enter your number</Text>
        </View>
        <CommonInputField
          value={number}
          onChangeText={text => setnumber(text)}
          maxLength={15}
          keyboardType={'phone-pad'}
          warningTitle={
            !number
              ? `Mobile Number is required`
              : `Please enter your valid mobile number!`
          }
          warning={
            !number ? isError : false
          }
        />
      </View>
      <Text style={styles.otpSendText}>
        We will send you verification to this number
      </Text>
      <CommonBtn
        text="Confirm"
        onPress={onConfirmHandler}
        customBtnStyle={{ padding: 12, width: 350 }}
      />
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
    fontSize: 15,
  },
  passwordText: {
    alignSelf: 'center',
    marginTop: 22,
    fontSize: 16,
  },
});
