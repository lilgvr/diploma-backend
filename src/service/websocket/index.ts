import WebSocket from "ws";
import { Express } from "express";
import http from "http";

/*export const webSocketServer = new WebSocket.Server({
    host: process.env.HOST,
    port: 8080
});*/

/*type Message = {
    eventType: string,
    payload: {
        username: string,
        message: string
    }
}

export const dispatchEvent = (message: string, ws: WebSocket) => {
    const messageDto: Message = JSON.parse(message);

    console.log(message)

    switch (messageDto.eventType) {
        case "chat-message":
            // webSocketServer.clients.forEach(client => client.send(message));
            ws.send(`Received: ${ message }`)
            break;
        default:
            ws.send((new Error("Wrong query")).message);
    }
}*/

// v.2

/*
* Message
*
* from: username (string)
* to: username (string)
* message: string
*
* TODO аутентификация сообщений, безопасность
*
* */

export const setupWebsocketServer = (server: http.Server) => {
    const wss = new WebSocket.Server({
        host: process.env.HOST,
        port: 8080
    });

    server.on('upgrade', (req, socket, head) => {
        try {
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit('connection', ws, req)
            });
        } catch (err) {
            console.log('WebSocket :: Upgrade exception: ', err);
            socket.write('HTTP/1.1 401 Unauthorized\\r\\n\\r\\n');
            socket.destroy();
        }
    })

    wss.on('connection', (ws) => {
        console.log('WebSocket :: Connected: ', wss.clients.size, ' clients');

        ws.on('message', (message) => {
            console.log('WebSocket :: Received message: ', message.toString());
            ws.send(`Пришло сообщение: ${ message }`);
        })

        ws.on('close', () => {
            console.log('WebSocket :: Closed: ', wss.clients.size, ' clients');
        })

        ws.send('Connection established');
    })
}
