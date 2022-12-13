import WebSocket from "ws";

export const webSocketServer = new WebSocket.Server({
    host: process.env.HOST,
    port: 8080
});

type Message = {
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
}
