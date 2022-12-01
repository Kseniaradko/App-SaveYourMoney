import React from "react";
import {useField} from "formik";

const RadioField = (props) => {
    const [field] = useField(props)
    return (
        <div className='pt-3'>
            <label>{props.label}</label>
            <div className='flex'>
                {props.options.map((option) => (
                    <div
                        key={option.name + '-' + option.value}
                        className='pr-4 pt-2'
                    >
                        <input
                            {...field}
                            {...props}
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
            </div>
        </div>
    )
}

export default RadioField