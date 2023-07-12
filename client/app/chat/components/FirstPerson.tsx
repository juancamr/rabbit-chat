"use client";
import React, { FormEvent, useRef } from "react";
import MessageSended from "./message/MessageSended";
import MessageReceived from "./message/MessageReceived";
import { DataMessage, WebSocketProps } from "@/utils/models";

export default function FirstPerson({
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
          code: 1,
          message,
        };
        sendMessage(dataMessage);
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div
          id="chatContainer"
          className="chat-container flex flex-col flex-grow h-0 p-4 overflow-auto"
        >
          <MessageReceived
            profile={dataProfile.secondPersonProfile}
            text="que haces?"
          />
          <MessageSended
            profile={dataProfile.firstPersonProfile}
            text="zzzzz"
          />
          {dataMessages.map((dataMessage, index) =>
            dataMessage.code === 1 ? (
              <section key={index}>
                <MessageSended
                  profile={dataProfile.firstPersonProfile}
                  text={dataMessage.message}
                />
              </section>
            ) : (
              <section key={index}>
                <MessageReceived
                  profile={dataProfile.secondPersonProfile}
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
    </>
  );
}
