import React, { createContext, useEffect, useState } from "react";
import UserApi, { base_api } from "../../../Api/UserApi";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import AdminApi from "../../../Api/AdminApi";

export const SocketContext = createContext();

const { Provider } = SocketContext;

export const SocketProvider = (props) => {

    const [messages, setMessages] = useState([]);
    // const [nickname, setNickname] = useState('')

    const [stompClient, setStompClient] = useState(null)
    const [oldMessages, setOldMessages] = useState([]);
    const [username, setUsername] = useState('')
    const [key, setKey] = useState(0);
    const [oldTopicDict, setOldTopicDict] = useState([]);
    const [newTopicDict, setNewTopicDict] = useState([]);
    const [allTopics, setAllTopics] = useState([]);

    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Update key when ref changes
        // console.log('medss', messages);
    }, [allTopics]);
    useEffect(() => {
        let newTopicDict = [...oldTopicDict]
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage) return;
        const topicIndex = newTopicDict.findIndex(topic => topic?.topic === lastMessage?.topic);
        if (topicIndex === -1) {
            newTopicDict.push({
                topic: lastMessage.topic,
                messages: [lastMessage],
                name: lastMessage.name,
                avatar: lastMessage.avatar
            });
        } else {
            newTopicDict[topicIndex].messages.push(lastMessage);
        }
        newTopicDict.sort((a, b) => {
            const lastMessageTimeA = new Date(a.messages[a.messages.length - 1].timestamp);
            const lastMessageTimeB = new Date(b.messages[b.messages.length - 1].timestamp);
            return lastMessageTimeA - lastMessageTimeB;
        });
        setOldTopicDict(newTopicDict);
    }, [messages])
    useEffect(() => {
        AdminApi.GetOldMessages().then((response) => {
            // console.log(response.data)
            setOldMessages(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        setOld()
    }, [oldMessages])
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


    const setOld = () => {
        let newTopicsDict = [];


        for (let i = 0; i < oldMessages.length; i++) {
            let messageFormat = {
                "topic": null,
                "content": '',
                "timestamp": '',
                "sender": "",
                "admin": false,
                "image": "",
                "numOrder": 0,
                "name": "",
            }
            messageFormat.topic = oldMessages[i].topic;
            messageFormat.content = oldMessages[i].content;
            messageFormat.timestamp = oldMessages[i].time;
            // messageFormat.sender = oldMessages[i].sender;f
            messageFormat.admin = oldMessages[i].owner;
            messageFormat.image = oldMessages[i].image;
            messageFormat.name = oldMessages[i].user?.name;
            messageFormat.avatar = oldMessages[i].user?.avatar;
            messageFormat.numOrder = oldMessages[i].numOrder;
            const topicIndex = newTopicsDict.findIndex(topic => topic?.topic === messageFormat.topic);
            if (topicIndex === -1) {
                newTopicsDict.push({
                    topic: messageFormat.topic,
                    messages: [messageFormat],
                    name: messageFormat.name,
                    avatar: messageFormat.avatar
                });
            } else {
                newTopicsDict[topicIndex].messages.push(messageFormat);
            }
        }
        newTopicsDict.sort((a, b) => {
            const lastMessageTimeA = new Date(a.messages[a.messages.length - 1].timestamp);
            const lastMessageTimeB = new Date(b.messages[b.messages.length - 1].timestamp);
            return lastMessageTimeA - lastMessageTimeB;
        });
        for (let i = 0; i < newTopicsDict.length; i++) {
            newTopicsDict[i].messages.sort((a, b) => a.numOrder - b.numOrder)
        }
        console.log('old', newTopicsDict)
        setOldTopicDict(newTopicsDict);
    }
    return (
        <Provider value={[messages, setMessages, stompClient, username, oldTopicDict]}>
            {props.children}
        </Provider>

    );

}