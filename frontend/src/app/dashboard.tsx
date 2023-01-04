import { useState, useEffect } from 'react'

import ChatContainer from '../components/chat';

import {
  Link
} from "react-router-dom";

const typePage = 'dashboard';

declare global {
  interface Window { MyNamespace: any; }
}


import { io, Socket } from "socket.io-client";
var socket: Socket;

function Dashboard({user}: any) {
    const [loading, setLoading] = useState(false);
    
       
    useEffect(() => {
      setTimeout(() => {
        socket = io('localhost:9090')
        setTimeout(() => {
          emited({}, 'connected', socket)
        }, 1000)
        socket.on('connected', (message: any) => {
          setLoading(true)
        })
      }, 1000)
    }, []);

    const emited = (data, type, socket) => {
      socket.emit('message', {
        'data': {
          'type': type,
          'receive': data,
          'token': window.localStorage.getItem('token')
        }
      })
    }
    

    return (
      <div className="App">
        { loading ? <ChatContainer user={user} socket={socket} emited={emited}/> : <div>Loading...</div> }
      </div>
    )
}

export default Dashboard
