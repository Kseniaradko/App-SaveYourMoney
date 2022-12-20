import React from "react";
import {Link} from "react-router-dom";

const NonAuthNavBar = () => {
    return (
        <div className='shadow-md my-0 w-full py-4 text-l font-semibold'>
            <div className='flex items-center justify-between max-w-screen-xl mx-auto'>
                <Link
                    to="/"
                    className="hover:text-sky-500 py-2 text-slate-500"
                >
                    Главная страница
                </Link>
                <Link
                    to="/login"
                    className="rounded-lg shadow-sm px-4 py-2 ring-1 ring-slate-900/10 hover:text-sky-500 hover:ring-sky-500 transition-all duration-200"
                >
                    Войти
                </Link>
            </div>
        </div>
    )
}

export default NonAuthNavBar