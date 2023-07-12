import React from "react";

interface props {
  text: string;
  profile: string;
}

export default function MessageSended({ text, profile }: props) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">Enviado</span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
        <img src={profile} alt="user" className="rounded-full" />
      </div>
    </div>
  );
}
