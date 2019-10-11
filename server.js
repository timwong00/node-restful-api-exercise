const http = require('http');
const app = require("./app");

// get port from environment variable or 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

console.log(`Server is running on port: ${port}`)

