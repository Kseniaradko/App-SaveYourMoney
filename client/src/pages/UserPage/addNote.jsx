import React from 'react'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import {createNote} from '../../store/notes'
import {FormikProvider, useFormik} from 'formik'
import TextAreaField from '../../components/common/form/textAreaField'
import Button from '../../components/common/Button'

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .required('Данное поле обязательно для заполнения')
})

const AddNote = ({onClick}) => {
    const dispatch = useDispatch()

    const onBack = (e) => {
        e.preventDefault()
        onClick()
    }

    const initialValues = {
        text: ''
    }

    const handleSubmit = (formValue) => {
        console.log(formValue)
        dispatch(createNote(formValue))
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
                    <div className='min-w-[200px] min-h-[200px]'>
                        <TextAreaField
                            label='Текст заметки:'
                            name='text'
                            value={formik.values.text}
                        />
                    </div>
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

export default AddNote