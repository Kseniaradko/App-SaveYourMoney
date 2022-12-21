import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserIncomes, getIncomeLoadingStatus, getTotalIncomePages, removeIncome} from "../../store/incomes";
import {Link} from "react-router-dom";
import {getAccounts} from "../../store/accounts";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/common/Button";
import IncomeModalWindow from "../../components/Plugins/ModalWindows/IncomeModalWindow";
import {createOperation} from "../../store/operationsHistory";
import {getIncomesTypes} from "../../store/incomesType";
import Pagination from "../../components/common/pagination";
import useGetTypes from "../../hooks/useGetTypes";
import SelectField from "../../components/common/form/selectField";
import {FormikProvider, useFormik} from "formik";
import TextField from "../../components/common/form/textField";
import useGetIncomesForPage from "../../hooks/useGetIncomesForPage";

const initialValues = {
    category: '',
    accountId: '',
    sum: ''
}

const IncomesPage = () => {
    const dispatch = useDispatch()
    const userIncomes = useSelector(getCurrentUserIncomes())
    const userAccounts = useSelector(getAccounts())
    const userTypes = useSelector(getIncomesTypes())
    const incomesPages = useSelector(getTotalIncomePages())
    const loadingStatus = useSelector(getIncomeLoadingStatus())

    const limit = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setSelectedCategory] = useState(null)
    const [accountId, setSelectedAccount] = useState(null)
    const [sum, setSelectedSum] = useState(null)

    const [showModal, setShowModal] = useState(false)

    useGetIncomesForPage(currentPage, limit, {category, accountId, sum})
    useGetTypes()

    const disabledNext = incomesPages === currentPage
    const disabledPrevious = currentPage === 1

    const handleClick = () => {
        setShowModal(prevState => !prevState)
    }

    const handlePageNext = () => {
        setCurrentPage(prevState => prevState + 1)
    }

    const handlePagePrevious = () => {
        setCurrentPage(prevState => prevState - 1)
    }

    const handleDeleteFilters = () => {
        setSelectedSum(null)
        setSelectedAccount(null)
        setSelectedCategory(null)
        formik.setFieldValue('category', '')
        formik.setFieldValue('accountId', '')
        formik.setFieldValue('sum', '')
        setCurrentPage(1)
    }

    const columns = {
        _id: {
            name: '№',
            path: '_id',
            component: (data) => userIncomes.indexOf(data) + 1
        },
        category: {
            name: 'Категория',
            path: 'category',
            component: (data) => {
                if (!data.category) return <>Категория была удалена</>
                const type = userTypes.find((item) => item._id === data.category)
                return type.name
            }
        },
        accountId: {
            name: 'Счет зачисления',
            path: 'accountId',
            component: (data) => {
                if (!data.accountId) return 'Данный счет был удален'
                const account = userAccounts.find((account) => account._id === data.accountId)
                if (account) return account.name
            }
        },
        sum: {
            name: 'Сумма зачисления',
            path: 'sum'
        },
        createdAt: {
            name: 'Дата',
            path: 'createdAt',
            component: (data) => displayDate(data.createdAt)
        },
        edit: {
            name: 'Редактировать',
            component: (data) => <Link to={`/incomesPage/${data._id}`}><EditIcon/></Link>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id, currentPage)}/>
        }
    }

    const handleDelete = (id, currentPage) => {
        dispatch(removeIncome(id, currentPage))

        const income = userIncomes.filter((income) => income._id === id)[0]
        const type = userTypes.filter((type) => type._id === income.category)[0]
        const typeName = type?.name
        const account = userAccounts.filter((acc) => acc._id === income.accountId)[0]
        const accountLabel = account?.name
        const operation = {
            type: 'INCOME',
            action: 'DELETE',
            category: typeName || null,
            sum: income.sum,
            accountName: accountLabel || null
        }

        dispatch(createOperation(operation))
    }

    const handleSubmit = (formValue) => {
        if (formValue.category) {
            setSelectedCategory(formValue.category)
        }
        if (formValue.accountId) {
            setSelectedAccount(formValue.accountId)
        }
        if (formValue.sum) {
            setSelectedSum(formValue.sum)
        }
        setCurrentPage(1)
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    })


    if (!userIncomes || !userAccounts || !userTypes) return <Loader/>
    if (userIncomes.length === 0 && currentPage > 1) setCurrentPage(prevState => prevState - 1)

    return (
        <div className='flex flex-col justify-between h-full max-w-screen-xl m-auto w-full'>
            <div className='relative'>
                <div className='text-center text-slate-500 text-2xl underline underline-offset-8 pt-4'>
                    Мои доходы
                </div>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-row gap-2'>
                            <div className='min-w-[150px] max-w-[200px]'>
                                <SelectField
                                    label='Категория:'
                                    name='category'
                                    defaultOption='Choose...'
                                    options={userTypes}
                                    value={formik.values.category}
                                />
                            </div>
                            <div className='min-w-[150px] max-w-[200px]'>
                                <SelectField
                                    label='Счет:'
                                    name='accountId'
                                    defaultOption='Choose...'
                                    options={userAccounts}
                                    value={formik.values.accountId}
                                />
                            </div>
                            <div className='max-w-[150px]'>
                                <TextField
                                    label='Сумма:'
                                    name='sum'
                                    value={formik.values.sum}
                                    placeholder='3000'
                                />
                            </div>
                            <div className='min-h-[60px] flex items-center'>
                                <Button
                                    face='primary'
                                >
                                    Применить
                                </Button>
                            </div>
                            <div className='min-h-[60px] flex items-center'>
                                <Button
                                    face='secondary'
                                    type='button'
                                    onClick={handleDeleteFilters}
                                >
                                    Отменить
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormikProvider>
                {userIncomes.length === 0 && (
                    <div
                        className='flex justify-center items-center text-xl italic font-light text-slate-500 min-h-[300px]'>
                        Доходы отсутствуют. Начните добавлять их!
                    </div>
                )}
                {userIncomes.length > 0 && (
                    <div className='flex flex-col justify-between'>
                        <div className='relative'>
                            <Table
                                columns={columns}
                                data={userIncomes}
                            />
                            {loadingStatus &&
                                <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                    <Loader/>
                                </div>
                            }
                        </div>
                        <div className='mt-9'>
                            <Pagination
                                totalPages={incomesPages}
                                onPageNext={handlePageNext}
                                onPagePrevious={handlePagePrevious}
                                disabledNext={disabledNext}
                                disabledPrevious={disabledPrevious}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IncomesPage