import apisauce from 'apisauce'
import { Alert } from 'react-native';
const applicationJson = 'application/json';

const create = (baseURL = 'https://www.tallo.in/was/') => {
    const api = apisauce.create({
        baseURL,
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 30000
    })

    const setHeader = (name, value) => api.setHeader(name, value)
    const deleteHeader = (name) => api.deleteHeader(name)
    const setToken = (token) => {
        return api.setHeader('Token', token)
    }
    const setContentType = (contentType) => api.setHeader('Content-Type', contentType)
    const rider_login_otp_request = (params) => {

        // const logindata = new FormData();
        // logindata.append('phone', params.phone)
        // logindata.append('usertoken', params.token)
        return api.post('rider_login_otp_request' , params)
    }
    // const user_login_otp_request = (params) => {
    //     return api.post('rider_login_otp_request', params) 
    // }
    const rider_login_otp_verify = (params) =>{

        // const otpverifiydata = new FormData();
        // otpverifiydata.append('phone', params.phone)
        // otpverifiydata.append('otp', params.otp)
        return api.post('rider_login_otp_verify', params)}

    const rider_profile_update = (params) => {
       
        return api.post('rider_profile_update', params)}

    const City_name = (params) => api.post('vehicles', params)

    const rider_info = (params) => {
        return api.post('rider_info', params)}
    const rider_full_profile_update = (params) => {
       
        return api.post('rider_full_profile_update', params)}

   const rider_location_update = (params) => {
       return api.post('rider_location_update', params)}
    const  rider_profile_image_update = (params) => {
        return api.post('rider_profile_image_update', params)}
    const  booking_info = (params) => {
            return api.post('booking_info', params)}      
     const  booking_accept = (params) => {
         return api.post('booking_accept', params)}  
     const  booking_source_location_reach = (params) => {
        return api.post('booking_source_location_reach', params)} 
     const booking_otp_verify = (params) => {
        return api.post('booking_otp_verify', params)}  
     const  booking_complete = (params) => {
            return api.post('booking_complete', params)} 
     const  rider_bookings = (params) => {
    return api.post('rider_bookings', params)} 
    const  booking_rider_send_review = (params) => {
        return api.post('booking_rider_send_review', params)} 
     const  rider_login_image_update = (params) => {
            return api.post('rider_login_image_update', params)} 
    const  booking_cash_pay = (params) => {
                return api.post('booking_cash_pay', params)}
    const  booking_rider_cancel = (params) => {
             return api.post('booking_rider_cancel', params)}           
     const  booking_status_info = (params) => {
         return api.post('booking_status_info', params)} 
    const  rider_address_add = (params) => {
            return api.post('rider_address_add', params)} 
     const  rider_addresses = (params) => {
                return api.post('rider_addresses', params)} 

    return {
        setContentType,
        setHeader,
        deleteHeader,
        rider_login_otp_request,
        //user_login_otp_request,
        rider_login_otp_verify,
        rider_profile_update,
        City_name,
        rider_info,
        rider_full_profile_update,
        rider_location_update,
        rider_profile_image_update,
        booking_info,
        booking_accept,
        booking_source_location_reach,
        booking_otp_verify,
        booking_complete,
        rider_bookings,
        booking_rider_send_review,
        rider_login_image_update,
        booking_cash_pay,
        booking_rider_cancel,
        booking_status_info,
        rider_addresses,
        rider_address_add
    }
}

export default {
    create
    // createTest
}
