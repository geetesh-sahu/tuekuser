import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,

} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, images } from '../../constants';
import CommonBtn from '../../components/CommonBtn';
import { fs, h, w } from '../../config';
import { fontfamily } from '../../constants';
import Geolocation from 'react-native-geolocation-service';
import CheckBox from '@react-native-community/checkbox';
import { showMessage } from 'react-native-flash-message';
import Permissions, { PERMISSIONS, RESULTS } from 'react-native-permissions'

const WelcomeScreen = ({ navigation }) => {
  const [notification, setnotification] = useState(false);
  const [location, setlocation] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const permissionStatusAndroid = await Permissions.check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
      const permissionStatusiOS = await Permissions.check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      if (Platform.OS == 'android') {
        permissionStatusAndroid == 'granted' ? setlocation(true) : setlocation(false)
        permissionStatusAndroid == 'granted' && navigation.navigate('LoginScreen')
      } else {
        permissionStatusiOS == 'granted' ? setlocation(true) : setlocation(false)
        permissionStatusiOS == 'granted' && navigation.navigate('LoginScreen')
      };
    };
    checkPermissions();
  }, []);

  const locationPermission = () =>
    new Promise(async (resolve, reject) => {
      if (Platform.ios === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            setlocation(true)
            return resolve('granted');
          }
          setlocation(false)
          return reject('permission not granted');
        } catch (error) {
          setlocation(false)
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setlocation(true)
            return resolve('granted');
          }else{
            setlocation(false)
            return reject('Location Permission denied');
          }
        })
        .catch(error => {
          setlocation(false)
          return reject(error);
        });
    });

  return (
    <ScrollView style={styles.container}>
      <Image source={images.commonLogo} style={styles.appLogo} />
      <Text style={styles.heading}>Welcome to Tuketuke</Text>
      <View style={{ marginLeft: w(2) }}>
        <Text style={{ fontSize: fs(12) }}>
          By clicking Agree below , you concent to and accept
        </Text>
        <Text style={{ fontSize: fs(12) }}>our terms and conditions</Text>
      </View>

      <View style={styles.servicesContainer}>
        <View style={{ flex: 0.5 }}>
          <Image source={images.locationLogo} style={styles.horizontalImages} />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 16 }}>Location Services</Text>
          <Text
            style={
              styles.locationText
            }>{`Location accuracy allows us to better provide you\nwith more convenient and better services `}</Text>
        </View>

        <View style={{ marginTop: h(2) }}>
          <CheckBox
            tintColors={{ true: colors.hex_f56725 }}
            disabled={false}
            value={location}
            onValueChange={newValue => locationPermission(newValue)}
          // onValueChange={newValue => setlocation(newValue)}
          />
        </View>
      </View>
      <View style={styles.notification}>
        <View style={{ flex: 0.5 }}>
          <Image
            source={images.notificationLogo}
            style={styles.horizontalImages}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 16 }}>Notifications</Text>
          <Text
            style={
              styles.locationText
            }>{`Mazamaza will like to enable your notification, so we can inform you better`}</Text>
        </View>
        <View style={{ marginTop: h(2) }}>
          <CheckBox
            disabled={false}
            tintColors={{ true: colors.hex_f56725 }}
            value={notification}
            onValueChange={newValue => setnotification(newValue)}
          />
        </View>
      </View>
      <View style={{ marginTop: '40%' }}>
        <View style={{ marginLeft: 18 }}>
          <Text style={{ fontSize: 12 }}>
            I have read and accepted your terms and condition
          </Text>
          <TouchableOpacity>
            <Text style={styles.condition}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <CommonBtn
            text="Agree"
            onPress={() => location ? navigation.navigate('LoginScreen') : showMessage({ message: "Location Permission Required", type: "warning" })}
            bgColor
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  appLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  horizontalImages: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    padding: 25,
    marginTop: '16%',
  },
  heading: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 14,
    alignSelf: 'center',
    fontFamily: Platform.OS == 'android' ? fontfamily.myriad_pro_semibold : null,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '20%',
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '14%',
  },
  condition: {
    color: colors.hex_f56725,
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 12,
  },
  locationText: {
    marginTop: 2,
    fontSize: fs(11),
  },
  textStyle: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
