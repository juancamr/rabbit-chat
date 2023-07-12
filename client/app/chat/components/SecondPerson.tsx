"use client";
import React, { FormEvent, useRef } from "react";
import MessageReceived from "./message/MessageReceived";
import MessageSended from "./message/MessageSended";
import { DataMessage, WebSocketProps } from "@/utils/models";

export default function SecondPerson({
  socket,
  dataProfile,
  dataMessages,
}: WebSocketProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (data: object) => {
    socket.send(JSON.stringify(data));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const message = inputRef.current.value;
      if (message !== "") {
        const dataMessage: DataMessage = {
          code: 2,
          message,
        };
        sendMessage(dataMessage);
        inputRef.current.value = "";
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col flex-grow max-w-xl w-[362px] bg-white shadow-xl rounded-lg overflow-hidden"
    >
      <div
        id="chatContainer2"
        className="flex flex-col flex-grow h-0 p-4 overflow-auto"
      >
        <MessageSended
          profile={dataProfile.secondPersonProfile}
          text="que haces?"
        />
        <MessageReceived
          profile={dataProfile.firstPersonProfile}
          text="zzzzzz"
        />
        {dataMessages.map((dataMessage, index) =>
          dataMessage.code === 2 ? (
            <section key={index}>
              <MessageSended
                profile={dataProfile.secondPersonProfile}
                text={dataMessage.message}
              />
            </section>
          ) : (
            <section key={index}>
              <MessageReceived
                profile={dataProfile.firstPersonProfile}
                text={dataMessage.message}
              />
            </section>
          )
        )}
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
  );
}
