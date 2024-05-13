import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SockJsClient from 'react-stomp';
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import UserApi from '../../Api/UserApi'
import { base_api } from "../../Api/UserApi";
import { SocketContext } from "./Context/context";
import { useContext } from "react";
import './css/chat.css'
import { FaSearch } from "react-icons/fa";
import { TiAttachment } from "react-icons/ti";
const mergerTopic = (oldTopicDict, newTopicsDict) => {
    let old = oldTopicDict.filter(oldTopic => {
        const newTopicIndex = newTopicsDict.findIndex(newTopic => newTopic.topic === oldTopic.topic);
        if (newTopicIndex === -1) {
            return true;
        }
        // const newMessages = newTopicsDict[newTopicIndex].messages;
        // const oldMessages = oldTopic.messages;
        // const lastNewMessage = newMessages[newMessages.length - 1];
        // const lastOldMessage = oldMessages[oldMessages.length - 1];
        // if (lastNewMessage.timestamp !== lastOldMessage.timestamp) {
        //     return true;
        // }
        return false;
    }
    );
    return [...old, ...newTopicsDict];
}
function Chats() {
    // const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    // const [stompClient, setStompClient] = useState(null)
    const [messages, setMessages, stompClient, username, oldTopicDict] = useContext(SocketContext);
    const [currentTopic, setCurrentTopic] = useState({})
    const messagesEndRef = useRef(null);
    const [messageList, setMessageList] = useState([])
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [key, setKey] = useState(0)
    const [key2, setKey2] = useState(0)
    const scroll = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(() => {
        scroll()

        setKey2(prevKey => prevKey + 1);
    }, [key])

    useEffect(() => {
        scroll()
        setKey(prevKey => prevKey + 1);
    }, [messageList, messages]);

    useEffect(() => {
        const index = oldTopicDict.findIndex(topic => topic.topic === currentTopic.topic)
        setMessageList(oldTopicDict[index]?.messages)
    }, [currentTopic])


    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = async () => {
        // console.log(messages)
        if (message.trim() && stompClient) {
            var mess = message;
            setMessage('');
            setImage(null);
            setFile(null)
            var url = ''
            if (file) {
                await UserApi.PostImage(file).then((response) => {
                    url = response.data.url;
                }).catch((error) => {
                    console.log(error);
                });
            }
            await stompClient.send("/app/chat", {}, JSON.stringify({
                topic: currentTopic.topic,
                sender: username,
                content: message,
                image: url
            }))
            setMessage('')
        }
    }

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleRemoveFile = () => {
        setFile(null);
        setImage(null);
    }
    return (
        <div className="wrap_chatpage" style={{ position: 'relative', padding: '30px' }}>
            <div className="sidebar">
                <div className="header">
                    <h3 className="title">Chat</h3>
                    <div className="search">
                        <input type="text" placeholder="Tìm kiếm" />
                        <button >
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <div className="list">

                    {
                        oldTopicDict.slice().reverse().map((topic, index) => (
                            <div className="item" key={index} onClick={() => { setCurrentTopic(topic) }}>
                                <div className="wrap_avatar">
                                    <img className="avatar" src={(topic.avatar && (topic.avatar.length > 10)) ? topic.avatar : "https://picsum.photos/200"} alt="" />
                                </div>
                                <div className="info">
                                    <h4 className="name">{topic.name}</h4>
                                    <p className="message">{topic.messages[topic.messages.length - 1].content}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className="content" style={{ display: currentTopic.topic ? 'block' : 'none' }}>
                <div className="header">

                    <div className="info">
                        <img className="avatar" src={(currentTopic.avatar && (currentTopic.avatar?.length > 10)) ? currentTopic.avatar : "https://picsum.photos/200"} alt="" />
                        <h4 className="name">{currentTopic.name}</h4>
                    </div>
                </div>
                <div className="chat">
                    {
                        messageList?.map((message, index) => (
                            message.admin ? (
                                <>
                                    <div className="message_user" key={index}>
                                        <div className="text">
                                            {message.content}
                                        </div>
                                        <img className="avatar" src={(currentTopic.avatar && (currentTopic.avatar?.length > 10)) ? currentTopic.avatar : "https://picsum.photos/200"} alt="Avatar" />

                                    </div>
                                    <div className="image_wrap_2" style={{ display: (message.image?.length > 6) ? '' : 'none' }}>
                                        <img src={message.image} alt="" className="image" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="message" key={index}>
                                        <img className="avatar" src={(currentTopic.avatar && (currentTopic.avatar?.length > 10)) ? currentTopic.avatar : "https://picsum.photos/200"} alt="Avatar" />
                                        <div className="text">
                                            {message.content}
                                        </div>

                                    </div>
                                    <div className="image_wrap" style={{ display: (message.image?.length > 6) ? '' : 'none' }}>
                                        <img src={message.image} alt="" className="image" />
                                    </div></>
                            )
                        ))
                    }
                    <div ref={messagesEndRef} />
                </div>
                <div className="input">
                    <img onClick={handleRemoveFile} className="image" src={image} alt="image" style={{ display: image ? '' : 'none' }}></img>

                    <label htmlFor="input_image">
                        <TiAttachment className="icon" />
                    </label>
                    <input type="file" id="input_image" style={{ display: 'none' }} onChange={(e) => { handleChangeFile(e) }} />
                    <input type="text" className="input_text" placeholder="Nhập tin nhắn" onKeyDown={(e) => { if (e.key === 'Enter') { sendMessage() } }} value={message} onChange={handleMessageChange} />
                    <button className="btn_send" onClick={sendMessage}>Gửi</button>
                </div>
            </div>
        </div>
    );
}

export default Chats;