import React from "react";

interface props {
  text: string;
  onClick?: Function;
}

export default function Button({ text, onClick }: props) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {text}
    </button>
  );
}
