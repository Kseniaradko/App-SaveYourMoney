import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserIncomes, removeIncome} from "../../store/incomes";
import {Link} from "react-router-dom";
import {getCurrentUserAccounts} from "../../store/accounts";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/common/Button";
import IncomeModalWindow from "../../components/Plugins/ModalWindows/IncomeModalWindow";
import {createOperation} from "../../store/operationsHistory";

const IncomesPage = () => {
    const dispatch = useDispatch()
    const userIncomes = useSelector(getCurrentUserIncomes())
    const userAccounts = useSelector(getCurrentUserAccounts())
    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(prevState => !prevState)
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
            component: (data) => <Link to={`/incomesPage/${data._id}`}
                                       className='hover:text-sky-500'>{data.category}</Link>
        },
        accountId: {
            name: 'Счет зачисления',
            path: 'accountId',
            component: (data) => {
                const account = userAccounts.find((account) => account._id === data.accountId)
                if (account) return account.accountName
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
            component: (data) => <Link to={`/incomesPage/${data._id}`}><EditIcon/></Link>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id)}/>
        }
    }

    const handleDelete = (id) => {
        dispatch(removeIncome(id))

        const income = userIncomes.filter((income) => income._id === id)[0]
        const account = userAccounts.filter((acc) => acc._id === income.accountId)[0]
        const accountLabel = account?.accountName
        const operation = {
            type: 'INCOME',
            action: 'DELETE',
            category: income.category,
            sum: income.sum,
            accountName: accountLabel || null
        }

        dispatch(createOperation(operation))
    }

    if (!userIncomes || !userAccounts) return <Loader/>
    if (userIncomes.length === 0) {
        return (
            <div
                className='flex-col justify-between text-center text-xl italic font-light text-slate-500'
            >
                {showModal && <IncomeModalWindow onCLick={handleClick}/>}
                Доходы отсутствуют. Начните добавлять их!
                <div className='flex justify-center' onClick={handleClick}>
                    <Button>Добавить</Button>
                </div>
            </div>
        )
    }

    return (
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>
                Мои доходы
            </div>
            <Table columns={columns} data={userIncomes.reverse()}/>
        </div>
    )
}

export default IncomesPage