import { useState, useEffect } from 'react'

import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom"


interface User {
  id: string;
  username: string;
  token: string;
  email: string;
  discrimination: string;
  avatar: string;
  bg: string;
  admin: string;
}

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

import { Socket } from "socket.io-client";

function ChatContainer(props:Props) {
  const [user_atual, setUser] = useState<User>(props.user);
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    props.emited({}, 'getFriends', props.socket)

    props.socket.on('getFriendsChat', (friends: User[]) => {
      setUsers(friends)
    })
  }, [])

  return (
    <div className="Chat_Container">
      <div className='left_chat'>
        <ul>
          { users?.map((user) => (
            <li>
              { user?.username }
            </li>
          )) }
        </ul>
      </div>
    </div>
  )
}

export default ChatContainer
