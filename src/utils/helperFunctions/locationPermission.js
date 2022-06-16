import {Platform, PermissionsAndroid} from 'react-native';

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.ios === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }

        return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);

        return reject(error);
      });
  });
