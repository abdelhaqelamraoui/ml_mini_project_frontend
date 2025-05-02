"use client";
import { Link } from "@/i18n/navigation";
import { api } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Todo {
   id: number;
   title: string;
   completed: boolean;
}

export default function HomePage() {
   const t = useTranslations("HomePage");
   const [todos, setTodos] = useState([]);

   useEffect(() => {
      api.get("/todos")
         .then((res) => {
            setTodos(res.data);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }, []);

   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
         <Link href="/about" className="text-blue-600 underline mb-6 block">
            {t("about")}
         </Link>

         <ul className="space-y-3">
            {todos.map((todo: Todo) => (
               <li
                  key={todo.id}
                  className="p-4 bg-gray-100 rounded shadow-sm flex justify-between items-center"
               >
                  <span>{todo.title}</span>
                  <span
                     className={`text-sm ${
                        todo.completed ? "text-green-600" : "text-red-600"
                     }`}
                  >
                     {todo.completed ? "Done" : "Pending"}
                  </span>
               </li>
            ))}
         </ul>
      </div>
   );
}
