import React, { useState, useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, name, room }) {
    //only holds a single msg
    const [currentMsg, setCurrentMsg] = useState("")
    // state to hold the to and fro msg
    const [msgList, setMsgList] = useState([]);
    const sendMsg = async () => {
        if (currentMsg !== "") {
            const message = {
                room: room,
                author: name,
                message: currentMsg
            }
            //send message to backend
            await socket.emit("send_message", message);
            setMsgList((list) => [...list, message])
            setCurrentMsg("");
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMsgList((list) => [...list, data]);
        });

    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Realtime chat</p>

            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {msgList.map((msg) => <div
                        className="message"
                        id={name === msg.author ? "you" : "other"}
                    >
                        <p className="message-content">{msg.message}</p>
                        <div className="message-meta">
                            <p id="author">{msg.author}</p>
                        </div>
                    </div>
                    )}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    value={currentMsg}
                    type="text"
                    className=""
                    placeholder="type message"
                    onChange={(event) => setCurrentMsg(event.target.value)} />
                <button onClick={sendMsg}> send</button>
            </div>
        </div >
    )
}
