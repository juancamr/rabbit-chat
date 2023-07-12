"use client";
import React, { FormEvent, useRef, useState } from "react";
import MessageSended from "./message/MessageSended";
import MessageReceived from "./message/MessageReceived";

interface props {
  socket: WebSocket;
  dataProfile: any;
}

export default function FirstPerson({ socket, dataProfile }: props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async (message: string) => {
    socket.send(message);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const message = inputRef.current.value;
      sendMessage(message);
      setMessages([...messages, message]);
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <MessageReceived profile={dataProfile.firstPersonProfile} text="que haces?" />
          <MessageSended profile={dataProfile.secondPersonProfile} text="zzzzz" />
          {messages.map((message, index) => (
            <section key={index}>
              <MessageSended profile={dataProfile.secondPersonProfile} text={message} />
            </section>
          ))}
        </div>

        <div className="bg-gray-300 p-4">
          <input
            ref={inputRef}
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Escribe tu mensaje…"
          />
        </div>
      </form>
    </>
  );
}
