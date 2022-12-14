import React from "react";
import TextField from "../../components/common/form/textField";
import {Link} from "react-router-dom";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import Button from "../../components/common/Button";
import {useDispatch, useSelector} from "react-redux";
import {getAuthErrors, logIn} from "../../store/users";

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Данное поле обязательно для заполнения'),
    password: Yup.string().required('Данное поле обязательно для заполнения')
})

const LoginPage = () => {
    const dispatch = useDispatch()
    const loginError = useSelector(getAuthErrors());

    const handleSubmit = (formValue) => {
        dispatch(logIn(formValue))
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    return (
        <div className='max-w-screen-xl m-auto w-full flex justify-center'>
            <div
                className='rounded-lg overflow-hidden ring-1 ring-slate-900/5 shadow-xl p-6 w-96 h-full flex flex-col bg-slate-50'>
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
                        {loginError && (
                            <div
                                className='text-center text-red-500 text-sm font-medium'
                            >
                                {loginError}
                            </div>
                        )}
                        <Button
                            disabled={!formik.isValid || !formik.dirty}
                            face='primary'
                        >
                            Войти
                        </Button>
                    </form>
                </FormikProvider>
                <p className='py-4'>
                    Еще нет аккаунта?{' '}
                    <Link to='/signup' className='hover:underline'>Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage