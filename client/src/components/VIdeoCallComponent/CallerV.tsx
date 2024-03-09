import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

interface StreamContextType {
  localStream: MediaStream | null;
  screenStream: MediaStream | null;
}

const StreamContext = React.createContext<StreamContextType>({ localStream: null, screenStream: null });

const VideoStreamShare = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [isSharingCamera, setIsSharingCamera] = useState<boolean>(false);
  const [isSharingScreen, setIsSharingScreen] = useState<boolean>(false);
  const [isSharingAudio, setIsSharingAudio] = useState<boolean>(true);

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
    };
  }, []);

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

  const startSharingCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: isSharingAudio });
      setLocalStream(stream);
      setIsSharingCamera(true);
    } catch (error) {
      console.error('Error sharing camera:', error);
    }
  };

  const stopSharingCamera = () => {
    setIsSharingCamera(false);
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(null);
    }
  };

  const startSharingScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: isSharingAudio });
      setScreenStream(stream);
      setIsSharingScreen(true);
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
  };

  return (
    <StreamContext.Provider value={{ localStream, screenStream }}>
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

        {isSharingCamera && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='w-96'>
            <h2>You are sharing your camera</h2>
            {isSharingCamera && <video className='my-8 rounded-2xl' autoPlay muted ref={(ref) => { if (ref) ref.srcObject = localStream; }}></video>}
            <button className='bg-teal-500 px-4 py-2 rounded-xl hover:bg-teal-800 mr-4 mt-4' onClick={stopSharingCamera}>Stop Sharing Camera</button>
          </motion.div>
        )}

        {isSharingScreen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='w-[50rem]'>
            <h2>You are sharing your screen</h2>
            <video autoPlay ref={(ref) => { if (ref) ref.srcObject = screenStream; }}></video>
            <button className='bg-teal-500 px-4 py-2 rounded-xl hover:bg-teal-800 mr-4 mt-4' onClick={stopSharingScreen}>Stop Sharing Screen</button>
          </motion.div>
        )}

        {remoteStreams.map((stream, index) => (
          <div className='my-8' key={index}>
            <h2>Remote Stream {index + 1}</h2>
            <video autoPlay ref={(ref) => { if (ref) ref.srcObject = stream; }}></video>
          </div>
        ))}
      </div>
    </StreamContext.Provider>
  );
};

const useStreamContext = () => useContext(StreamContext);

export { VideoStreamShare, useStreamContext };
