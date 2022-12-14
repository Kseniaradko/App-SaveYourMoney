import React from "react";
import TextField from "../../components/common/form/textField";
import {Link} from "react-router-dom";
import Button from "../../components/common/Button";
import * as Yup from "yup";
import {useFormik, FormikProvider} from "formik";
import RadioField from "../../components/common/form/radioField";
import {useDispatch, useSelector} from "react-redux";
import {getAuthErrors, getIsLoggedIn, signUp} from "../../store/users";
import Loader from "../../components/common/Loader";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Имя должно содержать не менее 4 символов')
        .required('Данное поле обязательно для заполнения'),
    sex: Yup.string().required('Данное поле обязательно для заполнения'),
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
    sex: '',
    email: '',
    password: ''
}

const SignupPage = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn())
    const signUpError = useSelector(getAuthErrors());
    const handleSubmit = (formValue) => {
        dispatch(signUp(formValue))
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    if (isLoggedIn) return <Loader/>

    return (
        <div className='max-w-screen-xl m-auto w-full flex justify-center'>
            <div
                className='rounded-lg ring-1 ring-slate-900/5 shadow-xl px-8 py-4 w-96 h-full flex flex-col bg-slate-50'>
                <span className='text-4xl font-serif text-center pb-0.5'>Register</span>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label='Имя'
                            name='name'
                            autoFocus={true}
                        />
                        <RadioField
                            options={[
                                {name: "Male", value: "male"},
                                {name: "Female", value: "female"},
                                {name: "Other", value: "other"}
                            ]}
                            name='sex'
                            label='Выберите ваш пол:'
                        />
                        <TextField
                            label='Электронная почта'
                            name='email'
                        />
                        <TextField
                            label='Пароль'
                            name='password'
                            type='password'
                        />
                        {signUpError && (
                            <div
                                className='text-center text-red-500 text-sm font-medium'
                            >
                                {signUpError}
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
                <p className='py-2'>
                    Уже есть аккаунт?{" "}
                    <Link to='/login' className='hover:underline'>Войти</Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage