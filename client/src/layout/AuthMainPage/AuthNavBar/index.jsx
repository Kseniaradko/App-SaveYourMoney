import React from "react";
import {Link} from "react-router-dom";
import AuthNavProfile from "../AuthNavProfile";

const AuthNavBar = () => {

    return (
        <div className='shadow-md my-0 w-full py-4 text-l font-semibold'>
            <div className='flex items-center justify-between max-w-screen-xl mx-auto'>
                <div>
                    <Link
                        to="/dashboard"
                        className="hover:text-sky-500 py-2 text-slate-500 pr-6"
                    >
                        Main
                    </Link>
                    <Link
                        to='/types'
                        className="hover:text-sky-500 py-2 text-slate-500 pr-6"
                    >
                        Categories
                    </Link>
                    <Link
                        to="/history"
                        className="hover:text-sky-500 py-2 text-slate-500"
                    >
                        History
                    </Link>
                </div>
                <AuthNavProfile/>
            </div>
        </div>
    )
}

export default AuthNavBar