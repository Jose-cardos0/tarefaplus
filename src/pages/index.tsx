import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";

//firebase
import { collection, getDocs } from "firebase/firestore";

import { db } from "../Components/Firebase";

//img
import hero from "../../public/assets/hero.png";

interface HomeProps {
  posts: number;
  comments: number;
}

export default function Home({ comments, posts }: HomeProps) {
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
              +{posts} posts
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
              +{comments} comentários
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

export const getStaticProps: GetStaticProps = async () => {
  //buscar itens do banco e por no component

  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tarefas");
  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);
  return {
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 3600, // sera revalidada a cada 1 hora
  };
};
