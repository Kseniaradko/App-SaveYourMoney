import React, {useState} from 'react'
import {useField} from 'formik'
import eyeIcon from './eyeIcon.svg'
import eyeSlashIcon from './eyeSlashIcon.svg'

const TextField = (props) => {
    const [field, meta] = useField(props)
    const [showPassword, setShowPassword] = useState(false)
    const showedError = meta.error && meta.touched
    const errorStyle =
        'absolute -bottom-5 right-0 text-xs text-red-500 font-normal'

    const getInputClasses = () => {
        return (
            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' +
            (showedError ? ' ring-1 ring-red-500 focus:border-red-700 focus:ring-red-700 focus:' : '')
        )
    }

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    return (
        <div className='py-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                   htmlFor={props.name}>{props.label}</label>
            <div className='relative'>
                <input
                    {...field}
                    {...props}
                    type={showPassword ? 'text' : props.type}
                    name={props.name}
                    className={getInputClasses()}
                />
                {props.type === 'password' && (
                    <button
                        className='absolute inset-y-0.5 right-2.5 btn btn-outline-secondary text-slate-500'
                        type='button'
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <img src={eyeIcon} className='relative w-6 h-6' alt={'eye'}/>
                        ) : (
                            <img src={eyeSlashIcon} className='relative w-6 h-6' alt={'eyeSlash'}/>
                        )}
                    </button>
                )}
                {showedError ? (
                    <div className={errorStyle}>{meta.error}</div>
                ) : null}
            </div>
        </div>
    )
}

export default TextField