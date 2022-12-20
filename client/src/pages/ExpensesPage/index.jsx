import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentUserExpenses,
    getExpenseLoadingStatus,
    getTotalExpensePages,
    removeExpense
} from "../../store/expenses";
import {Link} from "react-router-dom";
import {getAccounts} from "../../store/accounts";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import ExpensesModalWindow from "../../components/Plugins/ModalWindows/ExpensesModalWindow";
import Button from "../../components/common/Button";
import {createOperation} from "../../store/operationsHistory";
import {getExpensesTypes} from "../../store/expensesType";
import Pagination from "../../components/common/pagination";
import useGetExpenses from "../../hooks/useGetExpenses";
import useGetTypes from "../../hooks/useGetTypes";

const ExpensesPage = () => {
    useGetTypes()
    const dispatch = useDispatch()
    const userExpenses = useSelector(getCurrentUserExpenses())
    const userAccounts = useSelector(getAccounts())
    const userTypes = useSelector(getExpensesTypes())
    const expensesPages = useSelector(getTotalExpensePages())
    const loadingStatus = useSelector(getExpenseLoadingStatus())

    const limit = 6
    const [currentPage, setCurrentPage] = useState(1)
    useGetExpenses(currentPage, limit)

    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(prevState => !prevState)
    }

    const disabledNext = expensesPages === currentPage
    const disabledPrevious = currentPage === 1

    const handlePageNext = () => {
        setCurrentPage(prevState => prevState + 1)
    }

    const handlePagePrevious = (pageIndex) => {
        setCurrentPage(prevState => prevState - 1)
    }

    const columns = {
        _id: {
            name: '№',
            path: '_id',
            component: (data) => userExpenses.indexOf(data) + 1
        },
        category: {
            name: 'Категория',
            path: 'category',
            component: (data) => {
                const type = userTypes.find((item) => item._id === data.category)
                if (type) return type.name
                return <>Категория была удалена</>
            }
        },
        accountId: {
            name: 'Счет зачисления',
            path: 'accountId',
            component: (data) => {
                const account = userAccounts.find((account) => account._id === data.accountId)
                if (account) return account.name
                return 'Данный счет был удален'
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
            component: (data) => <Link to={`/expensesPage/${data._id}`}><EditIcon/></Link>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id, currentPage)}/>
        }
    }

    const handleDelete = (id, currentPage) => {
        dispatch(removeExpense(id, currentPage))

        const expense = userExpenses.filter((expense) => expense._id === id)[0]
        const type = userTypes.filter((type) => type._id === expense.category)[0]
        const typeName = type?.name
        const account = userAccounts.filter((acc) => acc._id === expense.accountId)[0]
        const accountLabel = account?.name

        const operation = {
            type: 'EXPENSE',
            action: 'DELETE',
            category: typeName || null,
            sum: expense.sum,
            accountName: accountLabel || null
        }
        dispatch(createOperation(operation))
    }

    if (!userExpenses || !userAccounts || !userTypes) return <Loader/>
    if (userExpenses.length === 0 && currentPage > 1) setCurrentPage(prevState => prevState - 1)
    if (userExpenses.length === 0) {
        return (
            <div
                className='max-w-screen-xl m-auto flex-col justify-center text-xl italic font-light text-slate-500'>
                {showModal && <ExpensesModalWindow onCLick={handleClick}/>}
                Расходы отсутствуют. Начните добавлять их!
                <div className='flex justify-center' onClick={handleClick}>
                    <Button
                        face='add'
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        )
    }


    return (
        <div className='flex flex-col justify-between h-full max-w-screen-xl m-auto w-full'>
            <div className='relative'>
                <div
                    className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'
                >
                    Мои расходы
                </div>
                <Table columns={columns} data={userExpenses}/>
                {loadingStatus &&
                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                        <Loader/>
                    </div>
                }
            </div>
            <div>
                <Pagination
                    totalPages={expensesPages}
                    onPageNext={handlePageNext}
                    onPagePrevious={handlePagePrevious}
                    disabledNext={disabledNext}
                    disabledPrevious={disabledPrevious}
                />
            </div>
        </div>
    )
}

export default ExpensesPage