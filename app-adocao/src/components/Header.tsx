import Link from "next/link";

export function Header(){
    return(
        <nav className="bg-gray-400 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="./logo.png" className="h-20" alt="Flowbite Logo" />
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Adote <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                .com</span></h1>
            </Link>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <span className="  text-black dark:text-white hover:underline">
                    Identifique-se</span>
                <Link href="/login" className="font-bold  text-blue-600 dark:text-blue-500 hover:underline">
                    Entrar</Link>
            </div>
        </div>
    </nav>  

    )
}