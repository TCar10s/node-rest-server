const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Connection to BD
    this.connectDB();

    // Middlewares -> Function that will be executed when we raise the server
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS Policy
    this.app.use(cors());

    // Reading and parsing the BODY
    this.app.use(express.json());

    // With the word 'use' we indicate that it is a middleware
    this.app.use(express.static('public')); // Public directory
  }

  routes() {
    // Middleware for routes
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
