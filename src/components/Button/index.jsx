import React from "react";

const Button = ({ children }) => {
    return (
        <button
            className='w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded'
            type='submit'
        >
            {children}
        </button>
    )
}

export default Button