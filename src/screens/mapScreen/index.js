import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import CommonBtn from '../../components/CommonBtn';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '../../constants';

var screenWidth = Dimensions.get('window').width;

const MapScreen = ({navigation}) => {
  const [bgColorOn, setbgColorOn] = useState(true);
  const [bgColorOff, setbgColorOff] = useState(true);

  const currIndex = useRef(0);

  const onClickOffBtn = () => {
   
  };

  const onClickOnBtn = () => {

  };

  const onClickBtn = () => {
    setbgColorOn(!bgColorOn);
    setbgColorOff(bgColorOn);
    // currIndex.current += 1;
    // this.scroll.scrollTo({x: screenWidth * currIndex.current});
  };

  const ofClickBtn = () => {
    setbgColorOff(!bgColorOff);
    setbgColorOn(bgColorOff);
    // currIndex.current -= 1;
    // this.scroll.scrollTo({x: screenWidth * currIndex.current});
  };

  // useEffect(() => {
  //   setbgColorOn(true);
  //   setbgColorOff(true);
  // }, []);

  return (
    <View style={{flex: 1}}>
    
      <View style={styles.container}>
        <CustomHeader onPress={() => navigation.goBack()} />
        <Text style={styles.headerHeading}>Select vehicle</Text>
        <View />
      </View>
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
      <View style={styles.orderView}>
        <Text
          style={
            styles.orderText
          }>{`Are you available to recieve\norders Now?`}</Text>
        <Text
          style={
            styles.automatic
          }>{`Available orders will be pushed to you\nautomatically`}</Text>
      </View>
      <View style={styles.availablity} />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={styles.slideTurn}> Slide to turn on Availablity</Text>
        <View style={styles.btnContainer}>
          <View style={styles.btnBackground}>
            <CommonBtn
              text="ON"
              customBtnStyle={[
                styles.btnStyle,
                {backgroundColor: bgColorOn ? '#989898' : colors.hex_f66820},
              ]}
              onPress={onClickBtn}
            />
            <CommonBtn
              text="OFF"
              customBtnStyle={[
                styles.btnStyle,
                {backgroundColor: bgColorOff ? '#989898' : colors.hex_f66820},
              ]}
              onPress={ofClickBtn}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerHeading: {
    marginTop: h(1),
    marginRight: h(7),
    color: 'black',
    fontSize: fs(15),
  },
  mapContainer: {
    width: '100%',
    height: '50%',
    marginTop: h(1),
  },
  orderView: {
    marginLeft: w(10),
    marginTop: h(4),
  },
  orderText: {
    fontSize: fs(22),
    color: 'black',
    fontWeight: 'bold',
  },
  availablity: {
    borderBottomWidth: w(1),
    borderBottomColor: 'lightgrey',
    marginTop: h(4),
  },
  automatic: {
    fontSize: fs(16),
    marginTop: h(1),
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    height: h(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    width: w(44),
    height: h(6),
    justifyContent: 'center',
  },
  slideTurn: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    marginBottom: h(1),
  },
  btnBackground: {
    backgroundColor: '#989898',
    flexDirection: 'row',
    borderRadius: 12,
  },
});
