import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';

const VideoStreamShare = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [isSharingCamera, setIsSharingCamera] = useState<boolean>(false);
  const [isSharingScreen, setIsSharingScreen] = useState<boolean>(false);
  const [isSharingAudio, setIsSharingAudio] = useState<boolean>(true);
  const [signalingServer, setSignalingServer] = useState<WebSocket | null>(null);

  useEffect(() => {
    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    startLocalStream();

    // Set up signaling server connection
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      handleSignalingMessage(data);
    };
    setSignalingServer(ws);

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      if (screenStream) {
        screenStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      if (peerConnection) {
        peerConnection.close();
      }
      if (signalingServer) {
        signalingServer.close();
      }
    };
  }, []);

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection();

    pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        // Send the candidate to the remote peer via signaling server
        signalingServer?.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
      }
    };

    pc.ontrack = (event: RTCTrackEvent) => {
      setRemoteStreams([...remoteStreams, event.streams[0]]);
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }
    if (screenStream) {
      screenStream.getTracks().forEach((track) => {
        pc.addTrack(track, screenStream);
      });
    }

    setPeerConnection(pc);
  };

  const startSharingCamera = () => {
    if (localStream) {
      setIsSharingCamera(true);
      createPeerConnection();
      signalingServer?.send(JSON.stringify({ type: 'streamInfo', streamType: 'camera' }));
    }
  };

  const stopSharingCamera = () => {
    setIsSharingCamera(false);
    if (peerConnection) {
      peerConnection.close();
    }
  };

  const startSharingScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setScreenStream(stream);
      setIsSharingScreen(true);
      createPeerConnection();
      signalingServer?.send(JSON.stringify({ type: 'streamInfo', streamType: 'screen' }));
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopSharingScreen = () => {
    setIsSharingScreen(false);
    if (screenStream) {
      screenStream.getTracks().forEach((track) => {
        track.stop();
      });
      setScreenStream(null);
    }
    if (peerConnection) {
      // peerConnection.close();
    }
  };

  const toggleAudioSharing = () => {
    setIsSharingAudio(!isSharingAudio);
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isSharingAudio;
      });
    }
    if (screenStream) {
      screenStream.getAudioTracks().forEach((track) => {
        track.enabled = !isSharingAudio;
      });
    }
  };

  const handleSignalingMessage = (data: any) => {
    switch (data.type) {
      case 'streamInfo':
        if (data.streamType === 'camera' && isSharingCamera) {
          createPeerConnection();
        } else if (data.streamType === 'screen' && isSharingScreen) {
          createPeerConnection();
        }
        break;
      case 'candidate':
        // Add remote ICE candidate to the peer connection
        peerConnection?.addIceCandidate(new RTCIceCandidate(data.candidate));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {!isSharingCamera && !isSharingScreen && (
        <div>
          <h2>Start sharing</h2>
          <button className='bg-teal-500 px-4 py-2 rounded-xl hover:bg-teal-800 mr-4' onClick={startSharingCamera}>Share Camera</button>
          <button className='bg-teal-500 px-4 py-2 rounded-xl hover:bg-teal-800 mr-4' onClick={startSharingScreen}>Share Screen</button>
          <button className='bg-teal-500 px-4 py-2 rounded-xl hover:bg-teal-800 mr-4' onClick={toggleAudioSharing}>
            {isSharingAudio ? 'Mute Audio' : 'Unmute Audio'}
          </button>
        </div>
      )}

      {(isSharingCamera || isSharingScreen) && (
        <div>
          {isSharingCamera && (
            <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='w-[30rem]'>
              <h2>You are sharing your camera</h2>
              {isSharingCamera&&<video className='my-8 rounded-2xl' autoPlay muted ref={(ref: any) => {if(ref) return ref.srcObject = localStream}}></video>}
              <button className='bg-teal-500 px-4 py-2 rounded-xl hover:bg-teal-800 mr-4 mt-4' onClick={stopSharingCamera}>Stop Sharing Camera</button>
            </motion.div>
          )}
          {isSharingScreen && (
            <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='w-[35rem]'>
              <h2>You are sharing your screen</h2>
              <video className='my-4 rounded-2xl' autoPlay ref={(ref: any) => {if(ref) return ref.srcObject = screenStream}}></video>
              <button className='bg-teal-500 px-4 py-2 rounded-xl hover:bg-teal-800 mr-4 mt-4' onClick={stopSharingScreen}>Stop Sharing Screen</button>
            </motion.div>
          )}
        </div>
      )}

      {remoteStreams.map((stream, index) => (
        <div className='my-8' key={index}>
          <h2>Remote Stream {index + 1}</h2>
          <video autoPlay ref={(ref: any) => (ref.srcObject = stream)}></video>
        </div>
      ))}
    </div>
  );
};

export default VideoStreamShare;
