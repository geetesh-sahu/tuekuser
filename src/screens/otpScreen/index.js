import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {colors, images} from '../../constants';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';

import {AuthContext} from '../../utils/context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

const OtpScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [resendOtp, setresendOtp] = useState(true);
  const [timerCount, setTimer] = useState(60);
  const {signIn} = useContext(AuthContext);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  var val = Math.floor(1000 + Math.random() * 9000);
  useEffect(() => {
    alert(val);
  }, []);

  const sendOtpHandler = () => {
    setTimer(60);
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
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
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={i => {
              setValue(i);
              const res = {
                data: {
                  token: '00000',
                },
              };
              if (i.length == 4) {
                signIn(res);
              }
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused && styles.focusCell,
                  {marginHorizontal: 5,borderRadius:8,backgroundColor:'white',borderWidth:0},
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
      </View>
      {resendOtp && timerCount ? (
        <Text style={styles.sendOtp}>
          {`We will resend you verification code in ${timerCount}\nseconds`}
        </Text>
      ) : (
        <TouchableOpacity onPress={sendOtpHandler}>
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
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#00000030',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
