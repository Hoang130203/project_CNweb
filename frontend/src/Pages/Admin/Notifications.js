import { useContext, useState } from "react";
import { SocketContext } from "./Context/context";
import AdminApi from "../../Api/AdminApi";
import { toast } from "react-toastify";

function Notifications() {
    const [newNotification, setNewNotification] = useState("");
    const [messages, setMessages, stompClient, username, oldTopicDict, notifications, setNotifications, oldNotifications, setOldNotifications] = useContext(SocketContext)


    const handleNewNotification = () => {
        if (newNotification.trim() !== "") {
            // setNotifications([...notifications, { content: newNotification, read: false }]);
            setNewNotification("");
        }
    };

    const markAsRead = (index) => {
        // const updatedNotifications = [...notifications];
        // updatedNotifications[index].read = true;
        // setNotifications(updatedNotifications);
    };

    const deleteNotification = (id) => {
        AdminApi.DeleteNotification(id).then((res) => {
            if (res.status === 200) {
                const updatedNotifications = oldNotifications.filter((_, i) => _.id !== id);
                setOldNotifications(updatedNotifications);
                toast.success("Xóa thông báo thành công");
            }
        }).catch(err => {
            console.log(err);
            toast.error("Xóa thông báo thất bại");
        })
    };

    return (
        <div className="notification-page">
            <div className="notification-receive">
                <h2>Thông báo nhận được</h2>
                <ul>
                    {notifications.toReversed().map((notification, index) => (
                        <li key={index} className={notification.read ? "read" : "unread"}>
                            <button>{index + 1}</button>
                            <span style={{ paddingLeft: '20px' }}>{notification.content}</span>
                        </li>
                    ))}
                </ul>
                <h2>Thông báo cũ</h2>
                <ul>{
                    oldNotifications.length === 0 && <li>Không có thông báo cũ</li>
                }
                    {oldNotifications.toReversed().map((notification, index) => (
                        <li key={index} className={notification.read ? "read" : "unread"}>
                            <button onClick={() => markAsRead(index)}></button>
                            <button onClick={() => deleteNotification(notification.id)} className="delete">Xóa</button>
                            <span style={{ paddingLeft: '20px' }}>{notification.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="notification-send">
                <h2>Viết và gửi thông báo qua email</h2>
                <textarea
                    value={newNotification}
                    onChange={(e) => setNewNotification(e.target.value)}
                    placeholder="Nhập thông báo mới..."
                ></textarea>
                <button onClick={handleNewNotification} >Gửi thông báo</button>
            </div>
        </div>
    );
}

export default Notifications;