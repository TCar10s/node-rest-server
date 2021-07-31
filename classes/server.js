const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Middlewares -> Función que se ejecutará cuando levantemos el server
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // Politica de CORS
    this.app.use(cors());

    // Con la palabra use indicamos que es un miiddleware
    this.app.use(express.static('public')); // Public directory
  }

  routes() {
    // Middleware de rutas
    this.app.use(this.usersPath, require('../routes/users'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
