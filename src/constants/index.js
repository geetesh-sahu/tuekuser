import {Platform} from 'react-native';

export const BASE_URL = '';

export const fontfamily = Platform.select({
  android: {
     myriad_pro_semibold: 'Myriad-Pro-Semibold',
  },
  ios: {
    myriad_pro_semibold: 'Myriad-Pro-Semibold',
  },
});

export const images = {
   initialLogo: require("../assets/images/initialLogo.png"),
   commonLogo : require("../assets/images/commonLogo.png"),
   locationLogo: require('../assets/images/locationLogo.png'),
   notificationLogo : require("../assets/images/notificationLogo.png"),
   appBackgroundImgae:require("../assets/images/bg_shape.png")
};

export const colors = {
  hex_f66820: '#f66820',
  hex_f56725: '#f56725',
  hex_f2f2f2: "#f2f2f2",
  hex_32CD32: '#32CD32',
  hex_D3D3D3: "#D3D3D3",
  hex_000000: "#000000"
};
