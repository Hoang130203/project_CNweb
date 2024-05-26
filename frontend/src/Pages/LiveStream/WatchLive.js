import React, { useEffect, useState } from 'react';

function WatchLive() {
    const [canJoin, setCanJoin] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js';
        script.onload = () => {
            function getUrlParams(url) {
                let urlStr = url.split('?')[1];
                const urlSearchParams = new URLSearchParams(urlStr);
                const result = Object.fromEntries(urlSearchParams.entries());
                return result;
            }

            const params = getUrlParams(window.location.href);
            const roomID = params['roomID'] || "1";
            const userID = Math.floor(Math.random() * 10000) + "";
            const userName = JSON.parse(localStorage.getItem('w15store_user'))?.name || "admin";

            // Determine role based on the URL path
            const isAdmin = window.location.pathname.includes('/admin/');
            const role = isAdmin ? 'admin' : 'viewer';

            const appID = 2089523922;
            const serverSecret = "619491d4a94c8ea3a60fa0128811a1fd";

            const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

            if (canJoin) {
                const maxUsers = 10; // Set your desired max users here
                console.log("Setting maxUsers to:", maxUsers);
                console.log("User role:", role);

                const config = {
                    container: document.querySelector("#livestream-container"),
                    sharedLinks: [{
                        name: 'link',
                        // url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
                    }],
                    scenario: {
                        mode: window.ZegoUIKitPrebuilt.VideoConference,
                    },
                    turnOnMicrophoneWhenJoining: isAdmin, // Only admin can turn on microphone
                    turnOnCameraWhenJoining: isAdmin, // Only admin can turn on camera
                    showMyCameraToggleButton: isAdmin,
                    showMyMicrophoneToggleButton: isAdmin,
                    showAudioVideoSettingsButton: isAdmin,
                    showScreenSharingButton: isAdmin,
                    showTextChat: true,
                    showUserList: true,
                    maxUsers: maxUsers,
                    layout: "Auto",
                    showLayoutButton: false,
                };

                const zp = window.ZegoUIKitPrebuilt.create(kitToken);
                zp.joinRoom(config);
            }
        };

        script.onerror = () => {
            console.error('Failed to load Zego UIKit Prebuilt SDK');
        };

        const live = document.getElementById('livestream');
        if (!live) return;
        live.appendChild(script);

        return () => {
            if (live.contains(script)) {
                live.removeChild(script);
            }
        };
    }, [canJoin]);

    useEffect(() => {
        // Check room info from backend service
        // Make a request to the backend service to check if the room has any participants
        // fetch(`your-backend-api/check-room/1`)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.participantCount > 0) {
        //             setCanJoin(true); // Allow joining if there are users in the room
        //         } else {
        //             alert('Room is empty. Please try again later.');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Failed to check room info:', error);
        //     });
        setCanJoin(true);
    }, []);

    return (
        <div style={{ paddingTop: '100px' }}>
            <div id="livestream" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div id="livestream-container"
                    style={{
                        width: '1200px', height: '600px', overflow: 'hidden',
                        backgroundColor: 'transparent',
                    }}></div>
            </div>
        </div>
    );
}

export default WatchLive;
