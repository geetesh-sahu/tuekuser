import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import { images } from '../../constants';

const Coupon = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader text="Coupon" showLine={true} onPress={()=>navigation.goBack()} />
      <View style={{flex: 2}}>
        <TextInput placeholder="Enter coupn code" style={[styles.btn,{borderWidth:3,borderColor:'#E9EBEE',paddingLeft:w(5)}]} />
        <TouchableOpacity style={[styles.btn, {backgroundColor: '#E9EBEE'}]}>
          <Text style={styles.btnText}>Redeem</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.couponBox}>
      <ImageBackground source={images.coupon_icon} resizeMode="contain" style={{width:w(50),height:h(12)}}>
      <Text style={styles.text}>Coupon</Text>
    </ImageBackground>
        <Text>No coupon yet</Text>
      </View>
    </SafeAreaView>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  btn: {
    
    height: h(8),
    margin: h(0.6),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: w(5),
    marginTop: h(2),
  },
  text: {
    color: "white",
    fontSize: 18,
    lineHeight: 93,
    textAlign: "center",
    marginLeft:h(8)
  },
  couponBox:{
    flex: 6,
    alignItems:'center',
    marginTop:h(25)
  }
});
