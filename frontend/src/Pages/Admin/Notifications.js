import { useState } from "react";

function Notifications() {
    const [newNotification, setNewNotification] = useState("");
    const [notifications, setNotifications] = useState([
        { content: "Thông báo 1 ", read: false },
        { content: "Thông báo 2", read: true },
        { content: "Thông báo 3", read: false }
    ]);

    const handleNewNotification = () => {
        if (newNotification.trim() !== "") {
            setNotifications([...notifications, { content: newNotification, read: false }]);
            setNewNotification("");
        }
    };

    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
    };

    const deleteNotification = (index) => {
        const updatedNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(updatedNotifications);
    };

    return (
        <div className="notification-page">
            <div className="notification-receive">
                <h2>Thông báo nhận được</h2>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index} className={notification.read ? "read" : "unread"}>
                            <button onClick={() => markAsRead(index)}>Đánh dấu đã đọc</button>
                            <button onClick={() => deleteNotification(index)} className="delete">Xóa</button>
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