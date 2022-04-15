import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {w, h, fs} from '../config/index';
import {colors} from '../constants';
const CommonInputField = props => {
  const {placeholder} = props;
  return (
    <View>
      <TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        selectionColor={colors.hex_f66820}
        placeholder={placeholder}
      />
    </View>
  );
};

export default CommonInputField;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: colors.hex_f2f2f2,
    height: h(6),
    width:w(90),
    alignSelf: 'center',
    paddingLeft:w(4)
  },
});
