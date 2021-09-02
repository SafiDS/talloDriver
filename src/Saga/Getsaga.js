import { takeLatest, call, put, delay } from 'redux-saga/effects'
import { saveToStorage, getItemFromStorage } from '../utils/AccessStorage'
import {
    keyPairPromise,
    generateSignaturePromise,
    verifySignaturePromise,
    createSecretKeyPromise,
    encryptDataPromise
} from '../utils/Crypto';
import API from '../Api'
import { saveUserInfo } from '../utils/User'
import { Alert, Platform } from "react-native";


const serverIOSPrivateKey = 'hw4ky4BUw/Gj+5vu8fQX0vbkJ5PIJr9SkFw75RW/E2A='
const serverAndroidPrivateKey = '2226aeb2f8a7aee1cb3fa54c1b9710be8c84820626a91ebc7ffebff02e667efe'
const api = API.create()
const encryptSecp256k1 = 'secp256k1'
const encryptSecp256r1 = 'secp256r1'
// const navigation = useNavigation()

export function* getRoomSaga(parameter) {

    var getResponse = parameter.payload
    var loginInfo = ""

    api.setHeader('X-Application-Access-Key', api.accessKey)
    // api.setHeader('X-User-Id', schema + "\\" + userId)
    api.setHeader('schemaName', getResponse.schemaName)
    api.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    // api.setHeader('X-User-Key', secretKey)
    // api.setAuthToken(authToken) 
    // api.deleteHeader('Connection')
    // api.deleteHeader('X-Auth-Token')


    //Authenticate login info
    const response = yield call(api.GetRoom, loginInfo)
 
    if (response.status == 200) {
        yield put({ type: 'ROOMS', payload: response.data })
    }
    return response
}









