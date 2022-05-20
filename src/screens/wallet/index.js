import {StyleSheet, Text, View,TouchableOpacity,SafeAreaView} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {colors} from '../../constants';


const Wallet = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader text="Wallet" showLine={true} onPress={()=>navigation.goBack()} />
      <View style={styles.topView}>
        <Text>Balance</Text>
        <View style={styles.ngnView}>
          <Text style={[styles.ngnText, {fontSize: fs(28)}]}>NGN 0</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.hex_414042}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={()=> navigation.navigate("AddFund")}>
          <AntDesign name="plus" size={22} color="white" />
          <Text style={styles.btnText}>Add Fund</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: w(7),
          height: h(18),
          justifyContent: 'space-around',
        }}>
        <View style={styles.horizontalLine} />
        <View style={styles.ngnView}>
          <Text style={[styles.ngnText, {marginLeft: w(4)}]}>
            Balance history
          </Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.hex_414042}
          />
        </View>
        <View style={styles.horizontalLine} />
        
        <TouchableOpacity style={styles.ngnView} onPress={()=>navigation.navigate("Coupon")}>
          <Text style={[styles.ngnText, {marginLeft: w(4)}]}>Coupons</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.hex_414042}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#E9EBEE',
    height: h(22),
    margin: h(2),
    borderRadius: 18,
    padding: 18,
  },
  ngnText: {
    fontSize: fs(14),
    color: colors.hex_414042,
    fontWeight: 'bold',
  },
  ngnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F26624',
    width: w(30),
    padding: 12,
    borderRadius: 12,
    marginTop: h(3),
  },
  btnText: {
    color: 'white',
    marginLeft: w(1),
    fontSize: fs(15),
  },
  horizontalLine: {
    borderBottomColor: colors.hex_414042,
    borderBottomWidth: 0.5,
  },
});
