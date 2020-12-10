export const {
    PORT = 3031,
    AMQP_HOST = 'amqp://admin:admin@95.181.230.223', 
    // AMQP_HOST = 'amqp://admin:admin@192.168.0.17', 
    START_SOCKET = 'startSocket',
    SEND_DATA_SOCKET = 'sendData',
    // emit
    RFID_EMIT = 'rfid',
    ORDERS_EMIT = 'orders',
    ROBOTS_EMIT = 'robots',
    WRITE_BD_EMIT = 'socket',
    GET_ORDERS_FOR_SERVER_EMIT = 'GetOrders',
    GET_ROBOTS_FOR_SERVER_EMIT = 'get_robots',


    // queue
    RFID_QUEUE = 'rfid', // queue for get rfid 
    ORDERS_QUEUE = 'orders1',
    ROBOTS_QUEUE = 'robots', 
    WRITE_BD_QUEUE = 'bdmodule',
    GET_ORDERS_REQUERST_QUEUE = 'GetOrders',
    GET_ROBOTS_REQUERST_QUEUE = 'get_robots',


    GET_ROBOTS_EMIT = 'get_robots',
    // ROBOTS_EMIT = 'robots',
    SET_SELECTED_ORDERS = 'set_selected_orders',
    SET_ROBOT_STATUS = 'set_robot_status'
} = process.env;