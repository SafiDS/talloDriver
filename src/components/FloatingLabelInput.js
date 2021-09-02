import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Animated,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class FloatingLabelInput extends Component {
 
  UNSAFE_componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }


  // componentDidUpdate() {
  //   Animated.timing(this._animatedIsFocused, {
  //     toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
  //     duration: 200,
  //   }).start();
  // }

  render() {
    Icon.loadFont();
    const { label,isFocused, ...props } = this.props;
  
    const labelStyle = {
      position: 'absolute',
      left: 0,
      paddingLeft:30,
      top: isFocused ?this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
        duration: 2000
      }):18,
      fontSize: isFocused ?this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 10],
        duration: 2000
      }):15,
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#fff', '#fff'],
        duration: 2000
      }),
    };
    return (
      <View style={{ paddingTop: 0,marginTop:10,marginBottom:10,height:60 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        {
          
          props.Icon &&<Text style={{borderWidth:2}}> <Icon style={{ color: 'white', fontSize: 15,marginTop:18, fontWeight: '800' }} name={props.Icon} /></Text>
        }
        <TextInput
          {...props}
          style={{ fontSize: 20,paddingLeft:35, color: '#fff', borderBottomWidth: 1, borderBottomColor: '#fff' }}
          onFocus={() => this.props.handleFocus(this.props.value, this.props.name)}
          onBlur={() => this.props.handleBlur(this.props.value, this.props.name)}
          onChangeText={(text) => this.props.HandleChange(text, this.props.name)}
          blurOnSubmit
    
        />
      </View>
    );
  }
}


export default FloatingLabelInput;