import { connect } from "socket.io-client";

let socket = connect("http://localhost:5001")

export const getSocket = () => socket


export const emmitEvent = (key: string, room: string) => {
    if (!socket) {
        socket = connect("http://localhost:5001")
    }
    socket.emit(key, room)
}
