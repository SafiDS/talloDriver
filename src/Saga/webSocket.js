import { takeLatest, call, put, delay, take } from 'redux-saga/effects'
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
import { Alert, Platform,AppState } from "react-native";
import { eventChannel } from 'redux-saga';
import { EventRegister } from 'react-native-event-listeners'




function* initWebsocket(ws) {

    return eventChannel(emitter => {
        let gbLogoutState = false
              EventRegister.addEventListener('sendWebsocketMessage', (data) => {
                console.log('check websocket send reqeust ' + JSON.stringify(data))
                if(ws.readyState && ws.readyState === 1){
                  ws.send(JSON.stringify(data));
                }
              })

              EventRegister.addEventListener('privateChannelMessage', (data) => {
                if(ws.readyState && ws.readyState === 1){
                  ws.send(JSON.stringify(data));
                }
              })

              EventRegister.addEventListener('restrictedChannelMessage', (data) => {

                if(ws.readyState && ws.readyState === 1){
                  ws.send(JSON.stringify(data));
                }
              })

              EventRegister.addEventListener('publicChannelMessage', (data) => {

                if(ws.readyState && ws.readyState === 1){
                  ws.send(JSON.stringify(data));
                }
              })

              EventRegister.addEventListener('sendPingSocket', (data) => {
                if(ws.readyState && ws.readyState === 1){
                  ws.send(JSON.stringify(data));
                }
              })

              EventRegister.addEventListener('logout', (data) => {
                if(data){
                  gbLogoutState = true
                  ws.close()
                }
              })

              AppState.addEventListener('change', (nextAppState)=>{
          /*      if(nextAppState === 'background'){
                  ws.close()
                }*/
                return emitter({type: 'CHANGE_APP_STATE', msg:nextAppState})
              });
        console.log(ws)
        debugger
        ws.onopen = () => {
            console.log("onopen")
        }

        ws.onerror = (error) => {
            console.log('WEBSOCKET closed or error ' + error)
        }
        ws.onclose = function (event) {
            console.log('WEBSOCKET closed or error:', event.code, event.reason);
            // if(!gbLogoutState)
            //   return emitter({type: 'WEB_SOCKET_CLOSE', msg:'closed'})
            // else
            //   return emitter({type: 'WEB_SOCKET_CLOSE_LOGOUT', msg:'closed'})
        }
        ws.onmessage = (e) => {

            if (e !== null) {
                let msg = null
                try {
                    msg = JSON.parse(e.data)
                    console.log('WEBSOCKET received messages ' + JSON.stringify(msg))
                } catch (e) {
                    console.error('WEBSOCKET Error parsing : ')
                }
                try {
                    const { payload: book } = msg
                    if (msg.sdp) {//get offer and answer
                        if (msg.sdp.type === 'offer') {
                            return emitter({ type: 'OFFER_CALL', msg })
                        }

                        if (msg.sdp.type === 'answer') {
                            return emitter({ type: 'ANSWER_CALL', msg })
                        }
                    }
                    if (msg.type) {
                        if (msg.type === 'incoming') {
                            if (msg.subCall) {
                                if (msg.subCall === 'yes') {
                                    return emitter({ type: 'INCOMING_SUB_CALL', msg })
                                }
                            } else
                                return emitter({ type: 'INCOMING_CALL', msg })
                        }
                        if (msg.type === 'active') {
                            return emitter({ type: 'ACTIVE_CALL', msg })
                        }

                        if (msg.type === 'busy') {
                            return emitter({ type: 'BUSY_CALL', msg })
                        }

                        if (msg.type === 'closeConferenceCall' || msg.type === 'closeVideoCall' || msg.type === 'close' || msg.closeConnection === true) {

                            return emitter({ type: 'CLOSING_CALL', msg })
                        }

                        if (msg.type === 'browserNotSupported') {
                            return emitter({ type: 'BROWSER_NOT_SUPPORTED', msg })
                        }

                        if (msg.type === 'candidate') {
                            return emitter({ type: 'CANDIDATE_CALL', msg })
                        }

                        if (msg.type === 'atremove-candides') {
                            return emitter({ type: 'AT_REMOVE_CANDIDED', msg })
                        }

                        if (msg.type === 'accepted') {
                            if (msg.subCall) {
                                if (msg.subCall === 'yes') {
                                    return emitter({ type: 'ACCEPTED_SUB_CALL', msg })
                                }
                            } else
                                return emitter({ type: 'ACCEPTED_CALL', msg })
                        }


                        if (msg.type === 'bye') {
                            return emitter({ type: 'BYE_CALL', msg })
                        }

                    }
                    if (msg.closeSession) {//another user logged in and your session was expired
                        return emitter({ type: 'CLOSED_SESSION', msg })
                    }
                    /**get participants list on all channels */
                    // private channel
                    if (msg.adhocChannelAdmin) {
                        return emitter({ type: 'ADHOC_CHANNEL_ADMIN', msg })
                    }
                    if (msg.adhocChannelAdminImage) {
                        return emitter({ type: 'ADHOC_CHANNEL_ADMIN_IMAGE', msg })
                    }
                    if (msg.adhocChannelAdminPresence) {
                        return emitter({ type: 'ADHOC_CHANNEL_ADMIN_PRESENCE', msg })
                    }
                    if (msg.adhocChannelParticipants) {
                        return emitter({ type: 'ADHOC_CHANNEL_PARTICIPANTS', msg })
                    }
                    if (msg.adhocChannelImages) {
                        return emitter({ type: 'GET_ADHOC_CHANNEL_IMAGES', msg })
                    }
                    if (msg.adhocChannelParticipantRemove) {//{"adhocChannelParticipantRemove":{"containerId":1651,"userIds":["15james"]}}
                        return emitter({ type: 'GET_ADHOC_CHANNEL_PART_REMOVE', msg })
                    }
                    if (msg.adhocChannelOwnerRemove) {
                        return emitter({ type: 'GET_ADHOC_CHANNEL_OWNER_REMOVE', msg })
                    }
                    if (msg.adhocChannelPresence) {
                        return emitter({ type: 'GET_ADHOC_CHANNEL_PRESENCE', msg })
                    }
                    //group chat
                    if (msg.groupRemove) {
                        return emitter({ type: 'REMOVE_PART_FROM_GROUP', msg })
                    }
                    if (msg.groupParticipants) {
                        return emitter({ type: 'GET_GROUP_PARTICIPANTS', msg })
                    }
                    if (msg.groupPresence) {
                        return emitter({ type: 'GET_GROUP_PRESENCE', msg })
                    }
                    if (msg.groupParticipantsImages) {
                        return emitter({ type: 'GET_GROUP_PARTICIPANTS_IMAGES', msg })
                    }
                    if (msg.groupPartRemove) {
                        return emitter({ type: 'REMOVED_PART_FROM_GROUP', msg })
                    }
                    //public channel
                    if (msg.channelParticipants) {
                        return emitter({ type: 'GET_PUBLIC_CHANNEL_PARTICIPANTS', msg })
                    }
                    if (msg.channelParticipantsImages) {
                        return emitter({ type: 'GET_PUBLIC_CHANNEL_PARTICIPANTS_IMAGES', msg })
                    }
                    if (msg.channelPresence) {
                        return emitter({ type: 'GET_PUBLIC_CHANNEL_PARTICIPANTS_PRESENCE', msg })
                    }
                    if (msg.channelPartRemove) {
                        return emitter({ type: 'REMOVE_PART_FROM_PUBLIC_CHANNEL', msg })
                    }
                    //restricted channel
                    if (msg.privateChannelParticipants) {
                        return emitter({ type: 'GET_PRIVATE_CHANNEL_PARTICIPANTS', msg })
                    }
                    if (msg.privateChannelPresence) {
                        return emitter({ type: 'GET_PRIVATE_CHANNEL_PRESENCE', msg })
                    }
                    if (msg.privateChannelParticipantsImages) {
                        return emitter({ type: 'GET_PRIVATE_CHANNEL_PARTICIPANTS_IMAGES', msg })
                    }
                    if (msg.privateChannelPartRemove) {
                        return emitter({ type: 'DELETED_PART_FROM_PRIVATE_CHANNEL', msg })
                    }
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (msg.private) {
                        return emitter({ type: 'GET_PRIVATE_MESSAGE', msg })
                    }
                    if (msg.adhocChannelOwners) {
                        return emitter({ type: 'ADHOC_CHANNEL_OWNERS', msg })
                    }
                    if (msg.privateDelivered) {
                        return emitter({ type: 'GET_PRIVATE_DELIVERED', msg })
                    }
                    if (msg.privateRead) {
                        return emitter({ type: 'GET_PRIVATE_READ', msg })
                    }
                    if (msg.privateReceived) {
                        return emitter({ type: 'GET_PRIVATE_RECEIVED', msg })
                    }
                    if (msg.chatParticipantStatus) {
                        return emitter({ type: 'GET_CHAT_PARTICIPANT_STATUS', msg })
                    }
                    if (msg.adhocReadReceived) {
                        return emitter({ type: 'GET_ADHOC_READ_RECEIVED', msg })
                    }
                    if (msg.adhoc) {
                        return emitter({ type: 'GET_ADHOC_MESSAGE', msg })
                    }
                    if (msg.adhocReceived) {
                        return emitter({ type: 'GET_ADHOC_RECEIVED', msg })
                    }
                    if (msg.adhocRead) {
                        return emitter({ type: 'GET_ADHOC_READ', msg })
                    }
                    if (msg.adhocDelivered) {
                        return emitter({ type: 'GET_ADHOC_DELIVERED', msg })
                    }
                    if (msg.rosterPresence) {
                        return emitter({ type: 'GET_ROSTER_PRESENCE', msg })
                    }
                    if (msg.roster) {
                        return emitter({ type: 'GET_ROSTER_SUCCESS', msg })
                    }
                    if (msg.rosterRemove) {
                        return emitter({ type: 'GET_ROSTER_REMOVE_SUCCESS', msg })
                    }
                    if (msg.rosterImage) {
                        return emitter({ type: 'GET_ROSTER_IMAGE_SUCCESS', msg })
                    }
                    /* get channel list */
                    if (msg.privateChannels) {
                        return emitter({ type: 'GET_PRIVATE_CHANNELS', msg })
                    }
                    if (msg.adhocChannels) {
                        return emitter({ type: 'GET_ADHOC_CHANNELS_SUCCESS', msg })
                    }
                    if (msg.channels) {
                        return emitter({ type: 'GET_CHANNELS_SUCCESS', msg })
                    }
                    ///////////////////////////////////////////////////
                    if (msg.removeContaier) {
                        return emitter({ type: 'REMOVE_CONTAINER', msg })
                    }
                    if (msg.channelName) {
                        return emitter({ type: 'UPDATED_PUBLIC_CHANNEL_NAME', msg })
                    }
                    if (msg.adhocChannelName) {//updated adhoc channel name
                        return emitter({ type: 'UPDATED_ADHOC_CHANNEL_NAME', msg })
                    }
                    if (msg.groups) {
                        return emitter({ type: 'GET_GROUPS_SUCCESS', msg })
                    }
                    if (msg.rosterRemove) {
                        return emitter({ type: 'GET_ROSTER_REMOVE_SUCCESS', msg })
                    }
                    if (msg.dashBoardCount) {
                        return emitter({ type: 'GET_DASHBOARD_COUNT_SUCCESS', msg })
                    }
                    if (msg.broadcast) {
                        return emitter({ type: 'GET_BROADCAST_MESSAGE', msg })
                    }
                    if (msg.emergency) {
                        return emitter({ type: 'GET_EMERGENCY_MESSAGE', msg })
                    }
                    if (msg.RecentChatCall) {
                        return emitter({ type: 'GET_CREATE_GROUP_RECENT', msg })
                    }
                    if (msg.privateChannelRemove) {
                        return emitter({ type: 'DELETED_PRIVATE_CHANNEL', msg })
                    }
                    if (msg.channelRemove) {
                        return emitter({ type: 'DELETED_PUBLIC_CHANNEL', msg })
                    }
                    if (msg.adhocChannelRemove) {
                        return emitter({ type: 'DELETED_ADHOC_CHANNEL', msg })
                    }
                    if (msg.privateChannelReceived) {//received private chat
                        return emitter({ type: 'RECEIVED_PRIVATE_CHANNEL_MESSAGE', msg })
                    }
                    if (msg.privateChannelName) {//when admin edit channel, all memebers get this websocket
                        return emitter({ type: 'UPDATE_PRIVATE_CHANNEL', msg })
                    }
                    if (msg.privateChannel) {
                        return emitter({ type: 'GET_PRIVATE_CHANNEL_MESSAGE', msg })
                    }
                    if (msg.adhocChannel) {
                        return emitter({ type: 'GET_ADHOC_CHANNEL_MESSAGE', msg })
                    }
                    if (msg.public) {
                        return emitter({ type: 'GET_PUBLIC_CHANNEL_MESSAGE', msg })
                    }
                } catch (err) {
                    console.error(`WEBSOCKET Error parsing 1`)
                }
            }
        }

        // unsubscribe function
        return () => {
            console.log('WEBSOCKET off')
        }
        })
    }




//connect websocket
export function* getUsersRequest(action) {
        // yield put(UsersActions.clearUsersStore())
        const payload = { ...action.payload }
        const ws = payload
        // const channel = yield call(initWebsocket, ws)
        // while (true) {
        //    const action = yield take(channel)
        //     if (action.type === 'GET_BROADCAST_MESSAGE') {
        //         yield put(NotificationActions.getBroadcastMessages())
        //         //yield put(NotificationActions.getNewBroadcastMessage(action.msg.broadcast))
        //     } else if (action.type === 'GET_EMERGENCY_MESSAGE') {
        //         const emergency = yield call(decryptEmergencyMessage, action.msg.emergency)
        //         //yield put(NotificationActions.getNewEmergencyMessage(emergency))
        //         if (action.msg.emergency.action === 'BACKUP_NOTIFICATION')
        //             yield put(NotificationActions.getEmergencyMessages())
        //     } else if (action.type === 'CHANGE_APP_STATE') {
        //         if (action.msg === 'background') {
        //             yield put(UserActions.updatePresenceStatus(5))
        //         } else {
        //             yield put(UserActions.updatePresenceStatus(1))
        //         }
        //     }
        //     if (action.type === 'DELETED_PRIVATE_CHANNEL') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'DELETED_PUBLIC_CHANNEL') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'DELETED_ADHOC_CHANNEL') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'UPDATED_ADHOC_CHANNEL_NAME') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'GET_CREATE_GROUP_RECENT') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'GET_GROUPS_SUCCESS') {
        //         if (action.msg.latest) {
        //             yield put(UsersActions.getRecentChat())
        //         }
        //     }
        //     if (action.type === 'REMOVE_PART_FROM_GROUP') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'DELETED_PRIVATE_CHANNEL') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'GET_ADHOC_MESSAGE') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'GET_PRIVATE_MESSAGE') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'GET_ADHOC_CHANNEL_MESSAGE') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'GET_PRIVATE_CHANNEL_MESSAGE') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'GET_PUBLIC_CHANNEL_MESSAGE') {
        //         yield put(UsersActions.getRecentChat())
        //     }
        //     if (action.type === 'WEB_SOCKET_CLOSE') {
        //         Alert.alert(Locales.t('warning_title'), Locales.t('no_internet'))
        //         Actions.replace('verificationCode')
        //         channel.close()
        //         return
        //     }
        //     if (action.type === 'WEB_SOCKET_CLOSE_LOGOUT') {
        //         channel.close()
        //         return
        //     }
        //     yield put(action)
        // }
    }