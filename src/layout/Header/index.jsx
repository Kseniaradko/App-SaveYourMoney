import React from "react";
import NavBar from "../../components/Navbar";

const Header = () => {
    return (
        <div className='shadow-md'>
        <nav className='max-w-screen-xl m-auto w-full py-4 px-6 text-l font-semibold'>
            <NavBar/>
        </nav>
        </div>
    )
}

export default Header