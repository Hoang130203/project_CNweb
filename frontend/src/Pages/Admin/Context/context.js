import React, { createContext, useEffect, useState } from "react";
import UserApi, { base_api } from "../../../Api/UserApi";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';

export const SocketContext = createContext();

const { Provider } = SocketContext;

export const SocketProvider = (props) => {
    let messageFormat = {
        "topic": null,
        "content": '',
        "timestamp": '',
        "sender": "",
        "admin": false
    }
    const [messages, setMessages] = useState([]);
    // const [nickname, setNickname] = useState('')

    const [stompClient, setStompClient] = useState(null)

    const [username, setUsername] = useState('')
    const [key, setKey] = useState(0);
    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Update key when ref changes
        console.log('medss', messages);
    }, [messages]);
    useEffect(() => {
        let client = null;

        // alert(messagee)
        UserApi.GetUserID().then((response) => {
            console.log(response.data)
            setUsername(response.data)
        }).catch((error) => {
            console.log(error)
        })

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
            // Khi stompClient được thiết lập, chỉ thực hiện subscribe một lần
            const subscription = stompClient.subscribe('/topic-admin', (response) => {
                setMessages(prevMessages => [...prevMessages, JSON.parse(response.body)]);
            });

            return () => {
                // Hủy đăng ký khi component bị unmount
                subscription.unsubscribe();
            };
        }
    }, [stompClient]);

    return (
        <Provider value={[messages, setMessages, stompClient, username]}>
            {props.children}
        </Provider>

    );

}