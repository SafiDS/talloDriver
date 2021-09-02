import React, { useEffect, useState, useCallback, PureComponent } from 'react';
import { View, StyleSheet, Alert, ScrollView, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
// import { Button } from '../components'
import {
  getUserId,
  getSchemaname,
  getAuthToken,
  getDisplayName,
  getEncryptedPass,
  getExchangeId
} from '../utils/Auth'
import { useFocusEffect } from '@react-navigation/native'
import { Button, TextInput, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStoreValue } from '../Tools/StoreHandler'




const CallingScreen = ({ navigation }) => {

  return (
    <View style={styles.root}>
      <Text>calaling Screen</Text>
    </View >
  );

}

export default CallingScreen;


const styles = StyleSheet.create({

  MuteMicroPone: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  root: {
    flex: 1,
  },
  inputField: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  remoteVideobottom: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    bottom: 6,
  },
  userVideo: {
    flex: 1
  },
  remoteVideo: {
    height: 100,
    width: 100,
    zIndex: 10,
    borderRadius: 25,

  },
  remoteVideo_right: {
    height: 150,
    width: 100,
    zIndex: 10,
    borderRadius: 25,
    position: 'absolute',
    right: 15,
    top: 15,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden'


  },
});



