import React, {useState} from 'react'
import plusIcon from './plusIcon.svg'
import IncomeModalWindow from "../ModalWindows/IncomeModalWindow";
import ExpensesModalWindow from "../ModalWindows/ExpensesModalWindow";
import AccountModalWindow from "../ModalWindows/AccountModalWindow";
import {Link} from "react-router-dom";

const OperationsInfo = ({label, data, img}) => {
    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(prevState => !prevState)
    }

    const haveData = data.length > 0

    return (
        <div
            className='min-h-[182px] border-dotted border-4 border-sky-300 rounded-md px-6 py-4 bg-slate-50 shadow-xl relative flex-1'
        >
            <img
                src={plusIcon}
                className='absolute top-3 right-4 w-6 cursor-pointer rounded-full bg-slate-300 shadow-2xl'
                onClick={handleClick}
                alt='plus'/>
            {showModal && label === 'Доходы' && <IncomeModalWindow onCLick={handleClick}/>}
            {showModal && label === 'Расходы' && <ExpensesModalWindow onCLick={handleClick}/>}
            {showModal && label === 'Счета' && <AccountModalWindow onCLick={handleClick}/>}
            <div className="text-lg font-semibold pb-3 flex justify-center gap-1">
                {label === "Доходы" &&
                    <Link to='/incomesPage' className='hover:underline underline-offset-4'>{label}</Link>}
                {label === "Расходы" &&
                    <Link to='/expensesPage' className='hover:underline underline-offset-4'>{label}</Link>}
                {label === "Счета" &&
                    <Link to='/accountsPage' className='hover:underline underline-offset-4'>{label}</Link>}
                {img && <img className='w-5' src={img} alt='Loading'/>}
            </div>
            {haveData && data.map((item) => {
                return (
                    <div key={item._id}
                         className='flex justify-between mb-2 border-b-2 border-slate-200 '>
                        <div
                            className=''>{`${data.indexOf(item) + 1}. ${item.accountName || item.name}`}
                        </div>
                        <div className=''>{item.sum}р.</div>
                    </div>
                )
            })}
            {!haveData && <div className='mt-4 text-center text-xl font-light text-slate-500'>Нет данных!</div>}
        </div>
    )
}

export default OperationsInfo