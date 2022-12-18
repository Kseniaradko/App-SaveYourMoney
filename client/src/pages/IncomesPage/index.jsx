import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserIncomes, removeIncome} from "../../store/incomes";
import {Link} from "react-router-dom";
import {getAccounts} from "../../store/accounts";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/common/Button";
import IncomeModalWindow from "../../components/Plugins/ModalWindows/IncomeModalWindow";
import {createOperation} from "../../store/operationsHistory";
import {getIncomesTypes} from "../../store/incomesType";

const IncomesPage = () => {
    const dispatch = useDispatch()
    const userIncomes = useSelector(getCurrentUserIncomes())
    const userAccounts = useSelector(getAccounts())
    const userTypes = useSelector(getIncomesTypes())
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
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id)}/>
        }
    }

    const handleDelete = (id) => {
        dispatch(removeIncome(id))

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

    if (!userIncomes || !userAccounts || !userTypes) return <Loader/>

    if (userIncomes.length === 0) {
        return (
            <div
                className='flex-col justify-between text-center text-xl italic font-light text-slate-500'
            >
                {showModal && <IncomeModalWindow onCLick={handleClick}/>}
                Доходы отсутствуют. Начните добавлять их!
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
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>
                Мои доходы
            </div>
            <Table columns={columns} data={userIncomes}/>
        </div>
    )
}

export default IncomesPage