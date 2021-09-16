import mqtt from "mqtt";


/**
 * Связь с api брокера 
 * @returns connection
 */
export default function Connect(client, err) {
    const api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
        clean: true,
        connectTimeout: 1000,
        clientId: client.id,
        username: client.login
    });

    api.on('reconnect', (error)=> {
        err('reconnecting:', error)
    });
    api.on('error', (error)=> {
        err('Connection failed:', error)
    });

    return api
}