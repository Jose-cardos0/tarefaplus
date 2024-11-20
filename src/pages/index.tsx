import Head from "next/head";
import Image from "next/image";

//img
import hero from "../../public/assets/hero.png";

export default function Home() {
  return (
    <div className="bg-black w-full h-screen-64px flex justify-center items-center flex-col ">
      <Head>
        <title>Tarefas+ | Organize suas tarefas</title>
      </Head>
      <main>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="w-auto object-contain h-auto"
            src={hero}
            alt="logo tarefas+"
            priority
          />
        </div>
        <h1 className="text-white text-center my-10  text-2xl font-bold">
          Sistema feito para você organizar <br /> seus estudos e Tarefas
        </h1>

        <div className="flex items-center justify-around">
          <button
            className="relative 
            overflow-hidden
            flex-shrink-0
            bg-custom-blue-strong
            text-black py-3 
            px-14 rounded-md shadow-sm
            shadow-black font-light 
            border-none 
            bg-white"
          >
            <span className="relative z-10 flex items-center justify-center">
              Acessar &rsaquo;
            </span>
            <span
              className="absolute inset-0
            bg-gradient-to-r from-red-700 to-white
            transform translate-x-full
            transition-transform
            duration-300 ease-in-out z-0 opacity-20"
            ></span>
          </button>
          <button
            className="relative 
            overflow-hidden
            flex-shrink-0
            bg-custom-blue-strong
            text-black py-3 
            px-14 rounded-md shadow-sm
            shadow-black font-light 
            border-none 
            bg-white"
          >
            <span className="relative z-10 flex items-center justify-center">
              Acessar &rsaquo;
            </span>
            <span
              className="absolute inset-0
            bg-gradient-to-r from-red-700 to-white
            transform translate-x-full
            transition-transform
            duration-300 ease-in-out z-0 opacity-20"
            ></span>
          </button>
        </div>
      </main>
    </div>
  );
}
