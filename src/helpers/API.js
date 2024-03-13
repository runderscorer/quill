import axios from 'axios';

export default class API {
  static findRoom = (roomCode) => {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/search?room_code=${roomCode}`)
  }
}