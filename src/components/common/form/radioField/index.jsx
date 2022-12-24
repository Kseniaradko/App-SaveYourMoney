import React from 'react'
import {useField} from 'formik'

const RadioField = (props) => {
    const [field, meta] = useField(props)
    const showedError = meta.error && meta.touched
    const errorStyle =
        'absolute -bottom-5 right-0 text-xs text-red-500 font-normal'

    return (
        <div className='pt-3'>
            <label className='font-medium text-sm text-gray-900'>{props.label}</label>
            <div className='flex relative'>
                {props.options.map((option) => (
                    <div
                        key={option.name + '-' + option.value}
                        className='pr-4 pt-2'
                    >
                        <input
                            {...field}
                            checked={option.value === field.value}
                            type='radio'
                            value={option.value}
                        />
                        <label
                            htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
                {showedError ? (
                    <div className={errorStyle}>{meta.error}</div>
                ) : null}
            </div>
        </div>
    )
}

export default RadioField