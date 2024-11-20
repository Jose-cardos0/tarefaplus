import Link from "next/link";

//authGoogle
import { useSession, signIn, signOut } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full h-16 bg-black flex items-center justify-center">
      <section className="px-5 w-screen max-w-5xl flex items-center justify-between">
        <nav className="flex items-center justify-center gap-8">
          <Link href={"/"}>
            <h1 className="text-white text-2xl font-bold flex items-center justify-center">
              Tarefas<span className="text-red-600">+</span>
            </h1>
          </Link>
          {session?.user && (
            <Link href={"/dashboard"} className="text-white">
              Meu painel
            </Link>
          )}
        </nav>
        {/*login olheiro */}
        {status === "loading" ? (
          <></>
        ) : session ? (
          <button
            onClick={() => signOut()}
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
              Olá, {session?.user?.name}
            </span>
            <span
              className="absolute inset-0
          bg-gradient-to-r from-red-700 to-white
          transform translate-x-full
          transition-transform
          duration-300 ease-in-out z-0 opacity-20"
            ></span>
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
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
        )}
      </section>
    </header>
  );
}
