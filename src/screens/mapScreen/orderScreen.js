import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {fs, h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import MapView from 'react-native-maps';
import {colors} from '../../constants';
const OrderScreen = () => {
  const [bgColorOn, setbgColorOn] = useState(true);
  const [bgColorOff, setbgColorOff] = useState(true);

  const onClickBtn = a => {
    setbgColorOn(!bgColorOn);
    setbgColorOff(!bgColorOff);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.mapContainer}>
        <MapView
          //  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          //  region={{
          //    latitude: 37.78825,
          //    longitude: -122.4324,
          //    latitudeDelta: 0.015,
          //    longitudeDelta: 0.0121,
          //  }}
        ></MapView>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.orderText}>
          {`Congratulations! You have 1 order`}
        </Text>
        <View style={styles.boxView}>
          <Text style={styles.boxStyle}>
            A customer wants to move goods from :
          </Text>
          <View>
            <Text style={styles.boxStyle}>General Hospital to </Text>
            <Text style={styles.boxStyle}>Green Primary school</Text>
          </View>
        </View>
        <CommonBtn
          text="Confirm and Go >>>"
          customBtnStyle={styles.goStyle}
          customTextStyle={styles.textStyle}
        />
        <TouchableOpacity>
          <Text style={styles.slideTurn}> Cancel Order</Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <CommonBtn
            text="Turn availability to OFF"
            customBtnStyle={[
              styles.btnStyle,
              {backgroundColor: bgColorOn ? colors.hex_f66820 : 'grey'},
            ]}
            onPress={onClickBtn}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  map: {
    backgroundColor: 'red',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: h(6),
  },
  mapContainer: {
    width: '100%',
    height: '40%',
    marginTop: h(6),
  },
  orderText: {
    fontSize: fs(18),
    color: colors.hex_000000,
    fontWeight: 'bold',
    marginLeft: w(9),
  },
  btnContainer: {
    backgroundColor: colors.hex_D3D3D3,
    height: h(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    width: w(85),
    height: h(6),
    justifyContent: 'center',
  },
  slideTurn: {
    alignSelf: 'center',
    marginBottom: h(2),
  },
  boxStyle: {
    color: colors.hex_f2f2f2,
    fontSize: fs(14),
    fontWeight: 'bold',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: h(3),
  },
  boxView: {
    backgroundColor: colors.hex_f66820,
    marginHorizontal: w(9.4),
    justifyContent: 'space-between',
    height: h(18),
    paddingVertical: h(3),
    paddingHorizontal: w(5),
  },
  goStyle: {
    backgroundColor: colors.hex_32CD32,
    borderRadius: 1,
    height: h(6),
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'flex-start',
    marginLeft: w(4),
  },
});
