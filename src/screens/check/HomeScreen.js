import React, { useEffect, useState, useCallback, PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
// import { Button } from '../components'
import {
  getUserId,
  getSchemaname,
  getAuthToken,
  getDisplayName,
  getEncryptedPass,
  getExchangeId
} from '../utils/Auth'
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
  RTCSessionDescriptionType
} from 'react-native-webrtc';
import { event } from 'react-native-reanimated';
import InCallManager from 'react-native-incall-manager';
import { default as Sound } from 'react-native-sound';
import { Button, TextInput, Text } from 'react-native-paper';
var remotevideoStream = [];


const HomeScreen = ({ navigation, ...props }) => {


  let name;
  let connectedUser;
  let localTestURL = "";
  const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

  let count = 0;
  const [userId, setUserId] = useState('');
  const [socketActive, setSocketActive] = useState(false);
  const [calling, setCalling] = useState(false);
  // Video Scrs
  const [localStream, setLocalStream] = useState({ toURL: () => null });
  const [remoteStream, setRemoteStream] = useState({ toURL: () => null });
  const [existingParticipants, setexistingParticipants] = useState([]);
  const [getName, setName] = useState();
  const [TestlocalStream, TestsetLocalStream] = useState({ toURL: () => null });
  // const [IceCandiates, setIceCandiates] = useState([]);
  var IceCandiates = [];

  const [ws, setConn] = useState(null);

  const [localPC, setLocalPc] = useState(
    //change the config as you need
    new RTCPeerConnection({
      "iceServers": [
        {
          urls: 'turn:hvcturn.zyter.net:443',
          username: 'hvcturn',
          credential: 'turn12345'
        }
      ],
    }),
  );

  const [remotePC, setRemotePc] = useState(
    //change the config as you need
    new RTCPeerConnection({
      "iceServers": [
        {
          urls: 'turn:hvcturn.zyter.net:443',
          username: 'hvcturn',
          credential: 'turn12345'
        }
      ],
    }),
  );

  const [offer, setOffer] = useState(null);

  const [callToUsername, setCallToUsername] = useState(null);


  useEffect(() => {

    async function callSocket() {
      const userId = await getUserId()
      const schemaName = await getSchemaname()
      const authToken = await getAuthToken()

      const displayName = await getDisplayName()
      const userKey = await getEncryptedPass()
      const exchangeId = await getExchangeId()

      const appToken = "";
      const accessKey = 'TestMobilityAABB1234CCDD';
      const header = await setWebsocketHeader(userId, schemaName, displayName, userKey, exchangeId, appToken, accessKey, authToken)
      const protocol = 'nil'

      const webSocketUrl = 'wss://qa.zyter.net:8444/ZyterGroupCall1/webSocketServer'
      var newwebsocket = new WebSocket(webSocketUrl, null, header)
      //console.log(newwebsocket)
      setConn(new WebSocket(webSocketUrl, null, header))
    }

    callSocket()

  }, [])


  useEffect(() => {

    async function callWebsocket() {
      const userId = await getUserId()
      const schemaName = await getSchemaname()

      if (ws) {
        ws.onopen = () => {
          //console.log('Connected to the signaling server');
          setSocketActive(true);
          var audio_call = {
            "domain": "mserver",
            "id": "joinRoom",
            "room": "mserver_2",
            "userid": userId
          }
          ws.send(JSON.stringify(audio_call));
        };
        //when we got a message from a signaling server
        ws.onmessage = msg => {
          let data;
          if (msg.data === 'Hello world') {
            data = {};
          } else {
            data = JSON.parse(msg.data);
            console.log('Data --------------------->', data);
            switch (data.id) {
              case 'existingParticipants':
                createExistingParticipants()
                setexistingParticipants(data.participants);
                //console.log('Login');
                break;
              //when somebody wants to call us
              case 'receiveVideoAnswer':
                handleOffer(data);
                //console.log('Offer');
                break;
              case 'answer':
                handleAnswer(data.answer);
                //console.log('Answer');
                break;
              //when a remote peer sends an ice candidate to us
              case 'iceCandidate':
                handleCandidate(data.candidate);
                //console.log('Candidate');
                break;
              case 'newParticipantArrived':
                //console.log('Leave');
                break;
              default:
                break;
            }
          }
        };
        ws.onerror = function (err) {
          //console.log('Got error', err);
        };
        /**
         * Socjket Signalling Ends
         */

        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
          let videoSourceId;
          for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if (
              sourceInfo.kind == 'videoinput' &&
              sourceInfo.facing == (isFront ? 'front' : 'environment')
            ) {
              videoSourceId = sourceInfo.deviceId;
            }
          }
          mediaDevices
            .getUserMedia({
              audio: true,
              video: {
                mandatory: {
                  minWidth: 500, // Provide your own width, height and frame rate here
                  minHeight: 300,
                  minFrameRate: 30,
                },
                facingMode: isFront ? 'user' : 'environment',
                optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
              },
            })
            .then(stream => {
              // Got stream!

              localTestURL = stream
              setLocalStream(stream);

              // setup stream listening
              localPC.addStream(stream);
            })
            .catch(error => {
              // Log error
            });
        });


        // Setup ice handling
        localPC.onicecandidate = event => {
          remotePC.addIceCandidate(event.candidate);
          if (!event.candidate) { }
          else {
            console.log('localpc icecandidate:', event.candidate);
            IceCandiates.push(event.candidate)
            if (event.candidate) {

              var body = {
                "id": "onIceCandidate",
                "userid": userId,
                "domain": schemaName,
                "receiver_userid": userId,
                //data.participants[0].replace("-web", ""),
                // OnMessageEvent.participants[0],
                "candidate": event.candidate
              }
              ws.send(JSON.stringify(body))
            }
          }
        };


        remotePC.onicecandidate = e => {
          localPC.addIceCandidate(e.candidate);
          if (!e.candidate) { }
          else {
            console.log('remotePC icecandidate:', e.candidate);
            IceCandiates.push(e.candidate)
            try {
              if (e.candidate) {

                var body = {
                  "id": "onIceCandidate",
                  "userid": userId,
                  "domain": schemaName,
                  "receiver_userid": userId,
                  //data.participants[0].replace("-web", ""),
                  // OnMessageEvent.participants[0],
                  "candidate": e.candidate
                }
                ws.send(JSON.stringify(body))
              }
            } catch (err) {
              console.error(`Error adding localPC iceCandidate: ${err}`);
            }
          }
        };

        localPC.onaddstream = e => {
          console.log('localpc tracking with ', e);
          if (e.stream && remoteStream !== e.stream) {
            console.log('localpc received the stream', e.stream);

            setRemoteStream(e.stream);
            //   // localPC.addStream(event.stream)
            remotevideoStream.push(e.stream)
            InCallManager.start({ media: 'video' });
            InCallManager.setForceSpeakerphoneOn(true);
            InCallManager.setSpeakerphoneOn(true);


          }
        };

        remotePC.onaddstream = e => {
          console.log('remotePC tracking with ', e);
          if (e.stream && remoteStream !== e.stream) {
            console.log('RemotePC received the stream', e.stream);

            setRemoteStream(e.stream);
            //   // localPC.addStream(event.stream)
            remotevideoStream.push(e.stream)
            InCallManager.start({ media: 'video' });
            InCallManager.setForceSpeakerphoneOn(true);
            InCallManager.setSpeakerphoneOn(true);


          }
        };

        localPC.addStream(localTestURL);

      }
    }
    callWebsocket()

  }, [ws])



  async function createExistingParticipants() {

    const userId = await getUserId()
    const schemaName = await getSchemaname()
    try {
      // localPC.createOffer(offerOptions)
      //   .then(function (desc) {
      //     //console.log("createOffer", desc);
      //     localPC.setLocalDescription(desc);

      //     var offer = {
      //       domain: schemaName,
      //       id: "receiveVideoFrom",
      //       receiver_userid: userId,
      //       //socketId.replace("-web", "").replace("-null", ""),
      //       sdpOffer: desc.sdp,
      //       userid: userId
      //     }

      //     ws.send(JSON.stringify(offer));

      //   }).catch(err => console.error(err));

      const offer = await localPC.createOffer();
      await localPC.setLocalDescription(offer);

      var offer_list = {
        domain: schemaName,
        id: "receiveVideoFrom",
        receiver_userid: userId,
        //socketId.replace("-web", "").replace("-null", ""),
        sdpOffer: offer.sdp,
        userid: userId
      }

      ws.send(JSON.stringify(offer_list));


    } catch (err) {
      console.error(err);
      // }
    }

    // localPC.addStream(localTestURL);
    // }
    localPC.onsignalingstatechange = function (event) {
      //console.log('onsignalingstatechange', event.target.signalingState);
    };

    // localPC.onaddstream = function (event) {
    //   setRemoteStream(event.stream);
    //   InCallManager.start({ media: 'video' });
    //   InCallManager.setForceSpeakerphoneOn(true);
    //   InCallManager.setSpeakerphoneOn(true);
    // };

    // localPC.getRemoteStreams = function () {
    //   console.log("MediaStream")
    //   var stream = new MediaStream();

    //   localPC.getRemoteStreams().forEach(function (receiver) {
    //     console.log(receiver)

    //     stream.addTrack(receiver.track);
    //   });
    //   return [stream];
    // };

    localPC.onremovestream = function (event) {
      //console.log('onremovestream', event.stream);
    };




  }



  /* set header*/
  function setWebsocketHeader(userId, schemaName, displayName, userKey, exchangeId, appToken, accessKey, authToken) {

    header = {};

    body = {
      "X-User-Id": userId,
      "X-Display-Name": displayName,
      "X-Application-Access-Key": accessKey,
      "X-Presence-Status": '1',
      "X-Exchange-Id": exchangeId,
      "schemaName": schemaName,
      "X-App-Token": appToken,
      "X-User-Key": userKey,
      "X-Auth-Token": authToken

    }

    header.headers = body
    return header
  }
  /*header end*/


  useFocusEffect(
    useCallback(() => {
      async function functioncall() {
        const userId = await getUserId()
        if (userId) { setUserId(userId); } else { setUserId(''); }
      }
      functioncall()

    }, [userId]),
  );


  useEffect(() => {
    navigation.setOptions({
      title: 'Your ID - ' + userId,
      headerRight: () => (
        <Button mode="text"
          onPress={onLogout} style={{ paddingRight: 10 }}>
          Logout
        </Button>
      ),
    });
  }, [userId]);


  async function onLogout() {
    const userId = await getUserId()
    const schemaName = await getSchemaname()
    ws.close();
    localPC.close()
    remotePC.close()
    //console.log(userId, schemaName, ws)
    if (ws.OPEN == 1) {
      var body = JSON.stringify({
        "id": "leaveRoom",
        "userid": userId,
        "domain": schemaName,
      })
      ws.send(body);


    }

  };



  useEffect(() => {
    //console.log(userId.length)
    //console.log(userId.length)
    if (socketActive && userId.length > 0) {
      try {
        InCallManager.start({ media: 'audio' });
        InCallManager.setForceSpeakerphoneOn(true);
        InCallManager.setSpeakerphoneOn(true);
      } catch (err) {
        //console.log('InApp Caller ---------------------->', err);
      }

      //console.log(InCallManager);

      // send({
      //   type: 'login',
      //   name: userId,
      // });
    }
  }, [socketActive, userId])




  const onLogin = () => { };




  const send = message => {
    //attach the other peer username to our messages
    if (connectedUser) {
      message.name = connectedUser;
      //console.log('Connected iser in end----------', message);
    }

    ws.send(JSON.stringify(message));
  };


  const onCall = async () => {
    setCalling(true);
    setName('muser26')
    const userId = await getUserId()
    const schemaName = await getSchemaname()

    // connectedUser = userId;
    // //console.log(localPC);


    try {
      if (existingParticipants.length > 0) {
        existingParticipants.map((item, index) => {
          localPC.createOffer(offerOptions)
            .then(function (desc) {
              //console.log("createOffer", desc);
              localPC.setLocalDescription(desc);


              var offer = {
                domain: schemaName,
                id: "receiveVideoFrom",
                receiver_userid: item.replace("-web", "").replace("-null", ""),
                //item.replace("-web", "").replace("-null", ""),
                sdpOffer: desc.sdp,
                userid: userId
              }
              //console.log("offersend", offer)
              ws.send(JSON.stringify(offer));

            }).catch(err => console.error(err));
        })
      }
      // self.setState({
      //     sdp: pc.localDescription
      // })
      // //console.log(pc.localDescription)


    } catch (err) {
      console.error(err);
      // }
    }
  };


  const handleOffer = async (offer) => {
    // //console.log(name + ' is calling you.');
    const userId = await getUserId()
    const schemaName = await getSchemaname()

    console.log('Accepting Call===========>', offer);
    connectedUser = name;

    try {
      // await localPC.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: offer.sdpAnswer }), () => {
      //   console.log("setRemotedescription")
      // }, (error) => {
      //   console.log("error descritpion", error)
      // });


      await remotePC.setRemoteDescription(localPC.localDescription);
      const answer = await remotePC.createAnswer();
      await remotePC.setLocalDescription(answer);
      await localPC.setRemoteDescription(remotePC.localDescription);


      IceCandiates.map((item) => {
        if (item) {
          var onicecandidate_value = {
            "domain": schemaName,
            "id": "onIceCandidate",
            "receiver_userid": offer.receiver_userid,
            //data.receiver_userid,
            "userid": userId,
            "candidate": item
            // candiate_
          }
          ws.send(JSON.stringify(onicecandidate_value));
        }
      })


    } catch (err) {
      console.log('Offerr Error', err);
    }
  };


  const handleAnswer = answer => {

    //console.log(answer);
    remotePC.setRemoteDescription(new RTCSessionDescription(answer));
  };


  const toggleMute = () => {
    // if (!remoteStream) return;

    localPC.getAudioTracks().forEach(track => {
      console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  //when we got an ice candidate from a remote user
  const handleCandidate = candidate => {
    setCalling(false);
    // //console.log('Candidate ----------------->', candidate);
    // .addIceCandidate(new RTCIceCandidate(candidate));
    localPC.addIceCandidate(new RTCIceCandidate(candidate)).then(
      // Do stuff when the candidate is successfully passed to the ICE agent
      () =>
        console.log("addIceCandidate success"),
      error =>
        console.log(
          "failed to add ICE Candidate",
          error.toString()
        )
    ).catch(
      //console.log("Error: Failure during addIceCandidate")
    )


  };








  return (
    <View style={styles.root}>
      <View style={styles.inputField}>
        <TextInput
          label="Enter Friends Id"
          mode="outlined"
          style={{ marginBottom: 7 }}
          onChangeText={text => setCallToUsername(text)}
        />
        <Button
          mode="contained"
          onPress={onCall}
          loading={calling}
          //   style={styles.btn}
          contentStyle={styles.btnContent}
          disabled={!(socketActive && userId.length > 0)}>
          Call
        </Button>
        <Button
          mode="contained"
          onPress={onLogout}
          // loading={calling}
          //   style={styles.btn}
          contentStyle={styles.btnContent}
        >
          log off
        </Button>

        <Button
          mode="contained"
          onPress={toggleMute}
          // loading={calling}
          //   style={styles.btn}
          contentStyle={styles.btnContent}
        >
          Touggle mute
        </Button>


      </View>

      <View style={styles.videoContainer}>
        <View style={[styles.videos, styles.localVideos]}>
          <Text>Your Video</Text>
          {localStream.toURL() &&
            <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />}

        </View>
        <View style={[styles.videos, styles.remoteVideos]}>
          <Text>Friends Video</Text>
          {console.log(remotevideoStream)}
          {remotevideoStream == "" ? null :
            remotevideoStream.map((item, index) => {
              console.log(item)
              return (
                <RTCView
                  key={1}
                  zOrder={2}
                  objectFit='cover'
                  streamURL={item.toURL()}
                  style={styles.remoteVideo}
                />

              )
            })

          }
        </View>
      </View>
    </View>
  );

}

export default HomeScreen;


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  inputField: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  videoContainer: {
    flex: 1,
    minHeight: 450,
  },
  videos: {
    width: '100%',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',

    borderRadius: 6,
  },
  localVideos: {
    height: 100,
    marginBottom: 10,
  },
  remoteVideos: {
    height: 400,
    backgroundColor: '#f2f2f2',
  },
  localVideo: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
  },
  remoteVideo: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderColor: 'red'
  },
});



