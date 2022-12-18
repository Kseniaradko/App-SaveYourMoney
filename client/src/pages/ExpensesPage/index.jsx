import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserExpenses, removeExpense} from "../../store/expenses";
import {Link} from "react-router-dom";
import {getAccounts} from "../../store/accounts";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import ExpensesModalWindow from "../../components/Plugins/ModalWindows/ExpensesModalWindow";
import Button from "../../components/common/Button";
import {createOperation} from "../../store/operationsHistory";
import {getExpensesTypes} from "../../store/expensesType";

const ExpensesPage = () => {
    const dispatch = useDispatch()
    const userExpenses = useSelector(getCurrentUserExpenses())
    const userAccounts = useSelector(getAccounts())
    const userTypes = useSelector(getExpensesTypes())
    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(prevState => !prevState)
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
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id)}/>
        }
    }

    const handleDelete = (id) => {
        dispatch(removeExpense(id))

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
        console.log(operation)
        dispatch(createOperation(operation))
    }

    if (!userExpenses || !userAccounts || !userTypes) return <Loader/>
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
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div
                className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'
            >
                Мои расходы
            </div>
            <Table columns={columns} data={userExpenses}/>
        </div>
    )
}

export default ExpensesPage