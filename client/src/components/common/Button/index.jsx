import React from "react";

const Button = ({children, disabled}) => {
    const getButtonClasses = () => {
        return (
            !disabled ? (
                'w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded'
            ) : (
                'w-full mt-4 text-white font-bold py-3 px-4 rounded bg-sky-500/50'
            )
        )
    }
    return (
        <button
            className={getButtonClasses()}
            type='submit'
        >
            {children}
        </button>
    )
}

export default Button