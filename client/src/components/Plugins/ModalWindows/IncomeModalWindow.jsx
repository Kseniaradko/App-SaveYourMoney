import React, {useState} from "react"
import TextField from "../../common/form/textField"
import {FormikProvider, useFormik} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import {getAccounts} from "../../../store/accounts"
import SelectField from "../../common/form/selectField"
import {createIncome} from "../../../store/incomes"
import {createOperation} from "../../../store/operationsHistory"
import closeIcon from "./closeIcon.svg"
import Button from "../../common/Button";

const validationSchema = Yup.object().shape({
    category: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    accountId: Yup.string()
        .required('Данное поле обязательно для заполнения'),
    sum: Yup.number()
        .required('Данное поле обязательно для заполнения')
        .typeError('Сумма зачисления должна быть числом')
})

const initialValues = {
    category: '',
    accountId: '',
    sum: ''
}

const IncomeModalWindow = ({onCLick}) => {
    const dispatch = useDispatch()
    const accounts = useSelector(getAccounts())
    const [category, setCategory] = useState(false)

    const onAdd = () => {
        setCategory(prevState => !prevState)
    }

    const handleSubmit = (formValue) => {
        dispatch(createIncome(formValue))

        const accountLabel = accounts.filter((acc) => acc.accountId === formValue.accountId)[0].accountName
        const operation = {
            type: 'INCOME',
            action: 'ADD',
            category: formValue.category,
            sum: formValue.sum,
            accountName: accountLabel
        }
        dispatch(createOperation(operation))

        onCLick()
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: handleSubmit
    })

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto min-w-[355px] min-h-[410px]">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Добавить доход
                            </h3>
                            <img
                                src={closeIcon}
                                className='absolute top-4 right-4 w-8 cursor-pointer shadow-2xl'
                                onClick={onCLick}
                                alt='plus'
                            />
                        </div>
                        <div className="relative px-6 py-3 flex-auto">
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        label='Категория:'
                                        name='category'
                                        placeholder='Заработная плата'
                                        value={formik.values.category}
                                    />
                                    <div onClick={onAdd}
                                         className='mt-2 text-sm text-slate-400 cursor-pointer text-right hover:text-slate-700'>
                                        Добавить новую категорию
                                    </div>
                                    {category && (
                                        <TextField
                                            label='Новая категория'
                                            name='category'
                                            placeholder='Заработная плата'
                                            value=''
                                        />
                                    )}
                                    <SelectField
                                        label='Выберите счет зачисления денежных средств:'
                                        name='accountId'
                                        defaultOption='Choose...'
                                        options={accounts}
                                        value={formik.values.accountId}
                                    />
                                    <TextField
                                        label='Сумма зачисления:'
                                        name='sum'
                                        placeholder='30000'
                                        value={formik.values.sum}
                                    />
                                    <div className='flex justify-end mb-3'>
                                        <Button
                                            face='primary'
                                            type="submit"
                                            disabled={!formik.isValid}
                                        >
                                            Сохранить
                                        </Button>
                                    </div>
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default IncomeModalWindow