import React from "react";
import {FormikProvider, useFormik} from "formik";
import TextField from "../../components/common/form/textField";
import RadioField from "../../components/common/form/radioField";
import Button from "../../components/common/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, updateUser} from "../../store/users";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Имя должно содержать не менее 4 символов')
        .required('Данное поле обязательно для заполнения'),
    sex: Yup.string().required('Данное поле обязательно для заполнения'),
    email: Yup.string()
        .email('Некорректный адрес электронной почты')
        .required('Данное поле обязательно для заполнения')
})

const EditUserAccount = ({onClick}) => {
    const dispatch = useDispatch()
    const user = useSelector(getCurrentUserData())
    const onBack = (e) => {
        e.preventDefault()
        onClick()
    }

    const initialValues = {
        name: user.name,
        sex: user.sex,
        email: user.email
    }

    const handleSubmit = (formValue) => {
        dispatch(updateUser(formValue))
        onClick()
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: handleSubmit
    })

    return (
        <div className='flex-1 h-full mb-6 ml-4 mr-8'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label='Имя'
                        name='name'
                        autoFocus={true}
                        value={formik.values.name}
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
                        value={formik.values.email}
                    />
                    <div className='flex gap-2'>
                        <Button
                            disabled={!formik.isValid || !formik.dirty}
                            face='primary'
                        >
                            Сохранить
                        </Button>
                        <Button
                            onClick={onBack}
                            face='secondary'
                            type='button'
                        >
                            Назад
                        </Button>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}

export default EditUserAccount