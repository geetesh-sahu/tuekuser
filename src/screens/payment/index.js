import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {Paystack} from 'react-native-paystack-webview';
import {fs, h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Payment = ({navigation}) => {
  const [a, setA] = useState(false);
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
        <Text style={{marginLeft: w(3)}}>Online payment</Text>
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
            onPress={() => setA(true)}>
            {/* onPress={() => navigation.navigate('PayStack')}> */}
            <Ionicons name="menu" size={28} color="blue" />
            <Text
              style={{fontSize: fs(19), color: 'black', fontWeight: 'bold'}}>
              paystack
            </Text>
          </TouchableOpacity>
          {a && (
            <Paystack
              paystackKey="pk_test_a88482aae1d55ae1910928b8389fd9b9029d0a1d"
              amount={'250.00'}
              billingEmail="paystackwebview@something.com"
              activityIndicatorColor="green"
              onCancel={e => {
                console.log('e----->>', e);
                setA(false)
                // props.navigation.navigate("PickupLocation")
              }}
              onSuccess={res => {
                setA(false)
                console.log('res----->>>', res);
                // props.navigation.navigate("PickupLocation")
                // navigation.goBack(null)
              }}
              autoStart={true}
            />
          )}
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
