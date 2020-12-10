import { RFID_QUEUE, ORDERS_QUEUE, ROBOTS_QUEUE, AMQP_HOST, WRITE_BD_EMIT, GET_ROBOTS_FOR_SERVER_EMIT, GET_ROBOTS_REQUERST_QUEUE,
  GET_ORDERS_FOR_SERVER_EMIT, WRITE_BD_QUEUE, GET_ORDERS_REQUERST_QUEUE, RFID_EMIT, ORDERS_EMIT, ROBOTS_EMIT, SET_ROBOT_STATUS, SET_SELECTED_ORDERS} from "../config";
const e = require('./event.js');
var orders = new Array;
var robots = new Array;
var amqp = require('amqplib/callback_api');


try {

  amqp.connect(AMQP_HOST, function(err, connection) {
    if (err) {
      throw err;
    } else {
        connection.createChannel(function(err1, channel) {
          if (err1) {
            throw err1;
          }
          channel.assertQueue(RFID_QUEUE, {durable: false });
          channel.assertQueue(GET_ORDERS_REQUERST_QUEUE, {durable: true });
          channel.assertQueue('parser_data', {durable: false });
          channel.prefetch(1);
      
          channel.consume(RFID_QUEUE, function(msg) {
            var obj = JSON.parse(msg.content.toString());
            e.emit(RFID_EMIT, obj);
            
            console.log(" [x] Received %s",RFID_QUEUE, obj);
          }, {
            noAck: true
          });
          channel.consume('cashboxerrors', function(msg) {
            e.emit('cashboxerrors', msg.content.toString());
            console.log(" [x] Received %s",'cashboxerrors', msg.content.toString());
          }, {
            noAck: true
          });
      
          channel.consume(ORDERS_QUEUE, function(msg) {
            var obj = JSON.parse(msg.content.toString());
            if (obj === "end") {
              console.log(orders);
              e.emit(ORDERS_EMIT, orders);
              orders = [];
            } else orders.push(obj);
            console.log(" [x] Received %s", ORDERS_QUEUE, msg.content.toString());
          }, {
            noAck: true
          });

          channel.consume(ROBOTS_QUEUE, function(msg) {
            var robots = JSON.parse(msg.content.toString());
            console.log(" [x] Received %s", ROBOTS_QUEUE, msg.content.toString());
            e.emit(ROBOTS_EMIT, robots);
          }, {
            noAck: true
          });
      
          // channel.consume('parser_data', function(msg) {
          //   let obj = JSON.parse(msg.content.toString());
          //   console.log(obj)
          //   e.emit(ORDERS_EMIT, obj);
          // }, {
          //   noAck: true
          // });
      
          e.on(WRITE_BD_EMIT,  n => {
            channel.sendToQueue(WRITE_BD_QUEUE, Buffer.from(n));
            console.log("send to queue",WRITE_BD_QUEUE,n)}
          );
          e.on(GET_ORDERS_FOR_SERVER_EMIT,  n => { 
            channel.sendToQueue(GET_ORDERS_REQUERST_QUEUE, Buffer.from(n));
            console.log("send to queue",GET_ORDERS_REQUERST_QUEUE,n)}
          );

          e.on(GET_ROBOTS_FOR_SERVER_EMIT,  n => { 
            channel.sendToQueue(GET_ROBOTS_REQUERST_QUEUE, Buffer.from(n));
            console.log("send to queue",GET_ROBOTS_REQUERST_QUEUE,n)}
          );

          e.on(SET_ROBOT_STATUS,  n => { 
            channel.sendToQueue(SET_ROBOT_STATUS, Buffer.from(n));
            console.log("send to queue",SET_ROBOT_STATUS,n)}
          );

          e.on(SET_SELECTED_ORDERS,  n => { 
            channel.sendToQueue(SET_SELECTED_ORDERS, Buffer.from(n));
            console.log("send to queue",SET_SELECTED_ORDERS,n)}
          );
        });
    }
  });
   
} catch (e) {
    console.log('RabbitMQ not connected')
}


