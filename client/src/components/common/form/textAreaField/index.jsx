import React from 'react'
import {useField} from 'formik'

const TextAreaField = (props) => {
    const [field, meta] = useField(props)
    const showedError = meta.error && meta.touched
    const errorStyle =
        'absolute -bottom-5 right-0 text-xs text-red-500 font-normal'

    const getInputClasses = () => {
        return (
            'resize-none min-w-[400px] min-h-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' +
            (showedError ? ' ring-1 ring-red-500 focus:border-red-700 focus:ring-red-700 focus:' : '')
        )
    }

    return (
        <div>
            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'
                   htmlFor={props.name}>{props.label}</label>
            <div className='relative'>
                <textarea
                    {...field}
                    {...props}
                    name={props.name}
                    className={getInputClasses()}
                />
                {showedError ? (
                    <div className={errorStyle}>{meta.error}</div>
                ) : null}
            </div>
        </div>
    )
}

export default TextAreaField