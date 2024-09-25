import API from "./API";

export default class Helper {
  static findGame = (roomCode, handleSetGameInfo) => {
    API.findGame(roomCode)
      .then(response => {
        handleSetGameInfo(response.data.data.attributes)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
