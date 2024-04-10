// // import React from 'react'
// import { useEffect, useRef, useState } from 'react';
// import Logo2 from '../../assets/Logo2.png';
// import Client from '../client/Client';
// import Editor from './Editor';
// import { initSocket } from '../../Socket';
// import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
// import { toast } from "react-hot-toast";


// const EditorPage = () => {
//     const socketRef = useRef(null);
//     const location = useLocation();
//     const { roomId } = useParams();
//     const navigate = useNavigate();
//     const [clients, setClients] = useState([]);

//     useEffect(() => {
//         const init = async () => {
//             socketRef.current = await initSocket();
//             socketRef.current.on('connect_error', (err) => handleErrors(err));
//             socketRef.current.on('connect_failed', (err) => handleErrors(err));


//             const handleErrors = (err) => {
//                 console.log('socket error=>', err);
//                 toast.error("Socket Connection Failed");
//                 navigate("/");
//             }
//             socketRef.current.emit('join', {
//                 roomId,
//                 username: location.state?.username,
//             });
//             socketRef.current.on("joined", ({ clients, username, socketId }) => {
//                 if (username !== location.state.username) {
//                     toast.success(`${username} joined the room`);
//                 }
//                 setClients(clients);
//             })
//             socketRef.current.on("disconnected", ({ socketId, username }) => {
//                 toast.success(`${username} leaved the room`)
//                 setClients((prev) => {
//                     return prev.filter(
//                         (client) => client.socketId !== socketId)
//                 })
//             })

//         };
//         init();

//         return () => {
//             socketRef.current.disconnect();
//             socketRef.current.off('joined');
//             socketRef.current.off('disconnected');

//         };
//     }, [])



//     if (!location.state) {
//         return <Navigate to="/" />
//     }

//     return (
//         <div className="container-fluid vh-100">
//             <div className="row h-100">
//                 <div className="col-md-2 bg-dark text-light d-flex flex-column h-100"
//                     style={{ boxShadow: "6px 0px 8px rgba(0,0,0,0.4)" }}
//                 >
//                     <img src={Logo2} alt="LOGO" className='img-fluid mx-auto d-block mb-2'
//                         style={{ maxWidth: "200px", marginTop: "10px" }}
//                     />
//                     <hr style={{ margin: "0px" }} />

//                     {/* Client List Container  */}
//                     <div className="d-flex flex-column overflow-auto">
//                         {clients.map((client) => (
//                             <Client key={client.socketId} username={client.username} />
//                         ))}
//                     </div>
//                     {/* We will add Client here */}
//                     {/* Buttons */}
//                     <div className="mt-auto">
//                         <hr style={{ margin: "0px" }} />
//                         <button className="btn btn-primary mb-2 mt-2" style={{ width: "100%" }}>
//                             Copy Room ID
//                         </button>
//                         <button className="btn btn-danger mb-2 mt-2 px-3 btn-block" style={{ width: "100%" }}>
//                             Leave Room
//                         </button>
//                     </div>
//                 </div>
//                 <div className="col-md-10 text-light d-flex flex-column h-100">
//                     <Editor socketRef={socketRef} roomId={roomId} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EditorPage;


import { useEffect, useRef, useState } from "react";
import Client from '../client/Client';
import Editor from "../Editor/Editor";
import Logo2 from '../../assets/Logo2.png';
import { initSocket } from "../../Socket";
import { ACTIONS } from "../../Actions";
import {
    useNavigate,
    useLocation,
    Navigate,
    useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";

function EditorPage() {
    const [clients, setClients] = useState([]);
    const codeRef = useRef(null);

    const Location = useLocation();
    const navigate = useNavigate();
    const { roomId } = useParams();

    const socketRef = useRef(null);
    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on("connect_error", (err) => handleErrors(err));
            socketRef.current.on("connect_failed", (err) => handleErrors(err));

            const handleErrors = (err) => {
                console.log("Error", err);
                toast.error("Socket connection failed, Try again later");
                navigate("/");
            };

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: Location.state?.username,
            });

            // Listen for new clients joining the chatroom
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    // this insure that new user connected message do not display to that user itself
                    if (username !== Location.state?.username) {
                        toast.success(`${username} joined the room.`);
                    }
                    setClients(clients);
                    // also send the code to sync
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );

            // listening for disconnected
            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room`);
                setClients((prev) => {
                    return prev.filter((client) => client.socketId !== socketId);
                });
            });
        };
        init();

        // cleanup
        return () => {
            socketRef.current && socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, [Location.state?.username, navigate, roomId]); // Added dependencies here

    if (!Location.state) {
        return <Navigate to="/" />;
    }

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success(`roomIs is copied`);
        } catch (error) {
            console.log(error);
            toast.error("unable to copy the room Id");
        }
    };

    const leaveRoom = async () => {
        navigate("/");
    };

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                {/* client panel */}
                <div
                    className="col-md-2 bg-dark text-light d-flex flex-column h-100"
                    style={{ boxShadow: "6px 0px 8px rgba(0,0,0,0.4)" }}
                >
                    <img
                        src={Logo2}
                        alt="Logo"
                        className='img-fluid mx-auto d-block mb-2'
                        style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                    <hr style={{ marginTop: "0.2rem" }} />

                    {/* Client list container */}
                    <div className="d-flex flex-column flex-grow-1 overflow-auto">
                        <span className="mb-2">Members</span>
                        {clients.map((client) => (
                            <Client key={client.socketId} username={client.username} />
                        ))}
                    </div>

                    <hr />
                    {/* Buttons */}
                    <div className="mt-auto ">
                        <button className="btn btn-primary mb-2 mt-2" style={{ width: "100%" }} onClick={copyRoomId}>
                            Copy Room ID
                        </button>
                        <button
                            className="btn btn-danger mb-2 mt-2 px-3 btn-block" style={{ width: "100%" }}
                            onClick={leaveRoom}
                        >
                            Leave Room
                        </button>
                    </div>
                </div>

                {/* Editor panel */}
                <div className="col-md-10 text-light d-flex flex-column h-10 ">
                    <Editor
                        socketRef={socketRef}
                        roomId={roomId}
                        onCodeChange={(code) => {
                            codeRef.current = code;
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditorPage;
