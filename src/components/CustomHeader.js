import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {h, w, fs} from '../config';
import { colors } from '../constants';

const CustomHeader = props => {
  const {onPress, text, showLine = false} = props;
  return (
    <View style={{}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <Text style={{fontSize: fs(16), color: colors.hex_414042, fontWeight: 'bold'}}>
          {text}
        </Text>
        <Text style={{marginRight: w(9)}}></Text>
      </View>
      {showLine && <View style={styles.horizontalLine} />}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: h(2),
    marginLeft: w(3),
  },
  titleText: {
    fontSize: fs(18),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  horizontalLine: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    marginTop:h(1)
  },
});
