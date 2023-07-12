import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-white md:p-10 md:text-center">
      <div className={poppins.className}>
        <h1 className="text-5xl font-extrabold mb-12 text-gray-600 hover:scale-125 transition-all">
          Bienvenido a messenger
        </h1>
        <Image
          src="/messenger.png"
          width={100}
          height={100}
          className="mx-auto mb-12"
          alt="messenger_icon"
        />
        <div className="flex justify-center">
          <Link
            href="chat"
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 hover:shadow-lg hover:scale-125 transition-all"
          >
            Iniciar sesi&oacute;n
          </Link>
        </div>
      </div>
    </main>
  );
}
