import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { images } from '../../constants';
import { fs, h, height, w } from '../../config';
import CommonInputField from '../../components/CommonInputField';
import CommonBtn from '../../components/CommonBtn';
import CommonModal from '../../components/CommonModal';
import VehicleSelection from '../../components/VehicleSelection';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { OrderContext } from '../../utils/context';
import moment from 'moment';
import axios from 'axios';
import { loader } from '../../redux/actions/loader';
import { showMessage, hideMessage } from 'react-native-flash-message';

const CurrentLocation = ({ navigation }) => {
  const [isModal, setIsModal] = useState(false);
  const [calenderShow, setCalenderShow] = useState(false);
  const [orderData, setOrderData] = useContext(OrderContext);
  console.log('orderData: ', orderData);
  const [opacity, setopacity] = useState(false);
  const [isIMageOpacity, setisIMageOpacity] = useState(false);
  const [showIcon, setshowIcon] = useState(true);
  const [changeAddress, setchangeAddress] = useState(true);

  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setCalenderShow(false);
    const date = moment(selectedDate).format();
    setDate(selectedDate);
    setOrderData({ ...orderData, pickup_Date: date, pickup_Time: date });
  };

  const modalHandler = () => {
    setshowIcon(false);
    setIsModal(!isModal);
  };

  const closeModalHandler = item => {
    setIsModal(item);
    setshowIcon(true);
  };

  const validationForOnSubmitHandler = () => {
    if (orderData.pickup_Date == '') {
      showMessage({
        message: 'Please select date',
        type: "warning"
      })
      return false
    } if (orderData.pickup_Time == '') {
      showMessage({
        message: 'Please select date',
        type: "warning"
      })
      return false
    } if (orderData.Pick_Late == '' ||
      orderData.Pick_Long == '' ||
      orderData.pick_Location == '' ||
      orderData.pick_Address == '' ||
      orderData.pick_City == '') {
      showMessage({
        message: 'Please select pickup location again',
        type: "warning"
      })
      return false
    } if (orderData.destination_Late == '' ||
      orderData.destination_Long == '' ||
      orderData.destiNation_City == '' ||
      orderData.destination_Address == '' ||
      orderData.destination_Location == '') {
      showMessage({
        message: 'Please select destination location again',
        type: "warning"
      })
      return false
    } if (orderData.vehicle_ID == '') {
      showMessage({
        message: 'Please select vehicle',
        type: "warning"
      })
      return false
    } return true
  };

  const onSubmitHandler = () => {
    const valid = validationForOnSubmitHandler()
    if (valid) {
      dispatch(loader(true));
      axios
        .post(
          'http://tuketuke.azurewebsites.net/api/OrderDetails/GetDistancebyAPI',
          {
            pick_Lat: orderData.Pick_Late,
            pick_lng: orderData.Pick_Long,
            destination_Lat: orderData.destination_Late,
            destination_Lng: orderData.destination_Long,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(function (response) {
          console.log('response====>>>--', response.data);
          if (response.status == 200) {
            if (response.data.status == 'Success') {
              dispatch(loader(false));
              setOrderData({
                ...orderData,
                estimated_Cost: response.data.data.amount,
                distance: response.data.data.distance,
              });
              navigation.navigate('SelectVehicle');
            } else {
              dispatch(loader(false));
            }
          } else {
            dispatch(loader(false));
          }
        })
        .catch(function (error) {
          showMessage({
            message: error.toString(),
            type: 'warning',
          });
          dispatch(loader(false));
        });
    }
  };

  const exachangeAddressHandler = () => {
    // setchangeAddress(!changeAddress);
    setOrderData({
      ...orderData,
      Pick_Late: orderData.destination_Late,
      Pick_Long: orderData.destination_Long,
      pick_Location: orderData.destination_Location,
      pick_Address: orderData.destination_Address,
      pick_City: orderData.destiNation_City,
      destination_Late: orderData.Pick_Late,
      destination_Long: orderData.Pick_Long,
      destiNation_City: orderData.pick_City,
      destination_Address: orderData.pick_Address,
      destination_Location: orderData.pick_Location,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'lightgrey',
      }}>
      <ScrollView>
        <View style={styles.container1}>
          <View style={styles.cityName}>
            <Ionicons name="location-sharp" size={22} color="grey" />
            <Text>{orderData.pick_City}</Text>
          </View>
          {showIcon ? (
            <TouchableOpacity
              style={styles.menuIconView}
              onPress={modalHandler}>
              <View style={styles.square} />
              <View style={[styles.square, { marginHorizontal: h(0.7) }]} />
              <View style={styles.square} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.container2}>
          <View style={styles.locatinDetail}>
            <Text>Pick up time </Text>
            <View style={styles.horizontalView}>
              <Text style={styles.nowText}>
                {orderData.pickup_Date &&
                  moment(orderData.pickup_Date).format('MMMM Do YYYY, h:mm a')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setCalenderShow(true);
                }}>
                <Ionicons name="chevron-forward" size={26} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 2,
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('PickupLocation')}
            style={styles.pikupLoc}>
            <Ionicons name="ios-location-outline" size={22} color="grey" />
            <View style={styles.location}>
              <View style={styles.currentAddress}>
                <Text>Current pick up location</Text>

                <View>
                  <Text style={styles.placeName}>{orderData.pick_City}</Text>
                  <Text>{`${orderData.pick_Location} ${orderData.pick_Address}`}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={26} color="grey" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View style={styles.refreshView}>
            <View style={styles.length} />
            <TouchableOpacity
              style={{ transform: [{ rotate: '40deg' }] }}
              onPress={exachangeAddressHandler}>
              <MaterialCommunityIcons name="sync" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.length} />
          </View>

          {orderData.destination_Location == '' ? (
            <CommonInputField
              onFocus={() => navigation.navigate('PickupLocation')}
              placeholder="Enter destination address"
              inputStyle={styles.inputView}
            />
          ) : (
            <View style={styles.destinationStyle}>
              <Image source={images.flag_image} style={{ marginLeft: w(2) }} />
              <TouchableOpacity
                style={styles.location}
                onPress={() => navigation.navigate('PickupLocation')}>
                <View style={styles.dAddress}>
                  <Text>Destination address</Text>

                  <View>
                    <Text style={styles.placeName}>
                      {orderData.destination_Address}
                    </Text>
                    <Text>{orderData.destination_Location}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons name="chevron-forward" size={26} color="grey" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.slide}>Slide to select vehicle</Text>
          <VehicleSelection
            onScreenChange={(item, index) => {
              setOrderData({ ...orderData, vehicle_ID: item.id });
            }}
          />
          {isModal && (
            <CommonModal
              showModal={isModal}
              navigation={navigation}
              modalCallback={closeModalHandler}
            />
          )}
          <View style={styles.confirmBtnView}>
            {/* <CommonBtn
            text="Confirm"
            customBtnStyle={styles.confirmBtn}
            onPress={modalHandler}
          /> */}
            <CommonBtn
              text="Next"
              customBtnStyle={styles.confirmBtn}
              onPress={onSubmitHandler}
            />
          </View>
        </View>
      </ScrollView>
      {calenderShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'datetime'}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  container1: {
    marginHorizontal: w(3),
    marginTop: h(1),
    flexDirection: 'row',
    alignItems: 'center',
    height: h(7),
  },
  cityName: {
    flex: 1,
    flexDirection: 'row',
  },
  menuIconView: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: w(1),
  },
  square: {
    backgroundColor: 'grey',
    width: 8,
    height: 8,
  },
  container2: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: h(1),
    borderRadius: 19,
  },
  locatinDetail: {
    padding: w(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nowText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: fs(15),
    marginRight: w(2),
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmBtnView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  confirmBtn: {
    borderRadius: 0,
    width: w(100),
    height: h(8),
    marginTop: h(2)
  },

  area: {
    alignSelf: 'center',
    marginTop: h(2),
  },
  flatlistImage: {
    width: 290,
    height: 160,
  },
  slide: {
    alignSelf: 'center',
    marginTop: h(5),
  },
  inputView: {
    marginTop: h(8),
    height: h(8),
    width: w(94),
    backgroundColor: 'lightgrey',
  },
  length: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    width: '50%',
  },
  refreshView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeName: {
    fontSize: fs(18),
    color: 'black',
    fontWeight: 'bold',
  },
  location: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pikupLoc: {
    flexDirection: 'row',
    padding: w(5),
    justifyContent: 'space-between',
    height: h(16),
  },
  destinationStyle: {
    flexDirection: 'row',
    padding: w(5),
    justifyContent: 'space-between',
    height: h(16),
  },
  dAddress: {
    marginRight: w(2),
    width: w(67),
  },
  currentAddress: {
    marginRight: w(2),
    width: w(67),
  },
});
