import {StyleSheet, Text, View,TouchableOpacity,SafeAreaView} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';

import {colors} from '../../constants/index';
const Invoice = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader text="Invoice" showLine={true} onPress={()=>navigation.goBack()} />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.box1}>
            <Text style={styles.recieptText}>
              This receipt is for a test transaction. No real money
            </Text>
            <Text style={styles.recieptText}> was debited</Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.recievedPaymentText}>
              mazamaza received your payment of
            </Text>
            <Text style={styles.box2Text}> NGN 574.00</Text>
          </View>
        </View>
        <View style={{flex: 1.5}}>
          <View style={styles.box3}>
            <Text style={styles.details}>Transaction Details</Text>
            <View style={styles.rightVerticalView}>
              <Text>Reference</Text>
              <Text style={styles.rightVerticalText}>3d5obgcme9</Text>
            </View>
            <View style={styles.rightVerticalView}>
              <Text>Date</Text>
              <Text style={styles.rightVerticalText}>24th Aug, 2021</Text>
            </View>
            <View style={styles.rightVerticalView}>
              <Text>Card</Text>
              <View style={styles.cardView}>
                <TouchableOpacity onPress={()=> navigation.navigate("Wallet")}>
                  <Text>VISA</Text>
                </TouchableOpacity>
                <Text style={styles.visaText}>Ending with 4081</Text>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.mazamazaText}>mazamaza</Text>
            <View style={[styles.horizontalLine, {marginBottom: h(2)}]} />
            <View style={styles.horizontalLine} />

            <TouchableOpacity>
              <Text style={styles.emailBtn}> Send via email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: colors.hex_414042,
    borderBottomWidth: 0.5,
  },
  emailBtn: {
    alignSelf: 'center',
    fontSize: fs(15),
    color: colors.hex_414042,
    fontWeight: 'bold',
    marginTop: h(2),
  },
  details: {
    alignSelf: 'center',
    fontSize: fs(18),
    color: colors.hex_414042,
    fontWeight: '500',
  },
  box1: {
    backgroundColor: '#EF5050',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: h(3),
  },
  recieptText: {
    fontSize: fs(15),
    color: 'white',
  },
  box2: {
    backgroundColor: '#0D3E66',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightVerticalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box2Text: {
    fontSize: fs(22),
    color: 'white',
    fontWeight: 'bold',
  },
  box3: {
    flex: 2,
    justifyContent: 'space-around',
    paddingHorizontal: w(12),
  },
  rightVerticalText: {
    fontSize: fs(14),
    color: colors.hex_414042,
  },
  mazamazaText: {
    alignSelf: 'center',
    fontSize: fs(14),
  },
  footer: {
    flex: 0.8,
    marginTop: h(10),
  },
  visaText: {
    marginLeft: w(2),
    fontSize: fs(14),
    color: colors.hex_414042,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recievedPaymentText: {
    fontSize: fs(17),
    color: 'white',
  },
});
