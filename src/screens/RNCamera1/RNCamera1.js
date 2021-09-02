'use strict';
import React,{PureComponent} from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { navigate, navigateScreen } from '../../Tools/NavigationServices';
import { getItemFromStorage,saveToStorage } from "../../utils/AccessStorage";


export default function RNCamera1({ navigation }) {

  const camera = React.useRef(null);





    return(
      <View style={styles.container}>
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>

          
            
            {/* <Text
            style={styles.capture}
            onPress={this.changeCameraType.bind(this)}
          >
            switch
          </Text> */}
        </View>
      </View>
    );



    async function takePicture() {
      if (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.current.takePictureAsync(options);
        console.log(data.uri);
       // console.log(data.base64);
        saveToStorage("uri_from_RNCamera",data.uri);
        saveToStorage("isRNCamera","true");
        // alert(await getItemFromStorage("isRNCamera"));
        // this.props.navigation.goBack() 
        navigation.goBack(null)
        // navigate("RiderStatusOnline",{uri_from_RNCamera:data.uri})
        // alert('data.uri::'+data.uri);
        // alert('data.base64::'+data.base64);
      }
    }
  }

  // changeCameraType() {
  //   if (this.state.type  === RNCamera.Constants.Type.back) {
  //     this.setState({
  //       type: RNCamera.Constants.Type.front,
  //       mirrorMode: true
  //     });
  //   } else {
  //     this.setState({
  //       type: RNCamera.Constants.Type.back,
  //       mirrorMode: false
  //     });
  //   }
  // }
  





  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });


