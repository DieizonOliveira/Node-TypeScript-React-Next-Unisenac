"use client"

import { AnimalI } from "@/utils/types/animais"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"




export default function Detalhes() {
    const params = useParams()
    const router = useRouter()

    const [animal, setAnimal] = useState<AnimalI>()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/animais/${params.animal_id}`)
            const dados = await response.json()
            // console.log(dados)
            setAnimal(dados)
        }
        buscaDados()
    }, [])



    return (

        <section className="flex mt-10 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
                src={animal?.foto} alt="Foto do Animal" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {animal?.nome}</h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {animal?.especie.nome}</p>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {animal?.idade}</p>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {animal?.porte}</p>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {animal?.descricao}</p>

                <button className="w-32 h-12 ms-3 mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => router.back()}>
                    Voltar
                </button>
            </div>
        </section>

    )
}