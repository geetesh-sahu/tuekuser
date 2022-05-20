import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {colors, images} from '../../constants';
import {fs, h, height, w} from '../../config';
import CommonInputField from '../../components/CommonInputField';
import CommonBtn from '../../components/CommonBtn';
import CommonModal from '../../components/CommonModal';
import VehicleSelection from '../../components/VehicleSelection';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {loader} from '../../redux/actions/loader';


const DATA = [
  {
    image: images.vehicle_image,
    area: '500kg / 1.8*1.3*1.1cm / 2.6cbm',
    icon: <Ionicons name="chevron-forward" size={26} color="grey" />,
  },
  {
    image: images.vehicle_image,
    area: '500kg / 1.8*1.3*1.1cm / 2.6cbm',
    icon: <Ionicons name="chevron-forward" size={26} color="grey" />,
  },
];

const CurrentLocation = ({navigation}) => {
  const [isModal, setIsModal] = useState(false);
  const [opacity, setopacity] = useState(false);
  const [vehicle, setvehicle] = useState('');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   vehicleList();
  // }, []);

  const vehicleList = () => {
    dispatch(loader(true));
    axios
      .get('http://192.168.0.178:5001/api/VehicleList/VehicleList')
      .then(function (response) {
        dispatch(loader(false));
        setvehicle(response.data.data);
      })
      .catch(function (error) {
        console.log('error===>>', error);

        dispatch(loader(false));
      });
  };

  const modalHandler = () => {
    //  navigation.navigate("PickupLocation")
    setIsModal(!isModal);
    setopacity(!opacity);
  };


  const getLocation = useSelector((state)=> state.locationReducer.data)
  const getdestinationLocation = useSelector((state)=> console.log('state++++===',state))
  
  useEffect(() => {
    getdestinationLocation
  }, [])
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: opacity ? 'black' : 'lightgrey',
        opacity: opacity ? 0.5 : 1,
      }}>
      <View style={styles.container1}>
        <View style={styles.cityName}>
          <Ionicons name="location-sharp" size={22} color="grey" />
          <Text>New York City</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.menuIconView}>
            <View style={styles.square} />
            <View style={[styles.square, {marginHorizontal: h(0.7)}]} />
            <View style={styles.square} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.locatinDetail}>
          <Text>Pick up time okkkk </Text>
          <View style={styles.horizontalView}>
            <Text style={styles.nowText}>Now</Text>
            <TouchableOpacity>
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
          style={{
            flexDirection: 'row',
            padding: w(5),
            justifyContent: 'space-between',
          }}>
          <Ionicons name="ios-location-outline" size={22} color="grey" />
          <View style={styles.location}>
            <View style={{marginRight: w(2)}}>
              <Text>Current pick up location</Text>
              <Text style={styles.placeName}>{getLocation.Address}</Text>
              <Text>{`Block A, Rm 2512 Pack view Avenue, Victorial\nIsland, Lagos.`}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.refreshView}>
          <View style={styles.length} />
          <View style={{transform: [{rotate: '40deg'}]}}>
            <MaterialCommunityIcons name="sync" size={30} color="black" />
          </View>
          <View style={styles.length} />
        </View>

        {/* <CommonInputField
          onFocus = {() => navigation.navigate('PickupLocation') }
          placeholder="Enter destination address"
          inputStyle={styles.inputView}
        /> */}

        <View
          style={{
            flexDirection: 'row',
            padding: w(5),
            justifyContent: 'space-between',
          }}>
          <Image source={images.flag_image} style={{marginLeft: w(2)}} />
          <TouchableOpacity style={styles.location} onPress={() => navigation.navigate('PickupLocation')}>
            <View style={{marginRight: w(2)}}>
              <Text>Current pick up location</Text>
              <Text style={styles.placeName}>Eko International Hotel</Text>
              <Text>{`Block A, Rm 2512 Pack view Avenue, Victorial\nIsland, Lagos.`}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text style={styles.slide}>Slide to select vehicle</Text>
        {/* <VehicleSelection data={vehicle} /> */}
        {isModal && <CommonModal showModal={isModal} navigation={navigation} />}
        <View style={styles.confirmBtnView}>
          <CommonBtn
            text="Confirm"
            customBtnStyle={styles.confirmBtn}
            onPress={modalHandler}
          />
        </View>
      </View>
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
    marginTop: h(3),
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
});
