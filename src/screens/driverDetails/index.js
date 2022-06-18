import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {fs, h, w} from '../../config';
import {colors} from '../../constants';

const WATER_IMAGE = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkHK4tn0fKZbcyg6lx2v7ighpcpbvrTwv2-A&usqp=CAU',
};

const DriverDetials = props => {
  const {onPress, navigation} = props;
  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image
              size={44}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrhaI7vfTBudbQHrVKG4z25Rwl2l5buTAPHA&usqp=CAU',
              }}
            />
            <Text
              style={{
                marginLeft: h(1),
                fontSize: fs(16),
                color: colors.hex_414042,
                fontWeight: 'bold',
              }}>
              Mr. Donald Trump
            </Text>
          </View>
          <Text> New York M3598P</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: h(2),
          }}>
          <Rating
            type="custom"
            ratingImage={WATER_IMAGE}
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
            ratingCount={5}
            imageSize={25}
            // onFinishRating={this.ratingCompleted}
            style={{paddingVertical: 1}}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: fs(13),
                color: colors.hex_414042,
                marginRight: w(1),
              }}>
              Message
            </Text>
            <MaterialCommunityIcons
              name="message-processing"
              size={17}
              color="grey"
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: fs(13),
                color: colors.hex_414042,
                marginRight: w(1),
              }}>
              Call
            </Text>
            <Ionicons name="call" size={12} color="grey" />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 2,
            marginHorizontal: h(3),
            marginTop: h(2),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: h(2),
          }}>
          <Text
            style={{
              backgroundColor: 'lightgrey',
              padding: 8,
              borderRadius: 22,
            }}>
            Report Driver
          </Text>
          <Text
            style={{
              backgroundColor: 'lightgrey',
              padding: 8,
              borderRadius: 22,
            }}>
            Repeat order with driver
          </Text>
        </View>
        <View style={{marginLeft: h(5), marginTop: h(3)}}>
          <View>
            <Text
              style={{
                color: colors.hex_414042,
                fontWeight: 'bold',
                fontSize: fs(13),
              }}>
              25/08/2021
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="time" size={18} color="grey" />
              <Text>11:49 - 13:05</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginVertical: h(2)}}>
            <View style={[styles.circle, {backgroundColor: 'green'}]} />
            <View>
              <Text
                style={{
                  fontSize: fs(13),
                  color: colors.hex_414042,
                  marginLeft: w(2),
                }}>
                New York University - North gate
              </Text>
              <Text
                style={{
                  marginLeft: w(2),
                }}>{`No. 423, Sunrise street, New York\nPeter Smith - 08033667721`}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.circle} />
            <View>
              <Text
                style={{
                  fontSize: fs(13),
                  color: colors.hex_414042,
                  marginLeft: w(2),
                }}>
                New York University - North gate
              </Text>
              <Text
                style={{
                  marginLeft: w(2),
                }}>{`No. 423, Sunrise street, New York\nPeter Smith - 08033667721`}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 2,
            marginHorizontal: h(3),
            marginTop: h(3),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: w(10),
            marginTop: h(2),
          }}>
          <Text style={{fontSize: fs(18), color: 'black', fontWeight: '600'}}>
            Total: NGN500
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.navigate('Invoice')}>
            <Text style={{color: colors.hex_414042, fontSize: fs(15)}}>
              Invoice
            </Text>
            <Ionicons name="chevron-forward" size={30} color="grey" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: h(1),
          }}>
          <Text> Payment method</Text>
          <Text>Credit card: xxxxx4258</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 2,
            marginHorizontal: h(3),
            marginTop: h(1),
          }}
        />
        <View style={{marginHorizontal: h(6), marginTop: h(2)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text> Order number</Text>
            <Text style={{color: colors.hex_414042, fontSize: fs(13)}}>
              15873302050021800753
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Type of vehicle</Text>
            <Text style={{color: colors.hex_414042, fontSize: fs(13)}}>
              Mini van
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Contact person</Text>
            <Text style={{color: colors.hex_414042, fontSize: fs(13)}}>
              Joseph Biden
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DriverDetials;

const styles = StyleSheet.create({
  circle: {
    height: 8,
    width: 8,
    borderRadius: 50,
    backgroundColor: 'red',
    marginTop: h(1),
  },
});
