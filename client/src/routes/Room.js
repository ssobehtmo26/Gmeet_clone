import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import micmute from "../assets/micmute.svg";
import micunmute from "../assets/micunmute.svg";
import webcam from "../assets/webcam.svg";
import webcamoff from "../assets/webcamoff.svg";
import "./Room.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faPhone,
  faVideoSlash,
  faAngleUp,
  faClosedCaptioning,
  faDesktop,
  faMicrophoneSlash,
  faCircleInfo,
  faMessage,
  faArrowUpFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video className="StyledVideo" playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
  const location = useLocation();
  const [peers, setPeers] = useState([]);
  const [audioFlag, setAudioFlag] = useState(true);
  const [videoFlag, setVideoFlag] = useState(true);
  const [screensharestat,setScreenShareStat]=useState(false);
  const [userUpdate, setUserUpdate] = useState([]);
  const [username, setUsername] = useState();
  const [callername, setCallername] = useState();
  const [stream,setStream]=useState();
  const navigate = useNavigate();

  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const senders=useRef()

  const params = new URLSearchParams(location.search);
  const roomID = params.get("roomID");

  const videoConstraints = {
    minAspectRatio: 1.333,
    minFrameRate: 60,
    height: window.innerHeight / 1.8,
    width: window.innerWidth / 2,
  };

  useEffect(() => {
    socketRef.current = io.connect("/");
    createStream();
    console.log("creating stream");
  }, []);

  function createStream() {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        const name = localStorage.getItem("email");
        setUsername(name);
        console.log(name);
        localStorage.clear();
        socketRef.current.emit("join room", roomID);
        console.log(`inviting to room ${roomID}`);
        socketRef.current.on("all users", (users) => {
          console.log(users);
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });
        socketRef.current.on("user joined", (payload) => {
          console.log("==", payload);
          console.log("user joined");
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          const peerObj = {
            peer,
            peerID: payload.callerID,
          };
          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("user left", (id) => {
          console.log("user left");
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          console.log("receiving returned signal");
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("change", (payload) => {
          console.log("change");
          setUserUpdate(payload);
        });
      });
  }

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      console.log("sending signal");
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      console.log("returning signal");
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const ShareScreen=()=>{
    navigator.mediaDevices.getDisplayMedia({cursor:true}).then(stream=>{
      const screenTrack=stream.getTracks()[0];
      setScreenShareStat(true);
      senders.current.srcObject= stream;

      screenTrack.onended=function () 
      {
        setScreenShareStat(false);
        // senders.current.find(sender=> sender.track.kind==='video').replaceTrack(userVideo.current.getTracks()(1));
      }
    })
  }




  return (
    <div className="Callpage-item">
      <div className="Container">
        <div className="VideoContainer">
          <video

            
            muted
            ref={userVideo}
            autoPlay
            playsInline
          />
          <div className="Controls">
            <img
              className="ImgComponent"
              src={videoFlag ? webcam : webcamoff}
              onClick={() => {
                if (userVideo.current.srcObject) {
                  userVideo.current.srcObject
                    .getTracks()
                    .forEach(function (track) {
                      if (track.kind === "video") {
                        if (track.enabled) {
                          socketRef.current.emit("change", [
                            ...userUpdate,
                            {
                              id: socketRef.current.id,
                              videoFlag: false,
                              audioFlag,
                            },
                          ]);
                          track.enabled = false;
                          setVideoFlag(false);
                        } else {
                          socketRef.current.emit("change", [
                            ...userUpdate,
                            {
                              id: socketRef.current.id,
                              videoFlag: true,
                              audioFlag,
                            },
                          ]);
                          track.enabled = true;
                          setVideoFlag(true);
                        }
                      }
                    });
                }
              }}
            />
            &nbsp;&nbsp;&nbsp;
            <img
              className="ImgComponent"
              src={audioFlag ? micunmute : micmute}
              onClick={() => {
                if (userVideo.current.srcObject) {
                  userVideo.current.srcObject
                    .getTracks()
                    .forEach(function (track) {
                      if (track.kind === "audio") {
                        if (track.enabled) {
                          socketRef.current.emit("change", [
                            ...userUpdate,
                            {
                              id: socketRef.current.id,
                              videoFlag,
                              audioFlag: false,
                            },
                          ]);
                          track.enabled = false;
                          setAudioFlag(false);
                        } else {
                          socketRef.current.emit("change", [
                            ...userUpdate,
                            {
                              id: socketRef.current.id,
                              videoFlag,
                              audioFlag: true,
                            },
                          ]);
                          track.enabled = true;
                          setAudioFlag(true);
                        }
                      }
                    });
                }
              }}
            />
            <div className="name">{username}</div>
          </div>
        </div>
        <div>
          {screensharestat?(
            <p><video
            className="StyledVideo"
            ref={senders}
            autoPlay
            playsInline
            >

            </video></p>
          ):(
            <p></p>
          )}
        </div>
        {peers.map((peer, index) => {
          let audioFlagTemp = true;
          let videoFlagTemp = true;
          if (userUpdate) {
            userUpdate.forEach((entry) => {
              if (peer && peer.peerID && peer.peerID === entry.id) {
                audioFlagTemp = entry.audioFlag;
                videoFlagTemp = entry.videoFlag;
              }
            });
          }
          return (
            <div key={peer.peerID} className="VideoContainer2">
              <Video peer={peer.peer} />
              <div className="ControlSmall">
                <img
                  className="ImgComponentSmall"
                  src={videoFlagTemp ? webcam : webcamoff}
                />
                &nbsp;&nbsp;&nbsp;
                <img
                  className="ImgComponentSmall"
                  src={audioFlagTemp ? micunmute : micmute}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer-item">
        <div className="left-item">
          <div className="text">
            <iframe
              src="https://free.timeanddate.com/clock/i8wb6p4g/n1884/tlin/fs16/avb/ftb/th2/ts1"
              frameborder="0"
              width="71"
              height="20"
            ></iframe>
            | Meet id: {roomID}
          </div>
        </div>
        <div className="center-item" style={{ marginRight: "20px" }}>
          <FontAwesomeIcon
            className="ficons"
            icon={videoFlag ? faVideo : faVideoSlash}
            onClick={() => {
              if (userVideo.current.srcObject) {
                userVideo.current.srcObject
                  .getTracks()
                  .forEach(function (track) {
                    if (track.kind === "video") {
                      if (track.enabled) {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag: false,
                            audioFlag,
                          },
                        ]);
                        track.enabled = false;
                        setVideoFlag(false);
                      } else {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag: true,
                            audioFlag,
                          },
                        ]);
                        track.enabled = true;
                        setVideoFlag(true);
                      }
                    }
                  });
              }
            }}
          />
          <FontAwesomeIcon
            className="ficons"
            icon={audioFlag ? faMicrophone : faMicrophoneSlash}
            onClick={() => {
              if (userVideo.current.srcObject) {
                userVideo.current.srcObject
                  .getTracks()
                  .forEach(function (track) {
                    if (track.kind === "audio") {
                      if (track.enabled) {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag,
                            audioFlag: false,
                          },
                        ]);
                        track.enabled = false;
                        setAudioFlag(false);
                      } else {
                        socketRef.current.emit("change", [
                          ...userUpdate,
                          {
                            id: socketRef.current.id,
                            videoFlag,
                            audioFlag: true,
                          },
                        ]);
                        track.enabled = true;
                        setAudioFlag(true);
                      }
                    }
                  });
              }
            }}
          />
          <FontAwesomeIcon className="ficons" icon={faArrowUpFromBracket} 
          
          size="2xl"
          onClick={ShareScreen}
           />
          <FontAwesomeIcon
            className="ficons"
            icon={faPhone}
            size="2xl"
            beat
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="right-item">
          <FontAwesomeIcon className="icons" icon={faCircleInfo} />
          <FontAwesomeIcon className="icons" icon={faUsers} />
          <FontAwesomeIcon className="icons" icon={faMessage} />
        </div>
      </div>
    </div>
  );
};

export default Room;
