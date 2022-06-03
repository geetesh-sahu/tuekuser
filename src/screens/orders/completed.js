// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   Image,
// } from 'react-native';
// import React, {useCallback, useRef, useMemo} from 'react';
// import {Card, Title, Paragraph} from 'react-native-paper';
// import {fs, h, w} from '../../config';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// import Entypo from 'react-native-vector-icons/dist/Entypo';
// import {colors, images} from '../../constants';
// import CommonBottomSheet from '../../components/CommonBottomSheet';
// import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

// const DATA = [{name: 'geetesh'}, {name: 'geetesh'}, {name: 'geetesh'}];

// const Completed = (props) => {
//   const sheetRef = useRef(null);

//   // variables
//   const data = useMemo(
//     () =>
//       Array(50)
//         .fill(0)
//         .map((_, index) => `index-${index}`),
//     [],
//   );
//   const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

//   // callbacks
//   const handleSheetChange = useCallback(index => {
//     console.log('handleSheetChange', index);
//   }, []);
//   const handleSnapPress = useCallback(index => {
//     sheetRef.current?.snapToIndex(index);
//   }, []);
//   const handleClosePress = useCallback(() => {
//     sheetRef.current?.close();
//   }, []);

//   return (
//     <View style={{flex: 1, padding: h(2)}}>
//       <FlatList
//         data={DATA}
//         renderItem={({item}) => {
//           return (
//             <Card style={styles.cardContainer}>
//               <Card.Content>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   <Title>25/08/2021</Title>
//                   <Title>Total : NGN68</Title>
//                 </View>
//                 <View style={styles.time}>
//                   <Ionicons name="time" size={20} color="grey" />
//                   <Paragraph>11:49 - 13:05</Paragraph>
//                 </View>
//                 <View style={styles.container}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <View style={{alignItems: 'center'}}>
//                       <Entypo name="dot-single" size={32} color="green" />
//                       <View style={styles.verticleLine} />
//                       <Entypo name="dot-single" size={32} color="red" />
//                     </View>
//                     <View style={styles.locationArea}>
//                       <Text style={[styles.placeName, {marginBottom: h(1.5)}]}>
//                         New York University - North gate
//                       </Text>

//                       <Text style={styles.placeName}>
//                         Women and Children Hospital
//                       </Text>
//                     </View>
//                   </View>
//                   <TouchableOpacity onPress={() => handleSnapPress(2)}>
//                     <Ionicons name="chevron-forward" size={30} color="grey" />
//                   </TouchableOpacity>
//                 </View>
//                 <View
//                   style={styles.vanBox}>
//                   <View style={styles.van}>
//                     <Image
//                       source={images.vehicle_image}
//                       style={[styles.flatlistImage]}
//                       resizeMode="contain"
//                     />
//                     <Text>Mini van</Text>
//                   </View>
//                   <TouchableOpacity>
//                     <Text style={styles.repeat}>Repeat order</Text>
//                   </TouchableOpacity>
//                 </View>
//               </Card.Content>
//             </Card>
//           );
//         }}
//       />

//       {/* <BottomSheet
//         ref={sheetRef}
//         snapPoints={snapPoints}
//         onChange={handleSheetChange}
//          enablePanDownToClose = {true}
//         >
          
//         <TouchableOpacity onPress={() => handleClosePress()}>
       
//           <CommonBottomSheet onPress={()=>props.navigation.navigate("Invoice")} navigation={props.navigation}  />
//         </TouchableOpacity>
//       </BottomSheet> */}
       

       
//     </View>
//   );
// };

// export default Completed;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: h(3),
//     justifyContent: 'space-between',
//   },
//   verticleLine: {
//     height: h(3.5),
//     width: 1,
//     backgroundColor: 'black',
//     marginVertical: h(-6),
//   },
//   flatlistImage: {
//     width: 80,
//     height: 40,
//     alignSelf: 'center',
//   },
//   repeat: {
//     color: colors.hex_f56725,
//     fontSize: fs(15),
//     fontWeight: 'bold',
//   },
//   van: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   cardContainer: {
//     height: 210,
//     borderRadius: 18,
//     marginTop: w(1.5),
//   },
//   time:{
//     flexDirection: 'row', 
//     alignItems: 'center'
//   },
//   vanBox:{
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: h(2),
//   }
// });



import React, { useState } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { deviceHeight } from '../helpers/constants';

import BottomContainer from '../../components/BottomContainer';
import ImageContainer from '../../components/ImageContainer';
import { LoadingAtom } from '../../components/LoadingAtom';

const Completed = (props) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const imageSource = 'https://images.unsplash.com/photo-1591187194794-1860cc81437c';
  const placeHolderContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <View style={[styles.container]}>
     
      <SafeAreaView>
        <ImageContainer
          scrollY={scrollY}
          imageSource={imageSource}
          imageHeight={450}
        />
        <BottomContainer
          scrollY={scrollY}
          imageHeight={450}
        >
          <View style={{
            marginTop: 40,
            marginLeft: 20,
            marginRight: 20,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
            {/* {
              placeHolderContent.map((item, index) => <LoadingAtom key={item} />)
            } */}
          </View>
        </BottomContainer>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // display: 'flex',
     flex: 1,
    // height: "100%",
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
})

export default Completed;