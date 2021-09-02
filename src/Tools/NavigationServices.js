import * as React from 'react';
import { StackActions } from '@react-navigation/native';
export const navigationRef = React.createRef();


export function navigate(...args) {
  // console.log(name, params)
  // navigationRef.current?.navigate(name, params);
  navigationRef.current?.dispatch(StackActions.push(...args));
}


export function navigateScreen(navigation,Screen){
  navigation.navigate(Screen)
}