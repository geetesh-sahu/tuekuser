import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';

function PayStack(props) {
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="pk_test_a88482aae1d55ae1910928b8389fd9b9029d0a1d"
      
        amount={'250.00'}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
            console.log('e----->>',e)
            props.navigation.navigate("Payment")
        }}
        onSuccess={(res) => {
          console.log('res----->>>',res)
          props.navigation.navigate("Payment")
        }}
        autoStart={true}
      />
    </View>
  );
}

export default PayStack