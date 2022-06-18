import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {images} from '../../constants';
import {fs, h, w} from '../../config';
import CommonInputField from '../../components/CommonInputField';
import CommonBtn from '../../components/CommonBtn';
import CommonModal from '../../components/CommonModal';
import VehicleSelection from '../../components/VehicleSelection';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {OrderContext} from '../../utils/context';
import moment from 'moment';
import axios from 'axios';
import {loader} from '../../redux/actions/loader';
import {showMessage} from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const CurrentLocation = ({navigation}) => {
  const [isModal, setIsModal] = useState(false);
  const [calenderShow, setCalenderShow] = useState(false);
  const [orderData, setOrderData] = useContext(OrderContext);
  const [showIcon, setshowIcon] = useState(true);
  const [currnetloc, setcurrnetloc] = useState('');
  const [show, setshow] = useState(true);
  const [confirm, setconfirm] = useState(false);
  const [dateTime, setdateTime] = useState("date")
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');

  const onChange = (event, selectedDate) => {
    setdateTime('date')
    setCalenderShow(false);
    const date = moment(selectedDate).format();
    setDate(selectedDate);
    setOrderData({...orderData, pickup_Date: date, pickup_Time: date});
  };

  const modalHandler = () => {
    setshowIcon(false);
    setIsModal(!isModal);
  };

  const closeModalHandler = item => {
    setIsModal(item);
    setshowIcon(true);
  };

  function getAddressObject(lat, lng, formatAddress, address_components) {
    var ShouldBeComponent = {
      home: ['street_number'],
      postal_code: ['postal_code'],
      street: ['street_address', 'route'],
      region: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      country: ['country'],
    };
    var address = {
      home: '',
      postal_code: '',
      street: '',
      region: '',
      city: '',
      country: '',
    };
    address_components.forEach(component => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          address[shouldBe] = component.long_name;
        }
      }
    });
    return address;
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(
          'lat, lng',
          position.coords.latitude,
          position.coords.longitude,
        );
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(async json => {
            const addressComponent = json.results[0].address_components;
            const addresCurrent = addressComponent[1].long_name;

            const address = getAddressObject(
              position.coords.latitude,
              position.coords.longitude,
              addresCurrent,
              addressComponent,
            );
            setcurrnetloc(address);
            setOrderData({
              ...orderData,
              pick_City: address.city,
              Pick_Late: position.coords.latitude,
              Pick_Long: position.coords.longitude,
              pick_Location: address.street ? address.street : address.city,
              pick_Address: addresCurrent ? addresCurrent : address.city,
            });
          })
          .catch(error => console.log('error===>>', error));
      },
      error => {
        console.log('error', error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };

  const validationForOnSubmitHandler = () => {
    // if (orderData.pickup_Date == '') {
    //   showMessage({
    //     message: 'Please select date',
    //     type: 'warning',
    //   });
    //   return false;
    // }
    // if (orderData.pickup_Time == '') {
    //   showMessage({
    //     message: 'Please select date',
    //     type: 'warning',
    //   });
    //   return false;
    // }
    if (
      orderData.Pick_Late == '' ||
      orderData.Pick_Long == '' ||
      orderData.pick_Location == '' ||
      orderData.pick_Address == '' ||
      orderData.pick_City == ''
    ) {
      showMessage({
        message: 'Please select pickup location again',
        type: 'warning',
      });
      return false;
    }
    if (
      orderData.destination_Late == '' ||
      orderData.destination_Long == '' ||
      orderData.destiNation_City == '' ||
      orderData.destination_Address == '' ||
      orderData.destination_Location == ''
    ) {
      showMessage({
        message: 'Please select destination location again',
        type: 'warning',
      });
      return false;
    }
    if (orderData.vehicle_ID == '') {
      showMessage({
        message: 'Please select vehicle',
        type: 'warning',
      });
      return false;
    }
    return true;
  };


  const onSubmitHandler = () => {
    if(orderData.pick_Address==orderData.destination_Address){
      showMessage({
        message: "address should not be same",
        type: "danger",
      });
    }else{
   
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
      .then(async function (response) {
        if (response.status == 200) {
          if (response.data.status == 'Success') {
            await setOrderData({
              ...orderData,
              pickup_Date: moment(date).format(), pickup_Time: moment(date).format(),
              estimated_Cost: response.data.data.amount,
              distance: response.data.data.distance,
            });
            dispatch(loader(false));
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
    if(orderData.destination_Location == ''){
      showMessage({
        message: "please enter destination address",
        type: 'warning',
      });
    }else{
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
      })
    }
   
  };

  const showTime = () => {
    setCalenderShow(true);
    setshow(false);
  };

  const onConfirmHandler = () => {
    const valid = validationForOnSubmitHandler();
    if (valid) {
      setconfirm(true);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {orderData.destination_Location == '' ? (
          <View style={styles.container1}>
            <View style={styles.cityName}>
              <Ionicons name="location-sharp" size={22} color="grey" />
              <Text>{orderData.pick_City}</Text>
            </View>

            <TouchableOpacity style={styles.menuIconView}>
              <View style={styles.square} />
              <View style={[styles.square, {marginHorizontal: h(0.7)}]} />
              <View style={styles.square} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {showIcon ? (
              <TouchableOpacity
                style={{backgroundColor: 'white', flex: 1}}
                onPress={() => modalHandler()}>
                <AntDesign
                  name="pluscircle"
                  size={32}
                  color="grey"
                  style={{
                    marginTop: h(3),
                    alignSelf: 'flex-end',
                    marginRight: w(6),
                  }}
                />
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
      <View
        style={{
          flex: 10,
          backgroundColor: 'white',
        }}>
        <ScrollView>
          <TouchableOpacity style={styles.locatinDetail} onPress={showTime}>
            <Text>Pick up time </Text>
            <View style={styles.horizontalView}>
              {show ? (
                <Text style={styles.nowText}>Now</Text>
              ) : (
                <Text style={styles.nowText}>
                  {orderData.pickup_Date &&
                    moment(orderData.pickup_Date).format(
                      'MMMM Do YYYY, h:mm a',
                    )}
                </Text>
              )}

              <View>
                <Ionicons name="chevron-forward" size={26} color="grey" />
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
            }}
          />

          <View style={{flexDirection: 'row', marginTop: h(2)}}>
            <View
              style={{
                marginLeft: w(4),
                width: 20,
                alignItems: 'center',
                height: h(37),
              }}>
              <Ionicons name="ios-location-outline" size={22} color="grey" />

              {orderData.destination_Location == '' ? null : (
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{height: h(1), width: 1, backgroundColor: 'black'}}
                  />
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 5 / 2,
                      backgroundColor: 'black',
                    }}
                  />
                  <View
                    style={{height: h(15), width: 1, backgroundColor: 'black'}}
                  />
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 5 / 2,
                      backgroundColor: 'black',
                    }}
                  />
                  <View
                    style={{height: '6%', width: 1, backgroundColor: 'black'}}
                  />
                  <Image source={images.flag_image} style={{}} />
                </View>
              )}
            </View>

            <View style={{width: '100%', marginLeft: w(3)}}>
              <View style={styles.destinationStyle}>
                <View style={styles.dAddress}>
                  <View>
                    <Text>Current pick up location</Text>
                    {orderData.Pick_Late !== '' && (
                      <View>
                        <Text style={styles.placeName}>
                          {orderData.pick_City}
                        </Text>
                        <Text>{`${orderData.pick_Address}`}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('PickupLocation', {
                      ulocation: 'Pickup address',
                    })
                  }>
                  <Ionicons name="chevron-forward" size={26} color="grey" />
                </TouchableOpacity>
              </View>
              <View style={styles.refreshView}>
                <TouchableOpacity onPress={exachangeAddressHandler}  >
                  <Image source={images.asyncIcon} />
                </TouchableOpacity>
              </View>
              {orderData.destination_Location == '' ? (
                <CommonInputField
                  onFocus={() =>
                    navigation.navigate('PickupLocation', {
                      ulocation: 'Destination address',
                    })
                  }
                  placeholder="Enter destination address"
                  inputStyle={styles.inputView}
                />
              ) : (
                <View style={styles.destinationStyle}>
                  <View style={styles.dAddress}>
                    <Text>Destination address</Text>
                    <View>
                      <Text style={styles.placeName}>
                       
                        {orderData.destination_Location}
                      </Text>
                      <Text> {orderData.destination_Address}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() =>
                      navigation.navigate('PickupLocation', {
                        ulocation: 'Destination Address',
                      })
                    }>
                    <Ionicons name="chevron-forward" size={26} color="grey" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {orderData.destination_Location == '' ? null : (
            <View
              style={{
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                marginTop: h(1.5),
              }}
            />
          )}

          <View style={{flex: 1}}>
            <VehicleSelection
              onScreenChange={(item, index) => {
                setOrderData({...orderData, vehicle_ID: item.id});
              }}
            />
          </View>
          {isModal && (
            <CommonModal
              showModal={isModal}
              navigation={navigation}
              modalCallback={closeModalHandler}
            />
          )}
        </ScrollView>
      </View>
      <View style={{flex: 0.91}}>
        {orderData.destination_Location == '' ? (
          <CommonBtn
            text="Confirm"
            customBtnStyle={styles.confirmBtn}
            onPress={onConfirmHandler}
          />
        ) : (
          <CommonBtn
            text="Next"
            customBtnStyle={styles.confirmBtn}
            onPress={onSubmitHandler}
          />
        )}
      </View>
      {calenderShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={dateTime}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingHorizontal: w(3),
    paddingTop: h(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityName: {
    flex: 1,
    flexDirection: 'row',
  },
  menuIconView: {
    flexDirection: 'row',
    height: w(10),
    width: w(10),
    borderRadius: w(12),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: w(2),
  },
  square: {
    backgroundColor: 'grey',
    width: w(1.2),
    height: w(1.2),
  },
  container2: {
    flex: 9,
  },
  locatinDetail: {
    paddingHorizontal: w(5.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: h(2),
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
    marginTop: h(4),
  },
  confirmBtn: {
    borderRadius: 0,
    width: w(100),
    height: h(8),
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
  },
  inputView: {
    marginTop: h(3),
    height: h(8),
    width: w(95),
    marginRight: w(25),
  },
  length: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: '50%',
  },
  refreshView: {
    alignItems: 'center',
    marginBottom: h(4),
    marginRight: w(15),
  },
  placeName: {
    fontSize: fs(18),
    color: 'black',
    fontWeight: 'bold',
  },

  destinationStyle: {
    flexDirection: 'row',
    height: h(14),
  },
  dAddress: {
    width: w(75),
  },
});
