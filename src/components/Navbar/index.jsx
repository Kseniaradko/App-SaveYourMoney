import React from "react"
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div className='flex items-center justify-between'>
            <Link to="/"
                  className="hover:text-sky-500 px-4 py-2 text-slate-500"> Main </Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login"
                  className="rounded-lg shadow-sm px-4 py-2 ring-1 ring-slate-900/10 hover:text-sky-500 hover:ring-sky-500 transition-all duration-200">Login</Link>
        </div>
    )
}

export default NavBar