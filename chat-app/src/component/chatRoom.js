import {useEffect, useRef, useState} from "react";
import {Routes, Route, useLocation} from 'react-router-dom';
import {io} from "socket.io-client";
import removeItemWithSlice from '../commen/commen'
import './chatroom.css';

const ChatRoom = () => {
    let params = useLocation();
    const {state: user} = params;
    const scrollab = useRef();
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const socket = useRef(io.connect("http://localhost:3010/socket", {transports: ["websocket"]}))
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        console.log(params.state)
        socket.current.on("newMessage", (message) => {
            console.log(message)
            setMessages(messages => messages.concat(message))
            scrollab.current.scroll(0,scrollab.current.scrollHeight)
        })
        socket.current.on("deleteMsg" , id=>{
            setMessages(function (messages) {
                let findIndex = -1;
                messages.forEach((message, index) => {
                    if (message.id == id) {
                        findIndex = index;
                    }
                });
                return removeItemWithSlice(messages, findIndex);
            });        })
    }, []);
    const sendMessage = () => {
        if (!newMessage)
            return;
        socket.current.emit("newMessage", {
            id: "",
            date: "",
            msg: newMessage,
            sender: {
                name: params.state.name,
                gender: params.state.gender,
            }

        });
        setNewMessage("");
    }
    const interHandler = (e) => {
        if (e.key=== 'Enter'){
            sendMessage()
        }
    }
    const deleteHandler = (id) => {
      socket.current.emit("deleteMsg" , id)
    }
    return (

        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center width">
                    <div className="col-md-6">
                        <div className="card card-bordered">
                            <div className="card-header">
                                <h4 className="card-title"><strong>Chat</strong></h4>
                            </div>


                            <div className="ps-container ps-theme-default ps-active-y" id="chat-content" ref={scrollab} >
                                {
                                    messages.map((message) => {
                                        if (message.sender.name === params.state.name)
                                            return (<div className="media media-chat" key={message.id} >

                                                <div className="media-body">

                                                <p className="meta">
                                                    <time dateTime="2018">{message.sender.name}</time>
                                                </p>
                                                    <p>{message.msg}
                                                    </p>

                                                    <p className="meta">
                                                        <time dateTime="2022">
                                                            {message.date.split("T")[1].split(".")[0]}
                                                          <i className="fa fa-solid fa-trash px-2 text-danger"  onClick={()=>deleteHandler(message.id)}></i>

                                                        </time>
                                                    </p>
                                                </div>
                                            </div>)
                                        else
                                            return (
                                                <div className="media media-chat media-chat-reverse" key={message.id}>

                                                    <div className="media-body  d-block">
                                                        <p className="meta">
                                                            <time dateTime="2018">{message.sender.name}</time>
                                                        </p>
                                                        <p>{message.msg}
                                                        </p>
                                                        <p className="meta">
                                                            <time dateTime="2022">
                                                                {message.date.split("T")[1].split(".")[0]}

                                                            </time>
                                                        </p>
                                                    </div>
                                                </div>)

                                    })
                                }


                                <div className="ps-scrollbar-x-rail">
                                    <div className="ps-scrollbar-x" tabIndex="0"></div>
                                </div>
                                <div className="ps-scrollbar-y-rail">
                                    <div className="ps-scrollbar-y" tabIndex="0"></div>
                                </div>
                            </div>

                            <div className="publisher bt-1 border-light">
                                <img className="avatar avatar-xs"
                                     src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                                <input
                                    className="publisher-input w-50"
                                    type="text"
                                    placeholder="Write something"
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    onKeyDown={interHandler}
                                />

                                <button className="publisher-btn text-info" onClick={sendMessage}><i
                                    className="fa fa-paper-plane"></i></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ChatRoom