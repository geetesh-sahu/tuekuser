import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import VehicleSelection from '../../components/VehicleSelection';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import CommonBtn from '../../components/CommonBtn';
import {images} from '../../constants';
import {OrderContext, UserContext} from '../../utils/context';
import axios from 'axios';
import {loader} from '../../redux/actions/loader';
import {useDispatch} from 'react-redux';

const SelectVehicle = props => {
  console.log('porps me kya ', props);
  const [orderData, setOrderData] = useContext(OrderContext);
  const [userData, setUserData] = useContext(UserContext);
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    dispatch(loader(true));
    const params = orderData;
    params.user_MobileNo = userData.user_MobileNo;

    params.estimated_Cost = orderData.estimated_Cost.toString();
    axios
      .post(
        'http://tuketuke.azurewebsites.net/api/OrderDetails/AddOrder',
        params,
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
            props.navigation.navigate('Payment');
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

  const callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <CustomHeader
          onPress={() => props.navigation.goBack()}
          text="Select vehicle"
          showLine={true}
        />
      </View>
      <View style={{flex: 12}}>
        <ScrollView>
          <VehicleSelection
            isSelectVehicle={true}
            onScreenChange={(item, index) => {
              setOrderData({...orderData, vehicle_ID: item.id});
            }}
            uiType={true}
          />
          <View style={[styles.horizontalLine, {borderBottomWidth: w(1)}]} />
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Ionicons name="ios-location-outline" size={22} color="green" />
              <View style={styles.verticleLine} />
              <Image source={images.flag_image} style={{marginLeft: w(3)}} />
            </View>
            <View style={styles.locationArea}>
              <View style={styles.horizontal}>
                <Text style={styles.placeName}>{orderData.pick_City}</Text>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('PickupLocation', {
                      ulocation: 'Enter your pickup address',
                    })
                  }>
                  <Ionicons name="chevron-forward" size={26} color="grey" />
                </TouchableOpacity>
              </View>
              <View style={[styles.horizontalLine, {marginVertical: h(1)}]} />
              <View style={styles.horizontal}>
                <Text style={styles.placeName}>
                  {orderData.destination_Address}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('PickupLocation', {
                      ulocation: 'Enter your destination address',
                    })
                  }>
                  <Ionicons name="chevron-forward" size={26} color="grey" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.horizontalLine,
              {marginTop: h(1), borderBottomWidth: w(3)},
            ]}
          />
          <View style={styles.horizontalBox}>
            <Text style={{marginLeft: w(4)}}>{userData.mobile_No}</Text>
            <View style={styles.textWithIcon}>
              <Text style={{fontSize: fs(10)}}>Select from contact</Text>

              <TouchableOpacity onPress={num => callNumber(num)}>
                <Ionicons name="chevron-forward" size={30} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.horizontalLine]} />
          <View style={styles.horizontalBox}>
            <View style={styles.textWithIcon}>
              <AntDesign name="user" size={25} />
              <TextInput
                maxLength={15}
                placeholder={`Reciever's Number`}
                keyboardType="numeric"
                placeholderTextColor="lightgrey"
                style={{paddingLeft: 12}}
                // orderData, setOrderData
                onChangeText={val => {
                  setOrderData({...orderData, reciver_MobileNo: val});
                }}
                value={orderData.reciver_MobileNo}
              />
            </View>
            <View style={styles.textWithIcon}>
              <Text style={{fontSize: fs(10)}}>Select from contact</Text>
              <TouchableOpacity onPress={callNumber}>
                <Ionicons name="chevron-forward" size={30} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.horizontalLine]} />
          <View style={styles.NameInput}>
            <AntDesign name="user" size={25} />
            <TextInput
              maxLength={15}
              placeholder="Name"
              placeholderTextColor={'lightgrey'}
              style={{paddingLeft: 12}}
              onChangeText={val => {
                setOrderData({...orderData, reciver_Name: val});
              }}
              value={orderData.reciver_Name}
            />
          </View>
          <View style={[styles.horizontalLine, {borderBottomWidth: h(2)}]} />
          <View style={styles.horizontalBox}>
            <Text style={{marginLeft: w(4)}}>Pick up time</Text>
            <View style={styles.textWithIcon}>
              <Text style={styles.footerText}>Now</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={26} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.horizontalLine]} />
          <View style={styles.horizontalBox}>
            <Text style={{marginLeft: w(4)}}>Payment method</Text>
            <View style={styles.textWithIcon}>
              <Text style={styles.footerText}>Wallet</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={26} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.horizontalLine]} />
          <View style={styles.numberBox}>
            <Text style={{}}>Estimated cost</Text>
            <Text style={styles.number}> {`N${orderData.estimated_Cost}`}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.confirmBtnView}>
          <CommonBtn
            text="Confirm"
            customBtnStyle={styles.confirmBtn}
            onPress={onSubmitHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectVehicle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  placeName: {
    fontSize: fs(18),
    fontWeight: 'bold',
    width: w(75),
  },
  verticleLine: {
    height: h(6),
    width: w(0.1),
    backgroundColor: 'black',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: w(2),
    marginTop: h(3),
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: w(5),
  },
  imageView: {
    width: 200,
    height: 100,
  },
  confirmBtn: {
    borderRadius: 0,
    width: w(100),
    height: h(8),
  },
  number: {
    fontSize: fs(26),
    color: 'black',
    fontWeight: '400',
  },
  numberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: h(1),
  },
  horizontalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: w(3),
  },
  confirmBtnView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerText: {
    fontSize: fs(17),
    color: 'black',
    fontWeight: 'bold',
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: w(1),
  },
  NameInput: {
    flexDirection: 'row',
    padding: w(3),
    alignItems: 'center',
  },
  locationArea: {
    flex: 1,
    marginLeft: w(1),
  },
});
