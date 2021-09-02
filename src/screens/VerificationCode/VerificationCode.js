import React from "react";
import PropTypes from 'prop-types'
import { View, Text, Keyboard, LayoutAnimation, Platform} from "react-native";
import Styles from "./VerificationCode.style";
// import { Images, Metrics, Colors } from "Themes";
// import Locales from 'Locales'
import LinearGradient from "react-native-linear-gradient";
import SmoothPinCodeInput from './SmoothPinCodeInput';
// import { Actions } from "react-native-router-flux";
import {saveToStorage, getItemFromStorage, removeFromStorage} from '../../utils/AccessStorage'
// import tinycolor from 'tinycolor2';
import { checkPermission } from 'Utils/User'
// import VoipPushNotification from 'react-native-voip-push-notification';

export default class VerificationCode extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
		pinCodeRegister: PropTypes.func,
		pinCodeConfirm: PropTypes.func,
		pinCodeCheck: PropTypes.func,
	};

	pinInput = React.createRef();
	isAttempting = false;
	keyboardDidShowListener = {};
	keyboardDidHideListener = {};

	constructor(props) {
		super(props);
		this.state = {
			visibleHeight: Metrics.screenHeight,
			topLogo: { width: Metrics.screenWidth - 40 },
			pinCodeText: '',
			code: '',
			confirmCode: '',
			attemptNum: 0,
			confirmStatus: -1,
			startColor: Colors.gradientStart,
			endColor: Colors.gradientEnd,
			dismatch: false
		};
		this.isAttempting = false;

		console.disableYellowBox = true;

		this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
	}

	getCurrentSelTheme = (themeColors) => {
		
		for(i = 0; i < themeColors.length; i += 1){
		  if(themeColors[i].selected == true){
			this.setState({
			  startColor: tinycolor(themeColors[i].primary).desaturate(10).brighten(25).darken(10).toString(),
			  endColor:tinycolor(themeColors[i].primary).desaturate(10).brighten(20).darken(20).toString(),
			  loginButton:tinycolor(themeColors[i].primary).desaturate(10).brighten(30).darken(20).toString(),
			})
		  }
			
		}
	}

	async componentWillMount(){
		const themeColors = JSON.parse(await getItemFromStorage('themeColors'))
		this.getCurrentSelTheme(themeColors)
		if(Platform.OS === 'ios'){
			VoipPushNotification.requestPermissions(); // required
		
			VoipPushNotification.addEventListener('register', this._onRegister)
		}
	}
	
	_onRegister(token) {
    this.setState({
      pushId: token
    })
	}
	
	componentWillUnmount () {
		if(Platform.OS === 'ios')
    	VoipPushNotification.removeEventListener('register', this._onRegister)
  }

	async componentDidMount () {
		try {
			
			const value = await getItemFromStorage('is_logged');
			console.warn('-----------------'+ JSON.stringify(value) +'-------------------------------------')
			if (value && value === 'true') {
				this.setState({ pinCodeText: Locales.t('check_pincode')})
			}else{
				this.setState({ pinCodeText: Locales.t('set_pincode')})
				removeFromStorage('confrim')
			}
			
		} catch (error) {
		// Error retrieving data
		return null
		}
	}
	
	keyboardDidShow = e => {
		// Animation types easeInEaseOut/linear/spring
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		let newSize = Metrics.screenHeight - e.endCoordinates.height;
		this.setState({
			visibleHeight: newSize,
			topLogo: { width: 100, height: 70 },
		});
	};

	keyboardDidHide = e => {
		// Animation types easeInEaseOut/linear/spring
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({
			visibleHeight: Metrics.screenHeight,
			topLogo: { width: Metrics.screenWidth - 40 },
		});
	};

	
	async checkPincode(code){
		// verify pincode with user auth
		const pinCode = await getItemFromStorage('pincode')
		if(pinCode == code){//check pin code
//			Actions.replace('mainTabContainer')
			if(await checkPermission())
				Actions.replace('mainTabContainer')
			/*const fcmToken = await firebase.messaging().getToken();
			if (fcmToken) {
				// user has a device token
				//console.log('Firebase Token generated ' + fcmToken)
				saveToStorage('fcmToken', 'ANDROID-' + fcmToken)
				Actions.replace('mainTabContainer')
			} else {
				Alert.alert('Can\'t create fcm token')
			}*/
			removeFromStorage('confirm');
		}else{//pin code dismatch
			this.setState({
				dismatch: true
			})
			this.pinInput.current.shake()
			.then(() => this.setState({ code: '' }));
			if(this.state.attemptNum <= 2){// pin code dismatch 3 times
				currentAttemp = this.state.attemptNum
				this.setState({attemptNum: currentAttemp + 1})
			}else{
				this.setState({attemptNum: 0})
				this.props.logout();
			}
		}
	}

	registerPincode(code){
		//get user registered pin code for confirm
		if(this.state.confirmStatus == 1){//registered pin code
			if(this.state.confirmCode == code){
				//After confirm pin code , register on server
				this.props.pinCodeRegister(code)
			}else{
				this.pinInput.current.shake()
				.then(() => this.setState({ code: '' }));
			}
		}else{//not registered pin code
			this.setState({
				confirmStatus: 1,
				confirmCode: code
			})
			this.setState({pinCodeText: Locales.t('confirm_pincode')})
			this.setState({ code: '' });
		}
	}
	
	handleVerificationCode = async(code) =>{
		this.isAttempting = true
		
		const value = await getItemFromStorage('is_logged');
		if (value && value === 'true') {//user login state
			
			this.checkPincode(code)
		}else{// user login now
			this.registerPincode(code)
		}
	};


	render() {
		const {code} = this.state
		const { fetching } = this.props;
		return (
			<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
			colors={[this.state.startColor, this.state.endColor]} 
			style={[Styles.background, { height: this.state.visibleHeight}]}>
				<View style={Styles.form}>
					<View style={Styles.zyterTitleContainer}>
						<Text style={Styles.zyterTitle}>{Locales.t('verification_code')}</Text>
						<Text style={Styles.zyterVerifyMatch}>{this.state.pinCodeText}</Text>
					</View>
                    <View style={Styles.pincode}>
					<SmoothPinCodeInput
						autoFocus
						cellStyle={{
							borderBottomWidth: 2,
							borderColor: 'white',
						}}
						cellStyleFocused={{
							borderColor: 'white',
						}}
						ref={this.pinInput}
						value={code}
						password
						onTextChange={code => this.setState({ code })}
						onFulfill={this.handleVerificationCode}
						onBackspace={() => console.log('No more back.')}
						/>
						<Text style={Styles.zyterVerifyMatch}>{this.state.dismatch?Locales.t('invalid_pin'):null}</Text>
                    </View>
				</View>
			</LinearGradient>

		);
	}
}

