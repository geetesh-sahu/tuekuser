import {StyleSheet, Text, View, TouchableOpacity,SafeAreaView} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {colors} from '../../constants';

const HelpCenter = ({navigation}) => {
  return (
    <SafeAreaView>
      <CustomHeader
        text="Help Center"
        showLine={true}
        onPress={() => navigation.goBack()}
      />
      <Text
        style={{
          fontSize: fs(16),
          color: colors.hex_414042,
          fontWeight: '500',
          marginHorizontal: w(8),
          marginTop: h(4),
        }}>
        Last Order
      </Text>
      <View style={[styles.box, {backgroundColor: '#E9EBEE'}]}>
        <AntDesign name="questioncircle" size={17} color={colors.hex_414042} />
        <Text style={styles.btnText}>
          You don't have any orders for the last 72 hours
        </Text>
      </View>
      <View style={styles.ngnView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="questioncircle" size={17} />
          <Text style={[styles.ngnText, {marginLeft: w(2)}]}>FAQ</Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color={colors.hex_414042} />
      </View>
      <View style={styles.ngnView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="questioncircle" size={17} />
          <Text style={[styles.ngnText, {marginLeft: w(2)}]}>
            General Support
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color={colors.hex_414042} />
      </View>
      <TouchableOpacity
        style={styles.ngnView}
        onPress={() => navigation.navigate('FeedBack')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="feedback" size={17} />
          <Text style={[styles.ngnText, {marginLeft: w(2)}]}>
            Send Feedback
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color={colors.hex_414042} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  box: {
    height: h(22),
    margin: h(0.6),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: w(5),
    marginTop: h(1),
  },
  ngnView: {
    flexDirection: 'row',
    marginHorizontal: w(3),
    justifyContent: 'space-between',
    marginTop: h(3),
  },
  ngnText: {
    fontSize: fs(14),
    color: colors.hex_414042,
    fontWeight: 'bold',
  },
});
