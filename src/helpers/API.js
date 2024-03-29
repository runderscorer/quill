import axios from 'axios';

export default class API {
  static createGame = (hostName, roomCode) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`, {
      host_name: hostName,
      room_code: roomCode
    })
  }

  static findGame = (roomCode) => {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/search?room_code=${roomCode}`)
  }

  static leaveGame = (playerId, roomCode) => {
    return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/players/${playerId}?room_code=${roomCode}`)
  }

  static createPlayer = (playerName, roomCode) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/players`, {
      name: playerName,
      room_code: roomCode
    })
  }

  static updatePlayer = (playerId, playerName) => {
    return axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${playerId}`, {
      name: playerName
    })
  }
}