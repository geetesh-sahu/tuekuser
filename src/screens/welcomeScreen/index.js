import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {colors, images} from '../../constants';
import CommonBtn from '../../components/CommonBtn';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {h} from '../../config';
import {fontfamily} from '../../constants';

const WelcomeScreen = ({navigation}) => {
  const [locationIcon, setlocationIconcon] = useState(false);
  const [notificationIcon, setnotificationIcon] = useState(false);

  const changeIconLoc = () => {
    setlocationIconcon(!locationIcon);
  };

  const changeIconNot = () => {
    setnotificationIcon(!notificationIcon);
  };

  return (
    <View style={styles.container}>
      <Image source={images.commonLogo} style={styles.appLogo} />
      <Text style={styles.heading}>Welcome to Tuketuke</Text>
      <Text style={styles.textStyle}>
        {`By clicking Agree below , you concent to and accept \nour terms and conditions`}{' '}
      </Text>

      <View style={styles.servicesContainer}>
        <View style={{flex: 0.5}}>
          <Image source={images.locationLogo} style={styles.horizontalImages} />
        </View>
        <View style={{flex: 4}}>
          <Text style={{fontSize: 16}}>Location Services</Text>
          <Text
            style={
              styles.locationText
            }>{`Location accuracy allows us to better provide you\nwith more convenient and better services `}</Text>
        </View>

        <View style={{marginTop: h(2)}}>
          <TouchableOpacity onPress={changeIconLoc}>
            {locationIcon ? (
              <Ionicons name="checkbox" size={22} color={colors.hex_f66820} />
            ) : (
              <Ionicons name="ios-checkbox-sharp" size={22} color='grey' />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.notification}>
        <View style={{flex: 0.5}}>
          <Image
            source={images.notificationLogo}
            style={styles.horizontalImages}
          />
        </View>
        <View style={{flex: 4}}>
          <Text style={{fontSize: 16}}>Notifications</Text>
          <Text style={styles.locationText}>
            {' '}
            {`Location accuracy allows us to better provide you\nwith more convenient and better services `}
          </Text>
        </View>
        <View style={{marginTop: h(2)}}>
          <TouchableOpacity onPress={changeIconNot}>
            {notificationIcon ? (
              <Ionicons name="checkbox" size={22} color={colors.hex_f66820} />
            ) : (
              <Ionicons name="ios-checkbox-sharp" size={22} color='grey' />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: '40%'}}>
        <View style={{marginLeft: 18}}>
          <Text style={{fontSize: 12}}>
            I have read and accepted your terms and condition
          </Text>
          <TouchableOpacity>
            <Text style={styles.condition}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <CommonBtn
            text="Agree"
            onPress={() => navigation.navigate('LoginWithNumber')}
            customBtnStyle={{padding:12,width:370}}
          />
        </View>
      </View>
    </View>
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
    fontFamily: fontfamily.myriad_pro_semibold,
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
    fontSize: 12,
  },
  textStyle: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
