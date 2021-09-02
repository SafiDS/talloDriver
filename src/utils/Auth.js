import AsyncStorage from '@react-native-community/async-storage';

export const getRiderId = () => AsyncStorage.getItem('RiderId').then(value => value)

export const getFullname = () => AsyncStorage.getItem('Fullname').then(value => value)

export const getemail = () => AsyncStorage.getItem('email').then(value => value)

export const getGender = () => AsyncStorage.getItem('Gender').then(value => value)

export const getDOB = () => AsyncStorage.getItem('DOB').then(value => value)


export const getUserId = () => AsyncStorage.getItem('userId').then(value => value)

export const getSchemaname = () => AsyncStorage.getItem('schemaName').then(value => value)

export const getAuthToken = () => AsyncStorage.getItem('authToken').then(value => value)

export const getDisplayName = () => AsyncStorage.getItem('displayName').then(value => value)

export const getEncryptedPass = () => AsyncStorage.getItem('encryptedPass').then(value => value)

export const getExchangeId = () => AsyncStorage.getItem('exchangeId').then(value => value)

export const getLisenceNo = () => AsyncStorage.getItem('LisenceNo').then(value => value)

export const getFrontImage = () => AsyncStorage.getItem('FrontImage').then(value => value)

export const getBackImage = () => AsyncStorage.getItem('BackImage').then(value => value)

export const getRCNo = () => AsyncStorage.getItem('RCNo').then(value => value)

export const getRCFrontImage = () => AsyncStorage.getItem('RCFrontImage').then(value => value)

export const getRCBackImage = () => AsyncStorage.getItem('RCBackImage').then(value => value)

export const getInsuranceNo = () => AsyncStorage.getItem('InsuranceNo').then(value => value)

export const getInFrontImage = () => AsyncStorage.getItem('InFrontImage').then(value => value)

export const getInBackImage = () => AsyncStorage.getItem('InBackImage').then(value => value)

export const getPCNo = () => AsyncStorage.getItem('PCNo').then(value => value)

export const getPCFrontImage = () => AsyncStorage.getItem('PCFrontImage').then(value => value)

export const getAadharNo = () => AsyncStorage.getItem('AadharNo').then(value => value)

export const getACFrontImage = () => AsyncStorage.getItem('ACFrontImage').then(value => value)

export const getACBackImage = () => AsyncStorage.getItem('ACBackImage').then(value => value)


export const getAccountName = () => AsyncStorage.getItem('AccountName').then(value => value)

export const getAccountNo = () => AsyncStorage.getItem('AccountNo').then(value => value)

export const getBankName = () => AsyncStorage.getItem('BankName').then(value => value)

export const getIFSC = () => AsyncStorage.getItem('IFSC').then(value => value)


export const getProfileImage = () => AsyncStorage.getItem('ProfileImage').then(value => value)


