import {io} from 'socket.io-client'

// Create a socket instance
const socket = io(`http://localhost:8000`)

export {socket}
