import { GetServerSideProps } from "next";
import Head from "next/head";

//react
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

//firebase
import { db } from "../../Components/Firebase";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

//icons
import { FaTrash } from "react-icons/fa";

//tools
import { TextArea } from "../../Components/Header/textArea";

interface PropsItem {
  item: {
    tarefa: string;
    create: string;
    public: boolean;
    user: string;
    taskId: string;
  };

  allComments: CommentsProps[];
}

interface CommentsProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

export default function Task({ item, allComments }: PropsItem) {
  const { data: session } = useSession();

  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentsProps[]>(allComments || []);

  async function handlecomment(e: FormEvent) {
    e.preventDefault();
    alert("teste");

    if (input === "") {
      return;
    }

    if (!session?.user?.email || !session?.user?.name) {
      return;
    }

    try {
      const docCreateRef = await addDoc(collection(db, "comments"), {
        comment: input,
        create: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item.taskId,
      });

      const data = {
        id: docCreateRef.id,
        comment: input,
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      };

      setComments((oldItems) => [...oldItems, data]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  }

  async function handlDelet(id: string) {
    const docDelRef = doc(db, "comments", id);
    await deleteDoc(docDelRef);

    setComments((prev) => prev.filter((comments) => comments.id !== id));
  }

  return (
    <div>
      <Head>
        <title>Detalhes das tarefas</title>
      </Head>

      <main className="w-screen flex flex-col items-center justify-center m-auto">
        <div className="mt-20 max-w-7xl">
          <h1 className="font-bold text-center">Detalhes da tarefa</h1>
          <article className="w-full border-2 px-4 mt-4 flex items-center justify-center whitespace-pre-wrap">
            {item?.tarefa}
          </article>
          <div className="flex items-center justify-center m-auto flex-col ">
            <h1 className="font-bold text-center mt-8">Todos comentários</h1>
            <div className="text-start w-full">
              {comments.length === 0 && (
                <p className="text-center text-gray-400">Nenhum comentário</p>
              )}
              {comments.map((comment) => (
                <article key={comment.id} className="text-start">
                  <div className="border-b-2 my-5">
                    <p className="bg-gray-300 font-extralight pl-4 p-1 text-sm flex items-center ">
                      {comment.name}
                      {comment.user === session?.user?.email && (
                        <button
                          onClick={() => handlDelet(comment.id)}
                          className="ml-2 hover:scale-105 transition duration-300 "
                        >
                          <FaTrash id="buttonTrash" size={14} color="#999" />
                        </button>
                      )}
                    </p>
                    <p className="font-light text-sm py-2">{comment.comment}</p>
                  </div>
                </article>
              ))}
            </div>
            <h1 className="font-bold text-center mt-8">Deixe seu comentário</h1>
            <form onSubmit={handlecomment} className="w-full mt-8">
              <TextArea
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
                className="w-full border-b-2 px-2 py-1"
                placeholder="Deixe seu comentário..."
              />
              <button
                disabled={!session?.user}
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
                  Comentar &rsaquo;
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
        </div>
      </main>
    </div>
  );
}

//carregamento do lado do servidor
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "tarefas", id);

  //getTarefas
  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapshotCommets = await getDocs(q);

  let allComments: CommentsProps[] = [];
  snapshotCommets.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId,
    });
  });

  //fim getTarefas

  console.log(allComments);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconts = snapshot.data()?.create?.seconds * 1000;

  const task = {
    tarefa: snapshot.data()?.tarefa,
    create: new Date(miliseconts).toLocaleString(),
    public: snapshot.data()?.public,
    user: snapshot.data()?.user,
    taskId: id,
  };

  console.log(task);

  return {
    props: {
      item: task,
      allComments: allComments,
    },
  };
};
