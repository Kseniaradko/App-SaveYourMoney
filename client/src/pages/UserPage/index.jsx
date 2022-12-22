import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentUserData, getUserLoadingStatus} from "../../store/users";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import {getAmountOfAccounts} from "../../store/accounts";
import EditUserAccount from "./editUserAccount";
import useGetNotes from "../../hooks/useGetNotes";
import AllNotes from "./allNotes";
import {getUserNotes} from "../../store/notes";
import useGetAccounts from "../../hooks/useGetAccounts";
import AddNote from "./addNote";

const UserPage = () => {
    useGetNotes()
    useGetAccounts()
    const user = useSelector(getCurrentUserData())
    const loadingStatus = useSelector(getUserLoadingStatus())
    const amountOfAccounts = useSelector(getAmountOfAccounts())
    const notes = useSelector(getUserNotes())

    const [edit, setEdit] = useState(false)
    const [newNote, setNewNote] = useState(false)

    const handleEditClick = () => {
        setEdit(prevState => !prevState)
    }

    const handleAddClick = () => {
        setNewNote(prevState => !prevState)
    }

    if (!user || !amountOfAccounts || !notes) return <Loader/>
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
                                            <button onClick={handleEditClick}
                                                    className="font-semibold text-slate-400 mt-4 hover:text-sky-500">
                                                Редактировать информацию о себе
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    edit && <EditUserAccount onClick={handleEditClick}/>
                                )
                            )}
                        </div>
                        <div
                            className="border-l border-blueGray-200 text-center text-blueGray-700 min-w-[700px]">
                            <div
                                className="flex justify-between text-lg text-blueGray-600 w-full h-full mt-5 ml-5 mb-5">
                                {notes.length === 0 && !newNote && (
                                    <div
                                        className='flex flex-col justify-around w-full h-full text-center items-center'>
                                        <div>Добавляйте заметки, чтобы ничего не забыть!</div>
                                        <div className='text-center'>
                                            <button
                                                className="font-semibold text-slate-400 hover:text-sky-500 text-base"
                                                onClick={handleAddClick}
                                            >
                                                Добавить заметку
                                            </button>
                                        </div>
                                    </div>
                                )
                                }
                                {notes.length > 0 && !newNote && (
                                    <div
                                        className='flex flex-col justify-between h-full w-full'>
                                        <AllNotes notes={notes} onClick={handleAddClick}/>
                                    </div>
                                )}
                                {newNote && <AddNote onClick={handleAddClick}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default UserPage
