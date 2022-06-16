import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import {fs, h, w} from '../config';

const CommonModal = props => {
  const {showModal = false, navigation, modalCallback} = props;
  const [modalVisible, setModalVisible] = useState(showModal);

  const closeModel = () => {
    setModalVisible(false);
    modalCallback(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={closeModel}
              style={{
                backgroundColor: 'white',
                padding: 12,
                borderRadius: 44,
                marginTop: Platform.OS == 'ios' ? h(7) : '',
              }}>
              <Entypo name="cross" size={26} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('Orders')}>
              <Ionicons name="car-outline" size={45} color="white" />
              <Text style={{color: 'white', fontWeight: 'bold'}}> Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('Wallet')}>
              <AntDesign name="wallet" size={45} color="white" />
              <Text style={{color: 'white', fontWeight: 'bold'}}> Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('HelpCenter')}>
              <Entypo name="help-with-circle" size={45} color="white" />
              <Text style={{color: 'white', fontWeight: 'bold'}}> Help</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('Settings')}>
              <Entypo name="menu" size={45} color="white" />
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {' '}
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'flex-end',

    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    opacity: 0.6,
    paddingRight: w(4),
    paddingTop: h(1.2),
    paddingBottom: h(7),
  },

  button: {
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CommonModal;
