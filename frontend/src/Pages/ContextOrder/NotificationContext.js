import { createContext, useEffect, useState } from "react";
import UserApi from "../../Api/UserApi";
import useSound from "use-sound";
import sound from "./ting.mp3";
export const NotificationContext = createContext();

const { Provider } = NotificationContext;

export const NotificationProvider = (props) => {
    const [play] = useSound(sound, { interrupt: true })
    const [notifications, setNotifications] = useState([]);
    const [oldNotifications, setOldNotifications] = useState([]);
    useEffect(() => {
        UserApi.GetNotifications().then(res => {
            setOldNotifications(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    useEffect(() => {
        play();
    }, [notifications]);
    return (
        <Provider value={[notifications, setNotifications, oldNotifications, setOldNotifications]}>
            {props.children}
        </Provider>
    )
}