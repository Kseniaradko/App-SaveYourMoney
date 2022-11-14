import React from "react";
import TextField from "../../components/common/form/textField";
import {Link, useHistory} from "react-router-dom";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Данное поле обязательно для заполнения'),
    password: Yup.string().required('Данное поле обязательно для заполнения')
})

const LoginPage = () => {
    const history = useHistory();
    // const [loading, setLoading] = useState(false)

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
                <span className='text-4xl font-serif text-center py-3'>Login</span>
                <FormikProvider value={formik}>
                    <form autoComplete="new-password" onSubmit={formik.handleSubmit}>
                        <TextField
                            label='Электронная почта'
                            name='email'
                            type='email'
                            autofocus={true}
                        />
                        <TextField
                            label='Пароль'
                            name='password'
                            type='password'
                        />
                        <Button>
                            Войти
                        </Button>
                    </form>
                </FormikProvider>
                <p className='py-4'>
                    Don't have account?{" "}
                    <Link to='/signup'>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage