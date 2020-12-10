import {  WRITE_BD_EMIT, GET_ORDERS_FOR_SERVER_EMIT, ORDERS_EMIT, RFID_EMIT, START_SOCKET, 
  SEND_DATA_SOCKET, SET_ROBOT_STATUS, GET_ROBOTS_FOR_SERVER_EMIT, ROBOTS_EMIT, SET_SELECTED_ORDERS} from "../config";
var Server = require('socket.io');
const e = require('./event.js');

e.on(START_SOCKET,  function Socket() {
  
  const io = new Server().attach(8090);
  console.log('socket on')

    io.on('connection', (socket) => {

    e.on("cashboxerrors", n=>{
      socket.emit('cashboxerrors', n)
    })
    e.on(RFID_EMIT, n=>{
      socket.emit('UPDATE_RFID', n)
    })
    e.on(ORDERS_EMIT, n=>{
      socket.emit('UPDATE_ORDERS', n)
    })
    e.on(ROBOTS_EMIT, n=>{
      console.log(n)
      socket.emit('UPDATE_ROBOTS', n)
    })


    socket.on(SEND_DATA_SOCKET, (data, message) =>{
      let json_str = JSON.stringify(data);
      e.emit('dbWrite', json_str);
      switch ( message ) {
        case 'dbWrite':
          e.emit(WRITE_BD_EMIT, json_str);
          break;
        case 'Orders':
          e.emit(GET_ORDERS_FOR_SERVER_EMIT, json_str);
          break;
        case 'get_robots':
          e.emit(GET_ROBOTS_FOR_SERVER_EMIT, json_str);
          console.log('роботы')
          break;
        case 'set_robot_status':
          e.emit(SET_ROBOT_STATUS, json_str);
          console.log('роботы ID')
          break;
        case 'set_selected_orders':
          e.emit(SET_SELECTED_ORDERS, json_str);
          // console.log('роботы ID')
          break;
        default:
          console.log('error send data to channel')
      }
    })
  });
});


