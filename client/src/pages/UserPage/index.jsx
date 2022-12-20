import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentUserData, getUserLoadingStatus} from "../../store/users";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import {getAmountOfAccounts} from "../../store/accounts";
import EditUserAccount from "./editUserAccount";

const UserPage = () => {
    const [edit, setEdit] = useState(false)
    const handleClick = () => {
        setEdit(prevState => !prevState)
    }

    const user = useSelector(getCurrentUserData())
    const loadingStatus = useSelector(getUserLoadingStatus())
    const amountOfAccounts = useSelector(getAmountOfAccounts())

    if (!user || !amountOfAccounts) return <Loader/>
    const dateOfRegistration = displayDate(user.createdAt)

    return (
        <section className="bg-blueGray-50">
            <div className="max-w-screen-xl m-auto px-4">
                <div
                    className="bg-white mb-6 shadow-2xl rounded-lg">
                    <div className="px-6 flex flex-row justify-around">
                        <div className="flex flex-col w-full justify-center max-w-[400px]">
                            {loadingStatus ? <Loader/> : (
                                !edit ? (
                                    <div className='flex flex-col justify-between h-full mb-6'>
                                        <div>
                                            <div
                                                className="mt-5 text-xl font-semibold leading-normal text-blueGray-700 text-center"
                                            >
                                                {user.name}
                                            </div>
                                            <div className="mb-2 mt-3 text-lg text-blueGray-600 ">
                                                {`Пол: ${user.sex}`}
                                            </div>
                                            <div className="mb-2 text-lg text-blueGray-600">
                                                {`Электронная почта: ${user.email}`}
                                            </div>
                                            <div className='mb-2 text-lg text-blueGray-600'>
                                                {`Дата регистрации: ${dateOfRegistration}`}
                                            </div>
                                            <div className='mb-2 text-lg text-blueGray-600'>
                                                {`Количество счетов: ${amountOfAccounts}`}
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button onClick={handleClick}
                                                    className="font-semibold text-slate-400 mt-4 hover:text-sky-500">
                                                Редактировать информацию о себе
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    edit && <EditUserAccount onClick={handleClick}/>
                                )
                            )}

                        </div>
                        <div className="border-l border-blueGray-200 text-center text-blueGray-700 min-w-[700px]">
                            <div className="flex flex-col justify-center mt-5 mb-5 ml-5">
                                <div
                                    className="flex justify-center min-h-[200px] pl-5 text-center items-center text-lg text-blueGray-600">
                                    Здесь будет возможность добавлять заметки или цели в следующем релизе
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default UserPage
