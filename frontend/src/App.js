import { useState } from "react";
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat'

const socket = io.connect("http://localhost:3001")
function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [msgView, setMsgView] = useState(false);


  const addUserToRoom = () => {

    console.log("in the fun");
    if (name !== "" && room !== "") {
      //emit id with event name to add users to a specific room
      socket.emit("join_room", room, name);
      setMsgView(true);
    }
  };

  return (
    <div className="App">
      {!msgView ? (<div>
        <h2> Lets get you talking </h2>
        <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
        <input type="text" placeholder="Meeting ID" onChange={(event) => setRoom(event.target.value)} />
        <button type="button" onClick={addUserToRoom} > Join </button>
      </div>) :
        (<Chat name={name} socket={socket} room={room} />)}
    </div>
  );
}

export default App;
