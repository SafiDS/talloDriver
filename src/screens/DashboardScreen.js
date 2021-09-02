import React, { useEffect, useState, useCallback, PureComponent } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Button, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

const Dashboard = () => {
  const navigation = useNavigation()
function joinRoom2(){ navigation.navigate("HomeDrawer")}
function callSinglePartner(){console.log("call single partner")}

  return (
    <ScrollView style={styles.root}>

      <View style={styles.inputField}>
        <Button
          mode="contained"
          onPress={joinRoom2}
      
          contentStyle={styles.btnContent}
      
          >
          join Room 2
        </Button>
        <Button
          mode="contained"
          onPress={callSinglePartner}
        
          contentStyle={styles.btnContent}
        >
          call Single partner
        </Button>



      </View>


    </ScrollView>
  );

}

export default Dashboard;


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  inputField: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  videoContainer: {
    flex: 1,
    // minHeight: 250,
  },
  videos: {
    width: '100%',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',

    borderRadius: 6,
  },
  localVideos: {
    height: 300,
    marginBottom: 10,
  },
  remoteVideos: {
    height: 200,
    backgroundColor: '#f2f2f2',
  },
  localVideo: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
  },
  remoteVideo: {
    backgroundColor: '#f2f2f2',
    // width:'100%',
    // height:'100%',
    height: 200,
    width: 200,
    // borderWidth: 2,
    // borderColor: 'red'
  },
});



