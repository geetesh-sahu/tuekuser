import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React,{useState,useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {colors, images} from '../../constants';
import {fs, h, height, w} from '../../config';
import CommonInputField from '../../components/CommonInputField';
import CommonBtn from '../../components/CommonBtn';
import VehicleSelection from '../../components/VehicleSelection';
import { loader } from '../../redux/actions/loader';
import { useDispatch } from 'react-redux';
import axios from 'axios';


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
  {
    image: images.vehicle_image,
    area: '500kg / 1.8*1.3*1.1cm / 2.6cbm',
    icon: <Ionicons name="chevron-forward" size={26} color="grey" />,
  },
];

const PickupTime = (props) => {
  
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
    //  dispatch({type: VEHICLE_ID,
    //      vehicleId: vehicle,
    //      // mobile_number : mobile_number
    //    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
          <Text>Pick up time </Text>
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
            borderBottomWidsssth: 2,
          }}
        />
        
        <View
          style={{
            flexDirection: 'row',
            padding: w(5),
            justifyContent: 'space-between',
          }}>
          <Ionicons name="ios-location-outline" size={22} color="grey" />
          <View style={styles.location}>
            <View style={{marginRight: w(2)}}>
              <Text>Current pick up location</Text>
              <Text style={styles.placeName}>Eko International Hotel</Text>
              <Text>{`Block A, Rm 2512 Pack view Avenue, Victorial\nIsland, Lagos.`}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.refreshView}>
          <View style={styles.length} />
          <View style={{transform: [{rotate: '40deg'}]}}>
            <MaterialCommunityIcons name="sync" size={30} color="black" />
          </View>
          <View style={styles.length} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: w(5),
            justifyContent: 'space-between',
          }}>
           <Image
            source={images.flag_image}
            style={{marginLeft: w(2)}}
          />
          <View style={styles.location}>
            <View style={{marginRight: w(2)}}>
              <Text>Current pick up location</Text>
              <Text style={styles.placeName}>Eko International Hotel</Text>
              <Text>{`Block A, Rm 2512 Pack view Avenue, Victorial\nIsland, Lagos.`}</Text>
            </View>
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
        <Text style={styles.slide}>Slide to select vehicle</Text>
        <VehicleSelection data = {vehicle} />
        <View style={styles.confirmBtnView}>
          <CommonBtn
            text="Next"
            customBtnStyle={styles.confirmBtn}
            onPress={() => props.navigation.navigate('SelectVehicle')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PickupTime;

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    backgroundColor: 'grey',
    width: 8,
    height: 8,
  },
  container2: {
    flex: 1,
    marginTop: h(1),
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
  slide: {
    alignSelf: 'center',
    marginTop: h(3),
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
