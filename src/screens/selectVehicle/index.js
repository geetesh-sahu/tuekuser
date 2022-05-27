import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import VehicleSelection from '../../components/VehicleSelection';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import CommonBtn from '../../components/CommonBtn';
import {images} from '../../constants';
import {loader} from '../../redux/actions/loader';
import {useDispatch} from 'react-redux';
import axios from 'axios';

const SelectVehicle = props => {
  console.log('props===>>>', props.route.params.destionationL.cityName);
  const [vehicle, setvehicle] = useState('');

  const currentL = props.route.params.currentL.Address;
  const destinationL = props.route.params.destionationL.cityName;

  const dispatch = useDispatch();

  useEffect(() => {
    vehicleList();
  }, []);

  const vehicleList =async () => {
    console.log('async');
    dispatch(loader(true));
    axios.get('http://tuketuke.azurewebsites.net/api/VehicleList/VehicleList')
      .then(function (response) {
        dispatch(loader(false));
        setvehicle(response.data.data);
      })
      .catch(function (error) {
        console.log('error===>>', error);

        dispatch(loader(false));
      });
   
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        onPress={() => props.navigation.goBack()}
        text="Select vehicle"
        showLine={true}
      />
      <ScrollView>
        <VehicleSelection
          data={vehicle}
          // vehicleContianer={{opacity: isIMageOpacity ? 0.5 : 1}}
          // opacityCallback={handlerOpacity}
        />
        <View
          style={[
            styles.horizontalLine,
            {marginTop: h(1), borderBottomWidth: w(1)},
          ]}
        />
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Ionicons name="ios-location-outline" size={22} color="green" />
            <View style={styles.verticleLine} />
            <Image source={images.flag_image} style={{marginLeft: w(3)}} />
          </View>
          <View style={styles.locationArea}>
            <TouchableOpacity style={styles.horizontal}>
              <Text style={styles.placeName}>{currentL}</Text>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
            <View style={[styles.horizontalLine, {marginVertical: h(2)}]} />
            <TouchableOpacity style={styles.horizontal}>
              <Text style={styles.placeName}>{destinationL}</Text>
              <Ionicons name="chevron-forward" size={26} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.horizontalLine,
            {marginTop: h(1), borderBottomWidth: w(3)},
          ]}
        />
        <View style={styles.horizontalBox}>
          <Text style={{marginLeft: w(4)}}>08066845214</Text>
          <View style={styles.textWithIcon}>
            <Text style={{fontSize: fs(10)}}>Select from contact</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={30} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.horizontalLine]} />
        <View style={styles.horizontalBox}>
          <View style={styles.textWithIcon}>
            <AntDesign name="user" size={25} />
            <TextInput
              placeholder={`Reciever's Number`}
              placeholderTextColor="lightgrey"
              style={{paddingLeft: 12}}
            />
          </View>
          <View style={styles.textWithIcon}>
            <Text style={{fontSize: fs(10)}}>Select from contact</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={30} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.horizontalLine]} />
        <View style={styles.NameInput}>
          <AntDesign name="user" size={25} />
          <TextInput
            placeholder="Name"
            placeholderTextColor={'lightgrey'}
            style={{paddingLeft: 12}}
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
          <Text style={styles.number}> N4,000</Text>
        </View>
        <View style={styles.confirmBtnView}>
          <CommonBtn
            text="Confirm"
            customBtnStyle={styles.confirmBtn}
            onPress={() => props.navigation.navigate('Payment')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  verticleLine: {
    height: h(6),
    width: 1,
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
    fontWeight: '100',
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
