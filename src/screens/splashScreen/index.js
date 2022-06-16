import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import {colors, images} from '../../constants';

const SplashScreen = ({navigation}) => {
 

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={images.appBackgroundImgae}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <Image source={images.initialLogo} style={styles.logoImage} />
        </View>
        <Text style={styles.textName}>Tuketuke</Text>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logoImage: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textName: {
    color: 'black',
    fontSize: 29,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
