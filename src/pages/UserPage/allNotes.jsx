import React, {useState} from 'react'
import DeleteIcon from '../../components/common/Table/deleteIcon'
import {useDispatch, useSelector} from 'react-redux'
import {getNotesLoadingStatus, removeNote, updateNote} from '../../store/notes'
import EditIcon from '../../components/common/Table/editIcon'
import {FormikProvider, useFormik} from 'formik'
import TextAreaField from '../../components/common/form/textAreaField'
import Button from '../../components/common/Button'
import * as Yup from 'yup'
import Loader from '../../components/common/Loader'

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .required('Данное поле обязательно для заполнения')
})

const AllNotes = ({notes, onClick}) => {
    const dispatch = useDispatch()
    const loadingStatus = useSelector(getNotesLoadingStatus())

    const [editNote, setEditNote] = useState(false)
    const handleEdit = (note) => {
        setEditNote(prevState => !prevState)
        formik.setValues({_id: note._id, text: note.text})
    }

    const handleDelete = (noteId) => {
        dispatch(removeNote(noteId))
    }
    const initialValues = {
        text: '',
        _id: ''
    }
    const handleSubmit = (formValue) => {
        dispatch(updateNote(formValue._id, {text: formValue.text}))
        setEditNote(false)
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: handleSubmit
    })


    return (
        <div>
            {!editNote && (
                <div className='flex flex-col'>
                    <div className='text-center text-xl mb-2'>Список заметок:</div>
                    <div className='max-h-[180px] overflow-y-auto relative'>
                        {notes.map((note) => (
                            <div className='flex flex-row justify-between mr-5 mb-2 border-b border-slate-200 text-base'
                                 key={note._id}>
                                <div className='text-left'>{`${notes.indexOf(note) + 1}. ${note.text}`}</div>
                                <div className='flex flex-row gap-4'>
                                    <EditIcon onChange={() => handleEdit(note)}/>
                                    <DeleteIcon onDelete={() => handleDelete(note._id)}/>
                                </div>
                            </div>
                        ))}
                        {loadingStatus && (
                            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                <Loader/>
                            </div>
                        )}
                    </div>
                    <div className='text-center'>
                        <button
                            className='font-semibold text-base text-slate-400 mt-5 hover:text-sky-500'
                            onClick={onClick}
                        >
                            Добавить заметку
                        </button>
                    </div>
                </div>
            )}
            {editNote && (
                <div className='flex flex-col'>
                    <div className='flex-1 ml-4 mr-8'>
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
                                        onClick={() => setEditNote(false)}
                                        face='secondary'
                                        type='button'
                                    >
                                        Назад
                                    </Button>
                                </div>
                            </form>
                        </FormikProvider>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllNotes