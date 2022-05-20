import {StyleSheet, Text, View, Switch, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {h, w, fs} from '../../config/index';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {colors} from '../../constants/index';

const Settings = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        text="Settings"
        showLine={true}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 2}}>
        <View style={[styles.ngnView, {alignItems: 'center'}]}>
          <View>
            <Text style={[styles.ngnText]}>Change Password</Text>
            <Text
              style={{
                marginTop: h(1),
              }}>{`if you have already set a password click here to change\nthe password`}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.hex_414042}
          />
        </View>
        <View style={styles.ngnView}>
          <Text style={[styles.ngnText, {marginTop: h(2)}]}>
            Auto receive e-receipts
          </Text>
          <View style={styles.threeRowItem}>
            <Switch
              trackColor={{false: 'lightgrey', true: '#81b0ff'}}
              // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={[styles.rowItem]}
            />
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.hex_414042}
            />
          </View>
        </View>
        <View style={[styles.ngnView, {marginTop: h(8)}]}>
          <Text style={[styles.ngnText]}>User Agreement</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.hex_414042}
          />
        </View>
        <View style={styles.ngnView}>
          <Text style={[styles.ngnText]}>Privacy Policy</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.hex_414042}
          />
        </View>
        <View style={styles.ngnView}>
          <Text style={[styles.ngnText]}>Standard Rates</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.hex_414042}
          />
        </View>
        <View style={styles.ngnView}>
          <Text style={[styles.ngnText]}>About us</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.rowItem}>v 1.0.2</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.hex_414042}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={{}}>
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  ngnView: {
    flexDirection: 'row',
    marginHorizontal: w(3),
    justifyContent: 'space-between',
    marginTop: h(3),
  },
  ngnText: {
    fontSize: fs(14),
    color: colors.hex_414042,
    fontWeight: 'bold',
  },
  rowItem: {
    marginRight: w(2),
  },
  threeRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: h(3),
  },
  btnText: {
    color: colors.hex_f66820,
    fontWeight: '400',
    fontSize: fs(14),
  },
});
