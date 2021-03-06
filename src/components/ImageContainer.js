import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useCallback, useRef, useMemo} from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {fs, h, w} from '../config';
import {colors, images} from '../constants';
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import CommonBottomSheet from './CommonBottomSheet';


const DATA = [
  {name: 'geetesh'},
  {name: 'geetesh'},
  {name: 'geetesh'},
  {name: 'geetesh'},
  {name: 'geetesh'},
];

const ImageContainer = props => {
  const [visible, setVisible] = React.useState(false);
  const {navigation} = props;

  const getDriverDetail = () => {
    navigation.navigate('DriverDetials');
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View style={styles.topImage}>
      <FlatList
        data={DATA}
        renderItem={({item}) => {
          return (
            <Card style={styles.cardContainer}>
              <TouchableOpacity
                //  onPress={getDriverDetail}
                onPress={showModal}>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Title>25/08/2021</Title>
                    <Title>Total : NGN68</Title>
                  </View>
                  <View style={styles.time}>
                    <Ionicons name="time" size={20} color="grey" />
                    <Paragraph>11:49 - 13:05</Paragraph>
                  </View>
                  <View style={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{alignItems: 'center'}}>
                        <Entypo name="dot-single" size={32} color="green" />
                        <View style={styles.verticleLine} />
                        <Entypo name="dot-single" size={32} color="red" />
                      </View>
                      <View style={styles.locationArea}>
                        <Text
                          style={[styles.placeName, {marginBottom: h(1.5)}]}>
                          New York University - North gate
                        </Text>

                        <Text style={styles.placeName}>
                          Women and Children Hospital
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Ionicons name="chevron-forward" size={30} color="grey" />
                    </View>
                  </View>
                  <View style={styles.vanBox}>
                    <View style={styles.van}>
                      <Image
                        source={images.vehicle_image}
                        style={[styles.flatlistImage]}
                        resizeMode="contain"
                      />
                      <Text>Mini van</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.repeat}>Repeat order</Text>
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          );
        }}
      />
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <CommonBottomSheet />
          </Modal>
        </Portal>
        <Button style={{marginTop: 30}}>Show</Button>
      </Provider>
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: h(3),
    justifyContent: 'space-between',
  },
  verticleLine: {
    height: h(3.5),
    width: 1,
    backgroundColor: 'black',
    marginVertical: h(-6),
  },
  flatlistImage: {
    width: 80,
    height: 40,
    alignSelf: 'center',
  },
  repeat: {
    color: colors.hex_f56725,
    fontSize: fs(15),
    fontWeight: 'bold',
  },
  van: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardContainer: {
    height: 210,
    borderRadius: 18,
    marginTop: w(1.5),
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vanBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: h(2),
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    // height: 550,
  },
});
