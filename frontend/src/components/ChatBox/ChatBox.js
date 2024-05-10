import { AiFillMessage } from "react-icons/ai";
import React, { useEffect, useRef, useState } from 'react';
import Stomp from 'stompjs';
import './ChatBox.css';
import { IoMdCloseCircle } from "react-icons/io";
import UserApi from "../../Api/UserApi";
import SockJS from "sockjs-client";
import { base_api } from "../../Api/UserApi";
import { TiAttachment } from "react-icons/ti";

function ChatBox() {
    const [showContent, setShowContent] = useState(false);
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [topicId, setTopicId] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [number, setNumber] = useState(0);
    const [key, setKey] = useState(0);
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Update key when ref changes
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        let client = null;
        const connectToWebSocket = async () => {
            const socket = new SockJS(`${base_api}/ws`, { withCredentials: true });
            socket.withCredentials = true;
            client = Stomp.over(socket);

            await new Promise((resolve, reject) => {
                client.connect({}, () => {
                    resolve();
                }, (error) => {
                    reject(error);
                });
            });

            setStompClient(client);
        };
        if (!stompClient) {
            connectToWebSocket();
        } else {
            const subscription = stompClient.subscribe('/topic/' + topicId, (response) => {
                setMessages(prevMessages => [...prevMessages, JSON.parse(response.body)]);
                if (!showContent) {
                    setNumber(prev => prev + 1);
                } else {
                    setNumber(prev => 0);
                    scroll();
                }
            });

            return () => {
                subscription.unsubscribe();
            };
        }

    }, [stompClient, topicId]);

    useEffect(() => {
        UserApi.GetUserID().then((response) => {
            setTopicId(response.data);
        }).catch((error) => {
            console.log(error);
        });
        setMessages([
            {
                "type": 'MESSAGE',
                "topic": null,
                "content": "sdf",
                "timestamp": "2024-05-09T07:46:56.475+00:00",
                "sender": "B5zwUgg4JDpXUoM",
                "admin": true
            },
            {
                "topic": null,
                "content": "Hi",
                "timestamp": "2024-05-09T07:47:04.196+00:00",
                "sender": "B5zwUgg4JDpXUoM",
                "admin": false
            }
        ]);
    }, []);

    useEffect(() => {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password') {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [visible]);

    const sendMessage = async () => {
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
                topic: topicId,
                content: mess,
                image: url,
            }));
        }
    };

    const scroll = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    };

    useEffect(() => {
        scroll();
    }, [showContent, key]);

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleRemoveFile = () => {
        setFile(null);
        setImage(null);
    }
    return (
        <div>
            <div className={`wrap_chatbox ${number > 0 && !showContent ? 'expanded' : ''}`} onClick={() => { setShowContent(prev => !prev); setNumber(0); }} style={{ display: visible ? 'block' : 'none' }}>
                <AiFillMessage className="icon" />
                {
                    (number > 0 && !showContent) ? <div className="notification">
                        {number}
                    </div> : null
                }

            </div>
            <div className="wrap_chatbox_content" style={{ display: showContent ? 'block' : 'none' }} key={key}>
                <div className="header">
                    <div className="title">
                        Quản trị viên
                    </div>
                    <div className="close" onClick={() => { setShowContent(false) }}>
                        <IoMdCloseCircle />
                    </div>
                </div>
                <div className="content">
                    {messages.map((message, index) => (
                        message.type === 'MESSAGE' ? (
                            (message.admin) ? (
                                <>
                                    <div className="message" key={index}>
                                        <img className="avatar" src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-dien-thoai-dep-danh-cho-nhung-ai-thich-phong-cach-co-trang.jpg" alt="Avatar" />
                                        <div className="text">
                                            {message.content}
                                        </div>
                                    </div>
                                    <div className="image_wrap_2" style={{ display: (message.image?.length > 6) ? '' : 'none' }}>
                                        <img src={message.image} alt="" className="image" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="message_user" key={index}>
                                        <div className="text">
                                            {message.content}
                                        </div>
                                        <img className="avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                                    </div>
                                    <div className="image_wrap" style={{ display: (message.image?.length > 6) ? '' : 'none' }}>
                                        <img src={message.image} alt="" className="image" />
                                    </div>
                                </>
                            )
                        ) : null
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="input">

                    <img onClick={handleRemoveFile} className="image" src={image} alt="image" style={{ display: image ? '' : 'none' }}></img>

                    <label htmlFor="input_image">
                        <TiAttachment className="icon" />
                    </label>
                    <input type="file" id="input_image" style={{ display: 'none' }} onChange={(e) => { handleChangeFile(e) }} />
                    <input type="text" className="input_text" placeholder="Nhập tin nhắn" onKeyDown={(e) => { if (e.key === 'Enter') { sendMessage() } }} value={message} onChange={(e) => { setMessage(e.target.value); setNumber(0) }} />
                    <button className="send" onClick={sendMessage}>Gửi</button>
                </div>

            </div>
        </div>
    );
}

export default ChatBox;
