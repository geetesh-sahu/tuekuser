import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../constants';

const CommonBtn = props => {
  const {text ,onPress,customBtnStyle,customTextStyle} = props;
  return (
    <View>
      <TouchableOpacity style={[styles.btnContainer,customBtnStyle]} onPress={onPress}>
        <Text style={[styles.btnText,customTextStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonBtn;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.hex_f56725,
    padding: 8,
    borderRadius: 8,
    width:320,
    alignSelf:'center',
    justifyContent:'center'
  },
  btnText: {
    alignSelf: 'center',
    color: colors.hex_f2f2f2,
    fontWeight: 'bold',
    fontSize: 16,
    
  },
});
