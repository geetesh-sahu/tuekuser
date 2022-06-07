import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {w, h, fs} from '../config/index';
import {colors} from '../constants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AuthContext} from '../utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';

const CELL_COUNT = 4;

const OtpField = props => {
  const {onSubmitOTP = () => {}} = props;
  const {signIn} = useContext(AuthContext);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // const getToken = async () => {
  // var  userToken = await EncryptedStorage.getItem('user_session');
  // }

  // useEffect(() => {
  //   getToken()
  // }, [])

  return (
    <View style={styles.otpView}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={i => {
          setValue(i);
          // const res = {
          //   data: {
          //     token: "0000",
          //   },
          // };
          if (i.length == 4) {
            onSubmitOTP(i);
            // signIn(res);
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
              {
                marginHorizontal: 5,
                borderRadius: 8,
                backgroundColor: 'white',
                borderWidth: 0,
              },
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
};

export default OtpField;

const styles = StyleSheet.create({
  otpView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 300,
    alignSelf: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  focusCell: {
    borderColor: '#000',
  },
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
});
