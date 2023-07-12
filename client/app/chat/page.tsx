"use client";
import React, { useState } from "react";
import FirstPerson from "./components/FirstPerson";
import SecondPerson from "./components/SecondPerson";
import { Poppins } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import Button from "./components/buttons/Button";
import { DataMessage } from "@/utils/models";

const socket = new WebSocket("ws://localhost:8000");
socket.onopen = () => {
  console.log("conectado ws!");
};
socket.onclose = () => {
  console.log("conexion cerrada");
};

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const scrollDown = () => {
  const chatContainer = document.getElementById("chatContainer");
  const chatContainer2 = document.getElementById("chatContainer2");
  if (chatContainer && chatContainer2) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
    chatContainer2.scrollTop = chatContainer2.scrollHeight;
  }
};

export default function page() {
  const { data: session } = useSession();
  const firstPersonProfile = "https://randomuser.me/api/portraits/women/67.jpg";
  const secondPersonProfile = "https://randomuser.me/api/portraits/men/33.jpg";
  const dataProfile = { firstPersonProfile, secondPersonProfile };
  const [dataMessages, setDataMessages] = useState<DataMessage[]>([]);

  socket.onmessage = (event: MessageEvent<any>) => {
    const dataMessage: DataMessage = JSON.parse(event.data);
    setDataMessages((prevData) => [...prevData, dataMessage]);
    setTimeout(() => {
      scrollDown();
    }, 3);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      <h3 className={`${poppins.className} mb-5 text-lg`}>
        Bienvenido {session?.user?.name}
      </h3>
      <section className="grid grid-cols-2 h-[700px] gap-10 mb-5">
        <FirstPerson
          dataProfile={dataProfile}
          socket={socket}
          dataMessages={dataMessages}
        />
        <SecondPerson
          dataProfile={dataProfile}
          socket={socket}
          dataMessages={dataMessages}
        />
      </section>
      <Button text="Cerrar sesion" onClick={signOut} />
    </main>
  );
}
