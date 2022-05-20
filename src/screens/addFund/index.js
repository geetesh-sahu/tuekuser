import {StyleSheet, Text, View, FlatList, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {fs, h, w} from '../../config';
import {colors} from '../../constants';

const AddFund = ({navigation}) => {
  const [colorText, setColorText] = useState(false);
  const [bgBtn, setBgBtn] = useState(false);
  const [listData, setListData] = useState([
    {
      id: 0,
      heading: 'NGN 1,500',
      selected: false,
    },
    {
      id: 1,
      heading: 'NGN 1,500',
      text: 'Get NGN 300 off your orders *',
      selected: false,
    },
    {
      id: 2,
      heading: 'NGN 1,500',
      text: 'Get NGN 500 off your orders *',
      selected: false,
    },
    {
      id: 3,
      heading: 'NGN 1,500',
      text: 'Get NGN 1,000 off your orders *',
      selected: false,
    },
    {
      id: 4,
      heading: 'NGN 1,500',
      text: 'Get NGN 1,000 off your orders *',
      selected: false,
    },
  ]);

  const selectItem = item => {
    let nextState = listData.map(isItem =>
      isItem.id === item.id
        ? {...isItem, selected: true}
        : {...isItem, selected: false},
    );
    setListData(nextState);
    setBgBtn(true);
    setColorText(true);
  };

  const addFundHandler = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        text="Add Fund"
        showLine={true}
        onPress={() => navigation.goBack()}
      />

      <FlatList
        data={listData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[
                styles.box2,
                {
                  backgroundColor: item.selected ? '#F26624' : 'lightgrey',
                  height: item.id === 0 ? h(12) : h(14),
                },
              ]}
              onPress={() => selectItem(item)}>
              <Text style={styles.textStyle(colorText)}>{item.heading}</Text>
              <Text style={{color: colorText ? 'white' : "#98C057", marginTop: h(1)}}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text style={styles.couponsText}>* All coupons valid for 30 days</Text>

      <TouchableOpacity
        style={[styles.btn, {backgroundColor: !bgBtn ? '#E9EBEE' : '#F26624'}]}
        onPress={addFundHandler}>
        <Text style={[styles.btnText, {color: colorText ? 'white' : 'black'}]}>
          Add Fund
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddFund;

const styles = StyleSheet.create({
  box2: {
    height: h(14),
    margin: h(0.6),
    borderRadius: 18,
    justifyContent: 'center',
    paddingLeft: w(12),
    marginHorizontal: w(5),
  },
  btn: {
    backgroundColor: '#E9EBEE',
    height: h(7),
    margin: h(4),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: w(5),
  },
  textStyle: (colorText) => ({
    fontSize: fs(22),
    color: colorText ? "white" : colors.hex_414042,
    fontWeight: '600',
    justifyContent: 'center',
  }),
  btnText: {
    fontSize: fs(16),
    fontWeight: '600',
  },
  couponsText: {
    marginLeft: w(16),
  },
});
