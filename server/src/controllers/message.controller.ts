import { getChannel } from "../config/rabbitConfig";
import WebSocket from "ws";

const queueName = process.env.QUEUE_NAME ?? "";

export async function saveMessage(message: string): Promise<void> {
  try {
    const channel = await getChannel();
    channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(message));
  } catch (e) {
    console.log(e);
  }
}

export async function sendMessage(connections: WebSocket[]): Promise<void> {
  try {
    const channel = await getChannel();
    await channel.assertQueue(queueName);
    channel.consume(
      queueName,
      (msg) => {
        const message = msg?.content.toString() as string;
        connections.forEach((ws) => ws.send(message));
      },
      { noAck: true }
    );
  } catch (e) {
    console.log(e);
  }
}
