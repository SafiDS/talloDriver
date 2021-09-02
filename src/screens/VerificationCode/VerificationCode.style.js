import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from 'Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.transparent,
    flex: 1,
    
  },
  background: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  form: {
    flex:1,
    backgroundColor: Colors.transparent,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  zyterTitle:{
    fontSize: 30,
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
  },
  zyterVerifyMatch:{
    marginTop: 10,
    fontSize: 20,
    fontFamily: Fonts.type.base,
    color: Colors.snow,
  },
  zyterTitleContainer:{
    flex:1,
    flexDirection: 'column',
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 30
  },
  pincode:{
    flex:1, 
    alignItems:'center', 
    justifyContent:'flex-start',
    bottom: 30
  },
  zyterMediumTitle:{
    paddingTop: 10,
    paddingHorizontal: Metrics.doubleBaseMargin,
    fontSize: 15,
    color: Colors.snow
  },
  resend:{
    marginTop: 60,
    paddingTop: 10,
    fontSize: 15,
    color: Colors.snow
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
