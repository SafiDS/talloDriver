class ConfigService {
   


    // baseUrl = 'https://qa.zyter.net/CareConnect/'
        // baseUrl = 'https://qa.zyter.net/ZyterPlus/'
    baseUrl ='https://qa2.zyter.net:8443/MyHippo1/'

   //  baseUrl= 'https://172.27.7.40:8443/ZyterPlus/'
   //'https://qa.zyter.net/ZyterPlus/performKeyExchange'
   //    'https://s02.zyter.net:8443/ZyterPlus/'    
   

    get UserSettings() {
        return {
          
           curve_type : 'secp256k1',  // web ,android 
        //    curve_type : 'secp256r1', // ios 
            // user_login_api: this.baseUrl + "api/auth/users",
            user_captcha: this.baseUrl + "captcha/",
            performKeyExchange: this.baseUrl + "performKeyExchange",
            authenticateUser: this.baseUrl + "authenticateUser",
            logout: this.baseUrl + "signout",
            getUser: this.baseUrl + "getProfileUser",
            CLOSEOTHERSESSIONURL : this.baseUrl + "CLOSEOTHERSESSIONURL"
             
        }
    }
    get chatSetting(){
        return { 
            castmessage: this.baseUrl + "getRooms",
            // castmessage: this.baseUrl + "getRecentChats",
            callhistory: this.baseUrl + "getCallHistory",
            previoushistory : this.baseUrl + "history",
            groupHistory : this.baseUrl + "groupHistory",
            channelHistory: this.baseUrl + "channelHistory",
            uploadPrivateChat: this.baseUrl + "upload",
            uploadToGroupChat: this.baseUrl + "uploadToGroup"


        }
    }

  get schemaName(){
    return {
        schemaName : "mserver"
    }
  }

    get websocket() {
        return {
            // websocket_api: "wss://qa.zyter.net/ZyterPlusWebSocket/webSocketServer"
            websocket_api: "wss://qa.zyter.net:8444/ZyterGroupCall1/webSocketServer"
            //  websocket_api: "wss://qa.zyter.net:8444/ZyterGroupCall3/webSocketServer"
   
        }                   
    }
  
   
}

export default new ConfigService();