import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {Paystack} from 'react-native-paystack-webview';
import {fs, h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {OrderContext} from '../../utils/context';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import axios from 'axios';


const Payment = ({navigation}) => {
  const [orderData, setOrderData] = useContext(OrderContext);
  const [a, setA] = useState(false);
  const dispatch = useDispatch()

  const onSuccessHandler = res => {
    setA(false);
    dispatch(loader(true));
    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/OrderDetails/AddPaymentDetail',
        {
          events: res.data.event,
          message: res.data.transactionRef.message,
          status: res.data.transactionRef.status,
          transaction: res.data.transactionRef.transaction,
          reference: res.data.transactionRef.reference,
          order_No: 2,
          amount: orderData.estimated_Cost,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(function (response) {

        if (response.status == 200) {
          if (response.data.status == 'Success') {
            dispatch(loader(false));
          } else {
            dispatch(loader(false));
          }
        } else {
          dispatch(loader(false));
        }
      })
      .catch(function (error) {
        console.log('error: ', error);
        dispatch(loader(false));
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        text="Check Out"
        showLine={true}
      />
      <View style={styles.walletBox}>
        <Text style={styles.amountStyle}>$ 5,000</Text>
        <Text style={styles.walletText}>Wallet</Text>
      </View>

      <View style={styles.paymentBox}>
        <Text style={styles.paymentText}>Online payment</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.paystackBox}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setA(true)}>
            {/* onPress={() => navigation.navigate('PayStack')}> */}
            <Ionicons name="menu" size={28} color="blue" />
            <Text style={styles.paystackText}>paystack</Text>
          </TouchableOpacity>
          {a && (
            <Paystack
              paystackKey="pk_test_a88482aae1d55ae1910928b8389fd9b9029d0a1d"
              amount={orderData.estimated_Cost}
              billingEmail="paystackwebview@something.com"
              activityIndicatorColor="green"
              onCancel={e => {
                setA(false);
                // props.navigation.navigate("PickupLocation")
              }}
              onSuccess={onSuccessHandler}
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
  walletBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey',
    padding: w(8),
    marginTop: h(2),
    marginHorizontal: w(3),
    borderRadius: 12,
  },
  amountStyle: {
    color: 'black',
    fontSize: fs(22),
    fontWeight: 'bold',
  },
  walletText: {
    color: 'black',
    fontSize: fs(18),
    fontWeight: 'bold',
  },
  paymentBox: {
    padding: h(2),
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: h(42),
  },
  paymentText: {
    marginLeft: w(2),
    fontSize: fs(17),
  },
  paystackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: w(2),
  },
  paystackText: {
    fontSize: fs(19),
    color: 'black',
    fontWeight: 'bold',
  },
});
