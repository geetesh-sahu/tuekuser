import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { h, w ,fs} from '../config';

const CustomHeader = props => {
  const {onPress} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-back" size={30} />
      </TouchableOpacity>
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
});
