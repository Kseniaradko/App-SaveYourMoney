import React from "react";
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../../store/users";
import Loader from "../../components/common/Loader";
import {Link} from "react-router-dom";
import displayDate from "../../utils/displayDate";
import {getAmountOfAccounts} from "../../store/accounts";

const UserPage = () => {
    const user = useSelector(getCurrentUserData())
    const amountOfAccounts = useSelector(getAmountOfAccounts())
    if (!user) {
        return <Loader/>
    }
    const dateOfRegistration = displayDate(user.createdAt)
    return (
        <section className="bg-blueGray-50">
            <div className="max-w-screen-xl m-auto px-4">
                <div
                    className="bg-white mb-6 shadow-2xl rounded-lg">
                    <div className="px-6 flex flex-row justify-around">
                        <div className="flex flex-col w-10/12">
                            <div className='grid content-between'>
                                <h3 className="mt-5 text-xl font-semibold leading-normal text-blueGray-700 text-center">
                                    {user.name}
                                </h3>
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
                                <Link to className="font-normal text-center text-pink-500 mt-4">
                                    Редактировать информацию о себе
                                </Link>
                            </div>
                        </div>
                        <div className="border-l border-blueGray-200 text-center text-blueGray-700">
                            <div className="flex flex-col justify-center mt-5 mb-5">
                                <div className="flex flex-row px-4">
                                    <div className='flex flex-col justify-center pr-2'>
                                        <label className='text-lg pb-2'>Типы доходов</label>
                                        <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">An
                                                item
                                            </li>
                                            <li className="px-6 py-2 border-b border-gray-200 w-full">A second item</li>
                                            <li className="px-6 py-2 border-b border-gray-200 w-full">A third item</li>
                                            <li className="px-6 py-2 border-b border-gray-200 w-full">A fourth item</li>
                                            <li className="px-6 py-2 w-full rounded-b-lg">And a fifth one</li>
                                        </ul>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <label className='text-lg pb-2'>Типы расходов</label>
                                        <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">An
                                                item
                                            </li>
                                            <li className="px-6 py-2 border-b border-gray-200 w-full">A second item</li>
                                            <li className="px-6 py-2 border-b border-gray-200 w-full">A third item</li>
                                            <li className="px-6 py-2 border-b border-gray-200 w-full">A fourth item</li>
                                            <li className="px-6 py-2 w-full rounded-b-lg">And a fifth one</li>
                                        </ul>
                                    </div>
                                </div>
                                <Link to className="mt-2 font-normal text-pink-500">
                                    Добавить тип для дохода или расхода
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default UserPage

// return (
//     <div className='max-w-screen-xl m-auto flex-col justify-center'>
//         <div className='bg-cyan-50 w-48 h-48 text-center'>User Photo</div>
//         <div className='text-slate-500 text-m'>{`Имя: ${user.name}`}</div>
//         <div className='text-slate-500 text-m'>{`Пол: ${user.sex}`}</div>
//         <div className='text-slate-500 text-m'>{`Электронная почта: ${user.email}`}</div>
//     </div>
// )