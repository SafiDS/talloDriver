import React, { useEffect, useState, useCallback, PureComponent } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { getStoreValue } from '../Tools/StoreHandler'
// import { Button } from '../components'
import {
  getUserId,
  getSchemaname,
  getAuthToken,
  getDisplayName,
  getEncryptedPass,
  getExchangeId
} from '../utils/Auth'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
    </View>
  );

}

export default HomeScreen;


const styles = StyleSheet.create({

  RoomList: { padding: 20, borderWidth: 1, borderColor: '#ccc' },
  RoomName: { padding: 10, paddingTop: 5, fontSize: 18, fontWeight: '500' }
});



