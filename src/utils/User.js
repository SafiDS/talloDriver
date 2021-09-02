import { Alert, Platform } from 'react-native'
import { saveToStorage, getItemFromStorage } from '../utils/AccessStorage';


const getLastPhoto = photos => {
  const filterPhotos = photos.filter(item => item.source != 'instagram')
  let newPhotos = Object.assign([], filterPhotos)
  newPhotos.sort((a, b) => {
    return a.num < b.num
  })
  return newPhotos[0]
}


	//check firebase permission
	export const checkPermission = async() => {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			return await getToken();
		} else {
			return await requestPermission();
		}
	}

	async function requestPermission() {
		try {
			await firebase.messaging().requestPermission();
			// User has authorised
			return await getToken();
		} catch (error) {
			// User has rejected permissions
    }
    return false
	}

	async function getToken() {
		let fcmToken = await getItemFromStorage('fcmToken');
		if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
			if (fcmToken) {
				// user has a device token
				if(Platform.OS === 'android')
					saveToStorage('fcmToken', 'ANDROID-' + fcmToken)
				else
					saveToStorage('fcmToken', 'IOS-' + fcmToken)
			}else{
				Alert.alert('Can\'t create fcm token')
				return false
			}
    }
    return true
	}

export const saveUserInfo =(userInfo, checkTouch) =>{
  //saveToStorage('userInfo', JSON.stringify(userInfo))
  saveToStorage('username',                             userInfo.userName)
  saveToStorage('displayName',                          userInfo.displayName)
  saveToStorage('checkedTouch',                         JSON.stringify(checkTouch))
  saveToStorage('lastMsgReadId',                        JSON.stringify(userInfo.lastMsgReadId))
  saveToStorage('presenceMessage',                      userInfo.presenceMessage)
  saveToStorage('profilePhoto',                         userInfo.profilePhoto)
  saveToStorage('authToken',                            userInfo.authToken)
  saveToStorage('token',                                userInfo.token)
  saveToStorage('session_username',                     userInfo.session_username)
  saveToStorage('firstName',                            userInfo.fristName)
  saveToStorage('lastName',                             userInfo.lastName)
  saveToStorage('gender',                               userInfo.gender)
  saveToStorage('emailAddress',                         userInfo.emailAddress)
  saveToStorage('phone',                                userInfo.phone)
  saveToStorage('status',                               userInfo.status)
  saveToStorage('errorMsg',                             userInfo.errorMsg)
  saveToStorage('ldapUser',                             userInfo.ldapUser)
  saveToStorage('loggedInTime',                         userInfo.loggedInTime)
  saveToStorage('nickName',                             userInfo.nickName)
  saveToStorage('department',                           userInfo.department)
  saveToStorage('designation',                          userInfo.designation)
  saveToStorage('loggedFrom',                           JSON.stringify(userInfo.loggedFrom))
  saveToStorage('providerId',                           userInfo.providerId)
  saveToStorage('presenceStatus',                       ''+userInfo.presenceStatus)
  saveToStorage('organizationName',                     userInfo.organizationName)
  saveToStorage('role',                                 userInfo.role)
  saveToStorage('enableBot',                            userInfo.enableBot)
  saveToStorage('privilegeList',                        JSON.stringify(userInfo.privilegeList))
/*  "privilegeList": [
    "EMERGENCY",
    "CREATE_GROUP",
    "CREATE_CHANNEL"
    ],*/
  saveToStorage('patientId',                            userInfo.patientId)
  saveToStorage('userCategory',                         userInfo.userCategory)
  saveToStorage('providerType',                         userInfo.providerType)
  saveToStorage('domain',                               userInfo.domain)
  saveToStorage('pwdChanged',                           JSON.stringify(userInfo.pwdChanged))
  saveToStorage('pwdExpDate',                           userInfo.pwdExpDate)
  
  saveToStorage('domainFeatures',                       JSON.stringify(userInfo.domainFeatures))
  saveToStorage('securityQuestionsStatus',              JSON.stringify(userInfo.securityQuestionsStatus))
  saveToStorage('ehrs',                                 JSON.stringify(userInfo.ehrs))
  saveToStorage('wsSessionId',                          JSON.stringify(userInfo.wsSessionId))
  saveToStorage('lastLoginTime',                        userInfo.lastLoginTime)
/*
"domainFeatures": [
"A/V_FEATURE",
"EMS",
"EHR_INTEGRATION",
"CONTACTS",
"PRIVATE_CHAT",
"GROUP_CHAT",
"CHANNEL_CHAT",
"OFFLINE_MESSAGES",
"SFT",
"BROADCAST_MESSAGE",
"EMERGENCY_MESSAGE",
"TELEMETRY",
"A/V_CONFERENCE"
],*/
}
