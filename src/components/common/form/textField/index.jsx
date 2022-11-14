import React from "react";
import {useField} from "formik";

const TextField = (props) => {
    const [field, meta] = useField(props)
    const showedError = meta.error && meta.touched
    const errorStyle =
        "absolute -bottom-5 right-0 text-xs text-red-500 font-normal";

    const getInputClasses = () => {
        return (
            'w-full py-2 px-3 bg-white focus:border-red-700 rounded' +
            (showedError ? ' ring-1 ring-red-500 focus:border-red-700 focus:ring-red-700 focus:' : '')
        )
    }

    return (
        <div className='py-3'>
            <label className='text-m' htmlFor={props.name}>{props.label}</label>
            <div className='relative'>
                <input
                    type={props.type}
                    name={props.name}
                    {...field}
                    {...props}
                    className={getInputClasses()}
                    autoComplete='new-password'
                />
                {showedError ? (
                    <div className={errorStyle}>{meta.error}</div>
                ) : null}
            </div>
        </div>
    )
}

export default TextField