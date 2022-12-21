import React from "react";

const Button = ({children, disabled, type, onClick, face}) => {
    let btnClass = ''
    if (face === 'primary') {
        btnClass = `w-full mt-4 bg-blue-500 text-white font-bold py-3 px-4 rounded ${disabled ? 'opacity-50 cursor-default' : 'hover:bg-blue-700'}`
    }
    if (face === 'secondary') {
        btnClass = 'w-full mt-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded'
    }
    if (face === 'add') {
        btnClass = 'w-48 mt-4 bg-blue-500 text-white font-bold py-3 px-4 rounded hover:bg-blue-700'
    }
    if (face === 'addition') {
        btnClass = 'w-28 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded'
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