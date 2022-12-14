import React from "react";

const Button = ({children, disabled, type, onClick, face}) => {
    let btnClass = ''
    if (face === 'primary') {
        btnClass = `w-full mt-4 bg-blue-500 text-white font-bold py-3 px-4 rounded ${disabled ? 'opacity-50 cursor-default' : 'hover:bg-blue-700'}`
    }
    if (face === 'secondary') {
        btnClass = 'w-full mt-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded'
    }

    return (
        <button
            className={btnClass}
            type={type || 'submit'}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button