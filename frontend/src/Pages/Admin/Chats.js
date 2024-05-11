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

function Chats() {
    // const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    // const [stompClient, setStompClient] = useState(null)
    const [content, setContent] = useState('')
    const [messages, setMessages, stompClient, username] = useContext(SocketContext);
    const [topicsDict, setTopicsDict] = useState([])
    const [currentTopic, setCurrentTopic] = useState({})
    const messagesEndRef = useRef(null);
    const [messageList, setMessageList] = useState([])
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const scroll = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(() => {
        scroll()
        console.log('messages', messages)
    }, [messages, messageList]);
    const [listUser, setListUser] = useState([
        // {
        //     topic: 'hoangmm06',
        //     name: 'Nguyễn Văn A',
        //     message: 'Chào bạn ......................................'
        // },


    ])

    useEffect(() => {
        console.log(messages)
        const newTopicsDict = JSON.parse(JSON.stringify(topicsDict)); // Sao chép sâu vào
        if (messages.length === 0) return;
        if (newTopicsDict.length === 0) {
            for (let i = 0; i < messages.length; i++) {
                const topicIndex = newTopicsDict.findIndex(topic => topic.topic === messages[i].topic);
                if (topicIndex === -1) {
                    newTopicsDict.push({
                        topic: messages[i].topic,
                        messages: [messages[i]],
                        name: messages[i].name,
                        avatar: messages[i].avatar,
                    });
                } else {
                    newTopicsDict[topicIndex].messages.push(messages[i]);
                }
            }
            setTopicsDict(newTopicsDict);
            return;
        }
        const message = messages[messages.length - 1];
        // messages.forEach(message => {
        const topicIndex = newTopicsDict.findIndex(topic => topic.topic === message.topic);
        if (topicIndex === -1) {
            newTopicsDict.push({
                topic: message.topic,
                name: message.name,
                avatar: message.avatar,
                messages: [message]
            });
        } else {
            newTopicsDict[topicIndex].messages.push(message);
        }
        // });

        newTopicsDict.sort((a, b) => {
            const lastMessageTimeA = new Date(a.messages[a.messages.length - 1].timestamp);
            const lastMessageTimeB = new Date(b.messages[b.messages.length - 1].timestamp);
            return lastMessageTimeA - lastMessageTimeB;
        });

        console.log(newTopicsDict);

        setTopicsDict(newTopicsDict);
        // setCurrentTopic(prev => prev)
        const currentTopicIndex = newTopicsDict.findIndex(topic => topic?.topic === currentTopic?.topic);
        setMessageList(newTopicsDict[currentTopicIndex]?.messages)
    }, [messages]);

    useEffect(() => {
        setMessageList(currentTopic.messages)
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
                    {topicsDict.slice().reverse().map((topic, index) => (
                        <div className="item" key={index} onClick={() => { setCurrentTopic(topic) }}>
                            <div className="wrap_avatar">
                                <img className="avatar" src={(topic.avatar && (topic.avatar.length > 10)) ? topic.avatar : "https://picsum.photos/200"} alt="" />
                            </div>
                            <div className="info">
                                <h4 className="name">{topic.name}</h4>
                                <p className="message">{topic.messages[topic.messages.length - 1].content}</p>
                            </div>
                        </div>
                    ))}



                    {
                        listUser.map((item, index) => (
                            <div className="item" key={index}>
                                <div className="wrap_avatar">
                                    <img className="avatar" src="https://picsum.photos/200" alt="" />
                                </div>
                                <div className="info">
                                    <h4 className="name">{item.name}</h4>
                                    <p className="message">{item.message}</p>
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
                            message.sender == username ? (
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
