import {StyleSheet, Text, View, FlatList, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {h, w} from '../../config';

const DATA = [
  {
    image: require('../../assets/images/vehicleImage.png'),
    weight: '500kg',
    length: '1.8*1.3*1.1cm',
    area: '2.6cbm',
  },
  {
    image: require('../../assets/images/vehicleImage.png'),
    weight: '500kg',
    length: '1.8*1.3*1.1cm',
    area: '2.6cbm',
  },
  {
    image: require('../../assets/images/vehicleImage.png'),
    weight: '500kg',
    length: '1.8*1.3*1.1cm',
    area: '2.6cbm',
  },
  {
    image: require('../../assets/images/vehicleImage.png'),
    weight: '500kg',
    length: '1.8*1.3*1.1cm',
    area: '2.6cbm',
  },
  {
    image: require('../../assets/images/vehicleImage.png'),
    weight: '500kg',
    length: '1.8*1.3*1.1cm',
    area: '2.6cbm',
  },
];

const VehicleScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 13}}>
        <View style={[{marginBottom: 13}, styles.containerHeader]}>
          {/* <CustomHeader  /> */}
          <Text style={styles.titleText}>
            What kind of Vehicle do you have?
          </Text>
          <View />
        </View>
        <View style={styles.horizontalLine} />
        <FlatList
        contentContainerStyle={{ paddingBottom: h(10) }}
          data={DATA}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={()=>navigation.navigate("VehiclePicture")}>
                <View style={styles.horizontalItem}>
                  <Image source={item.image} style={styles.imageStyle} />
                  <View style={styles.container}>
                    <View>
                      <Text>{item.weight}</Text>
                      <Text style={styles.vehicleArea}>{item.length}</Text>
                      <Text>{item.area}</Text>
                    </View>
                    <View style={{marginLeft: w(5)}}>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={25}
                        color="grey"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.horizontalLine} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  horizontalItem: {
    width: '100%',
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageStyle: {
    width: 180,
    height: 200,
    resizeMode: 'contain',
  },
  vehicleArea: {
    marginTop: 3,
    marginBottom: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
    marginLeft: 12,
  },
  titleText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
