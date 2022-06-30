import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {fs, h, regx, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loader} from '../../redux/actions/loader';
import {showMessage, hideMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import PhoneInput from 'react-native-phone-number-input';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyBzhsIqqHLkDrRiSqt94pxHJCdHHXgA464');

const LoginScreen = ({navigation}) => {
  const [number, setnumber] = useState('9754944101');
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const phoneInput = useRef("india");

  console.log('phoneInput--->>>',phoneInput)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
            console.log('json---->>>', json.results[0].address_components[6].long_name);
            const addressComponent = json.results[0].address_components;
            const addresCurrent = addressComponent
            
          })
          .catch(error => console.log('error===>>', error));
      },
      error => {
        console.log('error', error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };

  const onConfirmHandler = async () => {
    if (!number) {
      setIsError(true);
    } else {
      dispatch(loader(true));
      const string = encodeURIComponent('+');
      axios({
        url: `http://tuketuke.azurewebsites.net/api/Login/SMSNotification?Mobile_No=${string}${countryCode}${number}`,
        method: 'post',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          if (response.status == 200) {
            const {data} = response;
            if (data.status == 'Success') {
              dispatch(loader(false));
              navigation.navigate('OtpScreen', {
                loginData: data.data,
                mobileNo: number,
              });
            } else {
              dispatch(loader(false));
              showMessage({message: data.message, type: 'warning'});
            }
          } else {
            dispatch(loader(false));
            showMessage({message: response.statusText, type: 'warning'});
          }
        })
        .catch(function (error) {
          dispatch(loader(false));
          showMessage({
            message: `${error.response.status} ${error.response.statusText}`,
            type: 'danger',
            style: {padding: 93},
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
      <View style={{marginTop: 60}}>
        <View>
          <Image source={images.commonLogo} style={styles.appLogo} />
          <Text style={styles.heading}>Login to Tuketuke</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.fieldName}>Enter your number</Text>
        </View>
        <PhoneInput
          ref={phoneInput}
          defaultValue={number}
          layout="second"
          onChangeText={text => {
            setnumber(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
            setCountryCode(phoneInput.current?.state.code || '');
          }}
          countryPickerProps={{withAlphaFilter: true}}
          // disabled={disabled}

          withDarkTheme
          withShadow
          autoFocus
          containerStyle={{
            height: h(7),
            width: w(90),
            alignSelf: 'center',
          }}
          textInputStyle={{
            height: h(7),
            marginLeft: w(-3),
            fontSize: fs(16),
          }}
        />
      </View>
      <Text style={styles.otpSendText}>
        We will send you verification to this number
      </Text>
      <CommonBtn
        text="Confirm"
        onPress={onConfirmHandler}
        customBtnStyle={{padding: 12, width: 350}}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  appLogo: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 9,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  inputFieldContainer: {
    alignItems: 'center',
    marginTop: 28,
    fontSize: 19,
    marginBottom: 12,
  },
  fieldName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpSendText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 25,
    fontSize: 15,
  },
  passwordText: {
    alignSelf: 'center',
    marginTop: 22,
    fontSize: 16,
  },
});
