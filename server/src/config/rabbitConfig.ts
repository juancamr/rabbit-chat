import amqp from "amqplib";

let channel: amqp.Channel;
const amqpURI = "amqp://localhost";

export async function connectToRabbit(): Promise<void> {
  try {
    const connection = await amqp.connect(amqpURI);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error al establecer la conexión a RabbitMQ:", error);
  }
}

export async function getChannel(): Promise<amqp.Channel> {
  if (!channel) {
    connectToRabbit()
  }
  return channel;
}
