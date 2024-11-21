import { GetServerSideProps } from "next";
import Head from "next/head";

//AUTH
import { getSession } from "next-auth/react";

//custom textarea
import { TextArea } from "@/Components/Header/textArea";

//icons
import { FiTrash2, FiShare2 } from "react-icons/fi";

//state
import { ChangeEvent, useState } from "react";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [isPublic, setPublic] = useState(false);

  function handleChegnePublic(e: ChangeEvent<HTMLInputElement>) {
    setPublic((prev) => !prev);
    console.log(isPublic);
  }

  return (
    <main>
      <Head>
        <title>Tarefas+ | Painel de tarefas</title>
      </Head>
      <section
        className="w-full h-screen-64px bg-black flex items-center
       justify-center m-auto max-md:h-screen max-md:pt-10"
      >
        <div
          className="flex-col items-center justify-center max-w-5xl w-full
         bg-black max-md:p-3 "
        >
          <div className="flex-col items-center justify-center">
            <p className="text-white text-2xl mb-2 ">Qual sua tarefa?</p>
            <form className="max-w-5xl w-full">
              <TextArea
                placeholder="Digite sua tarefa..."
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
              />
              <div className="my-1">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={isPublic}
                  onChange={handleChegnePublic}
                />
                <label className="text-white" htmlFor="">
                  Deixa tarefa pública
                </label>
              </div>
              <button
                className="relative 
          overflow-hidden
          flex-shrink-0
          bg-custom-blue-strong
          text-black py-2 
          px-6 rounded-md shadow-sm
          shadow-black font-light 
          border-none 
          bg-white"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Registrar
                </span>
                <span
                  className="absolute inset-0
          bg-gradient-to-r from-red-700 to-white
          transform translate-x-full
          transition-transform
          duration-300 ease-in-out z-0 opacity-20"
                ></span>
              </button>
            </form>
          </div>
          {/*tarefas */}
          <div
            className="flex-col items-center justify-center 
          max-w-5xl w-full mt-8"
          >
            <h1 className="text-center pt-3 text-2xl text-white">Tarefas</h1>
            <div className="px-2 pb-2 flex-col">
              <div
                className="flex-col items-center justify-center border
               border-gray-200 my-2 rounded-md p-4 text-white hover:border-blue-300 hover:cursor-pointer hover:scale-105 transition duration-300"
              >
                <div className="flex items-center  gap-2">
                  <p className="font-light">Publicar</p>
                  <button>
                    <FiShare2 color="" />
                  </button>
                </div>
                <div className="border-b border-gray-300 my-2 "></div>
                <div className="flex items-center justify-center">
                  <article className="font-light mx-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia nostrum itaque ut dicta, corporis laborum dolores
                    consequatur accusamus consequuntur ad? Reiciendis labore
                    sunt repellendus nisi quis esse porro sit non.
                  </article>
                  <button className="flex items-center justify-center mx-2 cursor-pointer">
                    <FiTrash2 color="red" size={25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

//checar se tem usuário logado na página?
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  // console.log(session);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
