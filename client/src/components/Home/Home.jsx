// import React from 'react';
import { useState } from 'react';
import Logo from '../../assets/Logo.png';
import { v4 as uuid } from 'uuid';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const generateRoomId = (e) => {
        e.preventDefault();
        const id = uuid();
        setRoomId(id);
        toast.success("Room Id is Generated");
    }

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error("Both the feilds are Required to fill");
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: { username },
        });
        toast.success("Room is Created!!");
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center aligin-items-center min-vh-100">
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm p-2 mt-5 bg-light rounded">
                        <div className="card-body text-center bg-dark">
                            <img src={Logo} alt="LOGO" className='img-fluid mx-auto d-block mb-2'
                                style={{ maxWidth: "130px" }}
                            />
                            <h4 className="text-light">Enter the Room Id</h4>
                            <div className="form-group">
                                <input type='text' className='form-control mb-2 mt-2' placeholder='Room ID'
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input type='text'
                                    className='form-control mb-2 mt-2'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='User Name' />
                            </div>
                            <button onClick={joinRoom} className="btn btn-success btn-lg btn-block">Join</button>
                            <p className='mt-3 text-light'>{"Don't"} Have Room Id? Create {" "}
                                <span style={{ cursor: "pointer" }}
                                    onClick={generateRoomId}
                                    className='text-success pt-2'>
                                    {"  "} New Room...</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
