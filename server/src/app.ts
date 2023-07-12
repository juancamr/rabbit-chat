import express from "express";
import http from "http";
import WebSocket from "ws";
import { saveMessage, sendMessage } from "./controllers/message.controller";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connections: WebSocket[] = [];

//routes
wss.on("connection", (ws: WebSocket) => {
  connections.push(ws);
  //socket.send() -> ws.on('message') -> socket.onmessage()
  ws.on("message", async (message: string) => {
    //enviar mensaje y guardarlo en rabbit
    saveMessage(message);
    //obtenerlo de rabbit y devolver el mensaje
    sendMessage(connections);
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

export default server;
