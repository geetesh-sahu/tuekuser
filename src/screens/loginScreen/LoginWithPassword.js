import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, images} from '../../constants';
import CommonInputField from '../../components/CommonInputField';
import {h} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginWithPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
      <View style={{marginTop: 40}}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Enter your number</Text>
        </View>
        <CommonInputField placeholder="Enter your phone number" />
        <View style={{marginTop: 22}}>
          <CommonInputField placeholder="Enter your password" />
        </View>
      </View>

      <View style={{marginTop: 48}}>
        <CommonBtn text="Confirm" onPress={()=> navigation.navigate("VehicleScreen")} />
      </View>
      <View style={styles.confirmBtn}>
      <TouchableOpacity >
        <Text style={{fontSize: 16}}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={{fontSize: 16}}>Forgot password</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginWithPassword;

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
  headingView: {
    alignItems: 'center',
    marginTop: 28,
    fontSize: 19,
    marginBottom: 42,
  },
  confirmBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320,
    alignSelf: 'center',
    marginTop: 15,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
