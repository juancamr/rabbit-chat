"use client";
import React, { useState } from "react";
import MessageReceived from "./message/MessageReceived";
import MessageSended from "./message/MessageSended";

interface props {
  socket: WebSocket;
  dataProfile: any;
}

export default function SecondPerson({ socket, dataProfile }: props) {
  const [messages, setMessages] = useState<string[]>([]);

  socket.onmessage = (event: MessageEvent<any>) => {
    const message = event.data;
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="flex flex-col flex-grow max-w-xl w-[362px] bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <MessageSended profile={dataProfile.firstPersonProfile} text="que haces?" />
        <MessageReceived profile={dataProfile.secondPersonProfile} text="zzzzzz" />
        {messages.map((message, index) => (
          <section key={index}>
            <MessageReceived profile={dataProfile.secondPersonProfile} text={message} />
          </section>
        ))}
      </div>

      <div className="bg-gray-300 p-4">
        <input
          className="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Escribe tu mensaje…"
        />
      </div>
    </div>
  );
}
