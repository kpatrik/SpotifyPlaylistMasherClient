module.exports = {
  "server": {
    "host": process.env.REACT_APP_SERVER_HOST || "http://localhost:3001"
  },
  "client": {
    "host": process.env.REACT_APP_CLIENT_HOST || "http://localhost:3000"
  }
}