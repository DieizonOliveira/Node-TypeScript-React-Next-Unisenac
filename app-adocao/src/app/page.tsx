'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemAnimais } from "@/components/ItemAnimais";
import { AnimalI } from "@/utils/types/animais";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner';



export default function Home() {
  const [animais, setAnimais] = useState<AnimalI[]>([])

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/animais`)
      const dados = await response.json()
      // console.log(dados)
      setAnimais(dados)
    }
    buscaDados()
  }, [])

  const listaAnimais = animais.map(animal => (
    <ItemAnimais data={animal} key={animal.id} />
  ))


  return (
    <main>
      <InputPesquisa setAnimais={setAnimais} />

      <section className="max-w-screen-xl mx-auto">
        <h1 className="mb-5 mt-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-gray-900">
          Adote<span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          .com </span>
          <span className="text-lg font-semibold no-underline text-gray-900 dark:text-gray-900">
             - Seu novo amigo está à sua espera</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {listaAnimais}
        </div>

      </section>
      <Toaster position="top-right" richColors />
    </main>

  );
}
