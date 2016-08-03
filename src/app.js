var startServer = require('./server');

// TODO move to config
var PORT = 3000;

// TODO make IP address configurable, defaulting to 0.0.0.0, and pass
// to startServer

startServer(PORT);
