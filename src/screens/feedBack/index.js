import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {fs, h, w} from '../../config';
import {colors} from '../../constants';
import CommonBtn from '../../components/CommonBtn';

const DATA = [
  {name: 'Registration'},
  {name: 'Payment related'},
  {name: 'Order experience'},
  {name: 'General / Others'},
];

const FeedBack = ({navigation}) => {
  const [locationIcon, setlocationIconcon] = useState(false);

  const changeIconLoc = () => {
    setlocationIconcon(!locationIcon);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        text="Feedback"
        showLine={true}
        onPress={() => navigation.goBack()}
      />
      <View style={{marginTop: h(2)}}>
        <FlatList
          numColumns={2}
          data={DATA}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlistView}>
                <TouchableOpacity onPress={changeIconLoc}>
                  {locationIcon ? (
                    <Ionicons
                      name="checkbox"
                      size={22}
                      color={colors.hex_f66820}
                    />
                  ) : (
                    <Ionicons
                      name="ios-checkbox-sharp"
                      size={22}
                      color="grey"
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    color: colors.hex_414042,
                    fontWeight: 'bold',
                    fontSize: fs(13),
                  }}>
                  {item.name}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View>
        <View style={[styles.box, {backgroundColor: '#E9EBEE'}]}>
          <TextInput
            placeholder={`Pls type your feedback here...`}
            style={styles.btnText}
          />
        </View>
      </View>
      <CommonBtn text="Submit" customBtnStyle={styles.btn} />
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  box: {
    height: h(40),
    margin: h(0.6),
    borderRadius: 22,
    marginHorizontal: w(5),
    marginTop: h(2),
    paddingLeft: w(4),
    paddingTop: h(3),
  },
  flatlistView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    width: w(40),
    marginLeft: w(10),
  },
  btn: {
    width: w(25),
    height: h(6),
    borderRadius: 4,
  },
});
