
export const SIGN_IN = 'LOGIN_DETAILS'
export const USER_INFORMATION = 'USER_INFORMATION'
export const RIDER_BOOKINGS = 'RIDER_BOOKINGS'



const initialState = []

const SignReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        Login: action.payload
      }
    case USER_INFORMATION:
      return {
        ...state,
        User_info: action.payload
      }
      
      case "SAVE":
      const data = action.payload;
      const newState = { ...state, data };
     // console.log("newstate........................",newState)
      return newState;

      case "LICENSEDATA":
        const licensedata = action.payload;
        const licenseState = { ...state, licensedata };
       // console.log("newstate........................",licenseState)
        return licenseState;

       case "RCDATA":
          const rcdata = action.payload;
          const rcState = { ...state, rcdata };
         // console.log("newstate........................",rcState)
          return rcState;

       case "INSURANCEDATA":
            const insurancedata = action.payload;
            const insuranceState = { ...state, insurancedata };
            //console.log("newstate........................",insuranceState)
            return insuranceState;

       case "PCDATA":
              const pcdata = action.payload;
              const pcState = { ...state, pcdata };
              //console.log("newstate........................",pcState)
              return pcState;
    case "ACDATA":
               const acdata = action.payload;
               const acState = { ...state, acdata };
              // console.log("newstate........................",acState)
               return acState;

   case "BANKDATA":
                const bankdata = action.payload;
                const bankState = { ...state, bankdata };
               // console.log("newstate........................",pcState)
                return bankState;
     case "BOOKINGINFO":
            const bookingInfo = action.payload;
            const bookingState = { ...state, bookingInfo };
           // console.log("bookingState........................",bookingState)
             return bookingState;  
      
     case "RIDER_BOOKINGS":
              const Rider_booking = action.payload;
              const Rider_bookingState = { ...state, Rider_booking };
             // console.log("bookingState........................",Rider_bookingState)
               return Rider_bookingState;  

  }
  return state
}

export default SignReducer