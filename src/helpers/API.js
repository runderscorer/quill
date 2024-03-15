import axios from 'axios';

export default class API {
  static findRoom = (roomCode) => {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/search?room_code=${roomCode}`)
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