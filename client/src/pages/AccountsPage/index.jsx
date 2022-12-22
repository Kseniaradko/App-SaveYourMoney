import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {getAccountLoadingStatus, getAccounts, getTotalAccountsPages, removeAccount} from "../../store/accounts";
import {Link} from "react-router-dom";
import displayDate from "../../utils/displayDate";
import Button from "../../components/common/Button";
import AccountModalWindow from "../../components/Plugins/ModalWindows/AccountModalWindow";
import {createOperation} from "../../store/operationsHistory";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/pagination";
import useGetAccountsForPage from "../../hooks/useGetAccountsForPage";

const AccountsPage = () => {
    const dispatch = useDispatch()
    const userAccounts = useSelector(getAccounts())
    const loadingStatus = useSelector(getAccountLoadingStatus())
    const accountsPages = useSelector(getTotalAccountsPages())

    const limit = 5
    const [currentPage, setCurrentPage] = useState(1)
    useGetAccountsForPage(currentPage, limit)

    const [showModal, setShowModal] = useState(false)

    const disabledNext = accountsPages === currentPage
    const disabledPrevious = currentPage === 1

    const handlePageNext = () => {
        setCurrentPage(prevState => prevState + 1)
    }

    const handlePagePrevious = (pageIndex) => {
        setCurrentPage(prevState => prevState - 1)
    }

    const handleClick = () => {
        setShowModal(prevState => !prevState)
    }

    const columns = {
        _id: {
            name: '№',
            path: '_id',
            component: (data) => {
                if (currentPage === 1) return userAccounts.indexOf(data) + 1
                return (limit * currentPage) - (limit - 1) - userAccounts.indexOf(data)
            }
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
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id, currentPage)}/>
        }
    }

    const handleDelete = (id, currentPage) => {
        dispatch(removeAccount(id, currentPage))

        const account = userAccounts.filter((acc) => acc._id === id)[0]
        const operation = {
            type: 'ACCOUNT',
            action: 'DELETE',
            sum: account.sum,
            accountName: account.name || ''
        }
        dispatch(createOperation(operation))
    }

    if (userAccounts.length === 0 && currentPage > 1) setCurrentPage(prevState => prevState - 1)

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
        <div className='flex flex-col justify-between h-full max-w-screen-xl m-auto w-full'>
            <div className='relative'>
                <div
                    className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'
                >
                    Мои счета
                </div>
                <Table columns={columns} data={userAccounts}/>
                {loadingStatus &&
                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                        <Loader/>
                    </div>
                }
            </div>
            <div>
                <Pagination
                    totalPages={accountsPages}
                    onPageNext={handlePageNext}
                    onPagePrevious={handlePagePrevious}
                    disabledNext={disabledNext}
                    disabledPrevious={disabledPrevious}
                />
            </div>
        </div>
    )
}

export default AccountsPage