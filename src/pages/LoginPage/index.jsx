import React from "react";
import TextField from "../../components/common/form/textField";
import {Link, useHistory} from "react-router-dom";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import Button from "../../components/common/Button";
import {nanoid} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {logIn} from "../../store/users";

const MOCKED_LOGIN = [
    {
        userId: 1,
        name: 'Ksenia',
        email: 'tester@example.ru',
        password: 'Test1234'
    },
    {
        userId: 2,
        name: 'Aleksei',
        email: 'tester2@example.ru',
        password: 'Test1234'
    },
    {
        userId: 3,
        name: 'Larisa',
        email: 'tester3@example.ru',
        password: 'Test1234'
    }
]

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Данное поле обязательно для заполнения'),
    password: Yup.string().required('Данное поле обязательно для заполнения')
})

export const ACCESS_TOKEN = 'access-token'

const LoginPage = () => {
    const dispatch = useDispatch()

    const handleSubmit = (formValue) => {
        dispatch(logIn(formValue))
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    const isValid = formik.isValid

    return (
        <div className='max-w-screen-xl m-auto w-full flex justify-center'>
            <div
                className='rounded-lg overflow-hidden ring-1 ring-slate-900/5 shadow-xl p-6 w-2/5 h-full flex flex-col bg-slate-50'>
                <span className='text-4xl font-serif text-center py-3'>Login</span>
                <FormikProvider value={formik}>
                    <form autoComplete="new-password" onSubmit={formik.handleSubmit}>
                        <TextField
                            label='Электронная почта'
                            name='email'
                            type='email'
                            autoFocus={true}
                        />
                        <TextField
                            label='Пароль'
                            name='password'
                            type='password'
                        />
                        <Button disabled={!isValid}>
                            Войти
                        </Button>
                    </form>
                </FormikProvider>
                <p className='py-4'>
                    Еще нет аккаунта?{" "}
                    <Link to='/signup' className='hover:underline'>Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage