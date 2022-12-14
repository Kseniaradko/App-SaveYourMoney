import React from "react";

const Button = ({children, disabled, bg, type, onClick}) => {
    const getButtonClasses = () => {
        return (
            !disabled ? (
                `mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ${bg ? bg : ''}`
            ) : (
                `mt-4 text-white font-bold py-3 px-4 rounded bg-sky-500/50 cursor-not-allowed ${bg ? bg : ''}`
            )
        )
    }
    return (
        <button
            className={getButtonClasses()}
            type={type || 'submit'}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button