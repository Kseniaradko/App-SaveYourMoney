import React, {useState} from "react";
import TextField from "../../components/common/form/textField";
import {Link, useHistory} from "react-router-dom";
import Button from "../../components/Button";
import * as Yup from "yup";
import {useFormik, FormikProvider} from "formik";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Имя должно содержать не менее 4 символов')
        .required('Данное поле обязательно для заполнения'),
    email: Yup.string()
        .email('Некорректный адрес электронной почты')
        .required('Данное поле обязательно для заполнения'),
    password: Yup.string()
        .matches(
            /[A-Z]+/g, "Пароль должен содержать хотя бы одну заглавную букву")
        .matches(
            /\d+/g, 'Пароль должен содержать хотя бы одно число')
        .min(5, 'Пароль должен содержать минимум 5 символов')
        .required('Данное поле обязательно для заполнения')
})

const initialValues = {
    name: '',
    email: '',
    password: ''
}

const SignupPage = () => {

    const history = useHistory()
    const handleSubmit = (formValue) => {
        console.log(formValue)
        history.push('/dashboard')
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    return (
        <div className='max-w-screen-xl m-auto w-full flex justify-center'>
            <div className='rounded-lg overflow-hidden ring-1 ring-slate-900/5 shadow-xl p-6 w-2/5 h-full flex flex-col bg-slate-50'>
                <span className='text-4xl font-serif text-center py-3'>Register</span>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} autoComplete="new-password">
                        <TextField
                            label='Имя'
                            name='name'
                            autoFocus={true}
                        />
                        <TextField
                            label='Электронная почта'
                            name='email' type='email'
                        />
                        <TextField
                            label='Пароль'
                            name='password'
                            type='password'
                        />
                        <Button>Войти</Button>
                    </form>
                </FormikProvider>
                <p className='py-4'>
                    Already have account?{" "}
                    <Link to='/login'>Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage