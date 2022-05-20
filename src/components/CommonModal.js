import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import {fs, h, w} from '../config';

const CommonModal = props => {
  const {showModal = false, navigation} = props;
  const [modalVisible, setModalVisible] = useState(showModal);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{backgroundColor: 'white', padding: 12, borderRadius: 44}}>
              <Entypo name="cross" size={26} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('Orders')}>
              <Ionicons name="car-outline" size={45} color="white" />
              <Text style={{color:'white'}}> Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('Wallet')}>
              <AntDesign name="wallet" size={45} color="white" />
              <Text style={{color:'white'}}> Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('HelpCenter')}>
              <Entypo name="help-with-circle" size={45} color="white" />
              <Text style={{color:'white'}}> Help</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('Settings')}>
              <Entypo name="menu" size={45} color="white" />
              <Text style={{color:'white'}}> Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: 'flex-end',
    // marginTop: 22
    padding: w(8),
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
