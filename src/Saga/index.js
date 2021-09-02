import { takeLatest, call, put, delay, all, take } from 'redux-saga/effects'


import { SignInSaga,OTPSaga,Registration ,GetRiderDetails,Language,RiderStatusGotoHome,RiderStatusOnline,RiderStatusOnline1, cityList, License, Rcdocoment , Insurance ,Pancard,BankDetails, Adarcard ,UploadImage , ChangeImage , RiderDetails , Dashboard,
    RiderLocationUpdate,BookingInfo,RiderBookingAccept,RiderReachLocation,BookingOtpVerify,BookingComplete, RiderChangeImage,
RiderBooking,RiderReview,RiderLoginImage,CashPayment,RiderCancel,BookingStatusInfo,RiderAddAddress,RiderAddresses} from './LoginSaga'
// import { getRoomSaga } from './Getsaga'

// 
// import { getUsersRequest } from './webSocket'

const dataSaga = function* dataSaga() {
    yield all([
        yield takeLatest('LOGIN_REQUEST', SignInSaga),
       
        yield takeLatest('USER_LOGIN_OTP_VERIFY', OTPSaga),
        yield takeLatest('NEW_REGISTRATION', Registration),

        yield takeLatest('CHOOSE_LANUAGE', Language),
        
        yield takeLatest('DRIVING_LICENSE', License),
        yield takeLatest('RC_Docoment', Rcdocoment),
        yield takeLatest('Insurance', Insurance),
        yield takeLatest('PAN_Card', Pancard),
        yield takeLatest('Adar_card', Adarcard),
        yield takeLatest('Bank_Details', BankDetails),
        yield takeLatest('Upload_Image', UploadImage),
        yield takeLatest('RIDER_CHANGE_IMAGE', RiderChangeImage),
        yield takeLatest('RIDER_DETAILS', RiderDetails),
        yield takeLatest('City_name', cityList),
        yield takeLatest('DASHBOARD',Dashboard),
        yield takeLatest('RIDER_STATUS_GOTO_HOME',RiderStatusGotoHome),
        yield takeLatest('RIDER_STATUS_ONLINE1',RiderStatusOnline),
        yield takeLatest('RIDER_GOTO_HOME',RiderStatusOnline1),
        yield takeLatest('GET_RIDER_DETAILS',GetRiderDetails),
        yield takeLatest('RIDER_UPDATE_LOCATION',RiderLocationUpdate),
        yield takeLatest('BOOKING_INFO',BookingInfo),
        yield takeLatest('RIDER_BOOKING_ACCEPT',RiderBookingAccept),
        yield takeLatest('BOOKING_SOURCE_LOCATION_REACH',RiderReachLocation),
        yield takeLatest('BOOKING_OTP_VERIFY',BookingOtpVerify),
        yield takeLatest('RIDER_BOOKING_COMPLETE',BookingComplete),
        yield takeLatest('RIDER_BOOKINGS',RiderBooking),
        yield takeLatest('RIDER_REVIEW',RiderReview),
        yield takeLatest('RIDER_LOGIN_IMAGE_UPDATE',RiderLoginImage),
        yield takeLatest('CASH_PAYMENT', CashPayment),
        yield takeLatest('RIDER_CANCEL',RiderCancel),
        yield takeLatest('BOOKING_STATUS_INFO',BookingStatusInfo),
        yield takeLatest('RIDER_ADD_ADDRESS',RiderAddAddress),
        yield takeLatest('RIDER_ADDRESSES',RiderAddresses),


        // yield takeLatest('CHANGE_IMAGE',ChangeImage),

        // yield takeLatest('WEB_SOCKET', getUsersRequest)


    ])
}



export default dataSaga