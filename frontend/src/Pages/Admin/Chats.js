import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SockJsClient from 'react-stomp';
import SockJS from "sockjs-client";
import Stomp from 'stompjs';

function Chats() {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [nickname, setNickname] = useState('')
    const [stompClient, setStompClient] = useState(null)
    const [content, setContent] = useState('')
    useEffect(() => {
        let client = null;

        axios.get('http://localhost:8080/api/test', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data)
            setContent(response.data)
        }).catch((error) => {
            console.log(error)
        })

        const connectToWebSocket = async () => {
            const socket = new SockJS('http://localhost:8081/ws');
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
            // Khi stompClient được thiết lập, chỉ thực hiện subscribe một lần
            const subscription = stompClient.subscribe('/topic/messages', (response) => {
                setMessages(prevMessages => [...prevMessages, JSON.parse(response.body)]);
            });

            return () => {
                // Hủy đăng ký khi component bị unmount
                subscription.unsubscribe();
            };
        }
    }, [stompClient]);


    const handleNicknameChange = (e) => {
        setNickname(e.target.value)
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }
    const sendMessage = () => {
        console.log(messages)
        if (message.trim() && stompClient) {
            stompClient.send("/app/chat", {}, JSON.stringify({
                nickname: nickname,
                content: message
            }))
            setMessage('')
        }
    }

    return (
        <div style={{ left: '20%', position: 'relative', padding: '30px' }}>
            {messages.map((message, index) => {
                return (
                    <div key={index} style={{ display: 'flex' }}>

                        <p >{message.nickname}</p>
                        &nbsp;&nbsp;&nbsp;
                        <p>{message.content}</p>
                    </div>
                )
            })}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input label='Nickname' id='standard-basic' variant='standard' value={nickname} onChange={handleNicknameChange}></input>
                <input label='message' id='standard-basi' variant='standard' value={message} onChange={handleMessageChange}></input>
                <button variant='contained' onClick={sendMessage} disabled={!message.trim()}>Send</button>
            </div>
            {content.toString()}
        </div>
    );
}

export default Chats;
