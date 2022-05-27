import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Paystack} from 'react-native-paystack-webview';

const Payment = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        text="Check Out"
        showLine={true}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'lightgrey',
          padding: w(8),
          marginTop: h(2),
          marginHorizontal: w(3),
          borderRadius: 12,
        }}>
        <Text style={{color: 'black', fontSize: fs(22), fontWeight: 'bold'}}>
          $ 5,000
        </Text>
        <Text style={{color: 'black', fontSize: fs(18), fontWeight: 'bold'}}>
          Wallet
        </Text>
      </View>

      <View
        style={{
          padding: h(2),
          flex: 1,
          justifyContent: 'space-around',
          marginBottom: h(42),
        }}>
        <Text style={{marginLeft: w(2),fontSize:fs(17)}}>Online payment</Text>
        <View style={styles.horizontalLine} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: w(2),
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('PayStack')}>
            <Ionicons name="menu" size={28} color="blue" />
            <Text
              style={{fontSize: fs(19), color: 'black', fontWeight: 'bold'}}>
              paystack
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={26} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
      </View>

      <View>
        <CommonBtn
          text="Confirm"
          customBtnStyle={styles.confirmBtn}
          onPress={() => navigation.navigate('Map')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  confirmBtnView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  confirmBtn: {
    borderRadius: 0,
    width: w(100),
    height: h(8),
  },
});
