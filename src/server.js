import express from 'express';
import { PORT } from "./config";

const e = require('./modules/event.js');
let channel = require('./modules/channel');
let socket = require('./modules/socket');

(async () => {
  try {
    const app = express();
    e.emit('startSocket');
    
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
})(); 