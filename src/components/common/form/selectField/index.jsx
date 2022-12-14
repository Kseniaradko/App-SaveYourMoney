import React from 'react'
import {Field, useField} from 'formik'

const SelectField = (props) => {
    const [field, meta] = useField(props)
    const showedError = meta.error && meta.touched
    const errorStyle =
        'absolute -bottom-5 right-0 text-xs text-red-500 font-normal'
    const getInputClasses = () => {
        return (
            'mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
            (showedError ? ' ring-1 ring-red-500 focus:border-red-700 focus:ring-red-700 focus:' : '')
        )
    }

    const onChange = (e) => {
        field.onChange(e)
        if (props.onChange) {
            props.onChange(e)
        }
    }

    return (
        <div className='relative'>
            <label className='block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white'>{props.label}</label>
            <Field
                as='select'
                className={getInputClasses()}
                {...field}
                onChange={onChange}
                value={props.value}
            >
                <option value='' disabled>
                    {props.defaultOption}
                </option>
                {props.options.length > 0 &&
                    props.options.map((option) => (
                        <option value={option._id} key={option._id}>
                            {option.name}
                        </option>
                    ))}
            </Field>
            {showedError ? (
                <div className={errorStyle}>{meta.error}</div>
            ) : null}
        </div>
    )
}

export default SelectField