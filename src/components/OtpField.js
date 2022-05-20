import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {w, h, fs} from '../config/index';
import {colors} from '../constants';
const OtpField = props => {
  const {placeholder,onFocus,maxLength} = props;
  return (
    <View>
      <TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        selectionColor={colors.hex_f66820}
        placeholder={placeholder}
        onFocus={onFocus}
        maxLength={maxLength}
      />
    </View>
  );
};

export default OtpField;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: 'white',
    height: h(6),
    width: w(13),
    paddingLeft: 15,
    borderRadius: 8,
    fontSize:20
  },
});
