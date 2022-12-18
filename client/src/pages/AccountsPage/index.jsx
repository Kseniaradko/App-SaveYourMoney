import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {getAccounts, removeAccount} from "../../store/accounts";
import {Link} from "react-router-dom";
import displayDate from "../../utils/displayDate";
import Button from "../../components/common/Button";
import AccountModalWindow from "../../components/Plugins/ModalWindows/AccountModalWindow";
import {createOperation} from "../../store/operationsHistory";

const AccountsPage = () => {
    const dispatch = useDispatch()
    const userAccounts = useSelector(getAccounts())
    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(prevState => !prevState)
    }

    const columns = {
        _id: {
            name: '№',
            path: '_id',
            component: (data) => userAccounts.indexOf(data) + 1
        },
        accountName: {
            name: 'Счет',
            path: 'accountName',
            component: (data) => <Link to={`/accountsPage/${data._id}`}
                                       className='hover:text-sky-500'>{data.name}</Link>
        },
        sum: {
            name: 'Сумма на счету, р.',
            path: 'sum'
        },
        createdAt: {
            name: 'Дата создания',
            path: 'createdAt',
            component: (data) => displayDate(data.createdAt)
        },
        edit: {
            name: 'Редактировать',
            component: (data) => <Link to={`/accountsPage/${data._id}`}><EditIcon/></Link>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id)}/>
        }
    }

    const handleDelete = (id) => {
        dispatch(removeAccount(id))

        const account = userAccounts.filter((acc) => acc._id === id)[0]
        const operation = {
            type: 'ACCOUNT',
            action: 'DELETE',
            sum: account.sum,
            accountName: account.name || ''
        }
        dispatch(createOperation(operation))
    }

    if (userAccounts.length === 0) {
        return (
            <div
                className='max-w-screen-xl m-auto flex-col justify-center text-xl italic font-light text-slate-500'>
                {showModal && <AccountModalWindow onCLick={handleClick}/>}
                Счета отсутствуют. Начните добавлять их!
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
                Мои счета
            </div>
            <Table columns={columns} data={userAccounts}/>
        </div>
    )
}

export default AccountsPage