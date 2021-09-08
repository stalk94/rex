const mqtt = require("mqtt");


/**
 * Связь с api брокера 
 * @returns connection
 */
exports.conect = function(client) {
    let api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
        clean: true,
        connectTimeout: 2000,
        clientId: client.id,
        username: client.name
    });

    api.on('reconnect', (error)=> {
        console.log('reconnecting:', error)
    });
    api.on('error', (error)=> {
        console.log('Connection failed:', error)
    });

    return api
}