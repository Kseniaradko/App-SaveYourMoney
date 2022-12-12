import React from "react";
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../../store/users";
import Loader from "../../components/common/Loader";

const UserPage = () => {
    const user = useSelector(getCurrentUserData())
    if (!user) {
        return <Loader/>
    }
    return (
        <div className='max-w-screen-xl m-auto flex-col justify-center'>
            <div className='bg-cyan-50 w-48 h-48 text-center'>User Photo</div>
            <div className='text-slate-500 text-m'>{`Имя: ${user.name}`}</div>
            <div className='text-slate-500 text-m'>{`Пол: ${user.sex}`}</div>
            <div className='text-slate-500 text-m'>{`Электронная почта: ${user.email}`}</div>
        </div>
    )
}

export default UserPage