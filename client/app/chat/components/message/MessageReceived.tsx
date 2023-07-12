"use client";
import Image from "next/image";
import React from "react";

interface props {
  text: string;
  profile: string;
}

export default function MessageReceived({ text, profile }: props) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
        <img src={profile} alt="user" className="rounded-full" /> 
      </div>
      <div>
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">Enviado</span>
      </div>
    </div>
  );
}
