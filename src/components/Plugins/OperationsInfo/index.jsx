import React, {useState} from 'react'
import plusIcon from './plusIcon.svg'
import IncomeModalWindow from "./IncomeModalWindow";
import ExpensesModalWindow from "./ExpensesModalWindow";
import AccountModalWindow from "./AccountModalWindow";
import {Link} from "react-router-dom";

const OperationsInfo = ({label, data, img}) => {
    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(prevState => !prevState)
    }

    return (
        <div
            className='border-dotted border-4 border-sky-300 rounded-md px-6 py-4 bg-slate-50 shadow-xl relative flex-1'>
            <img
                src={plusIcon}
                className='absolute top-3 right-4 w-6 cursor-pointer rounded-full bg-slate-300 shadow-2xl'
                onClick={handleClick}
                alt='plus'/>
            {showModal && label === 'Доходы' && <IncomeModalWindow onCLick={handleClick}/>}
            {showModal && label === 'Расходы' && <ExpensesModalWindow onCLick={handleClick}/>}
            {showModal && label === 'Счета' && <AccountModalWindow onCLick={handleClick}/>}
            <div className="text-lg font-semibold pb-3 flex justify-center gap-1 hover:underline underline-offset-4">
                {label === "Доходы" && <Link to='/incomesPage'>{label}</Link>}
                {label === "Расходы" && <Link to='/expensesPage'>{label}</Link>}
                {label === "Счета" && <Link to='/accountsPage'>{label}</Link>}
                {img && <img className='w-5' src={img} alt='Loading'/>}
            </div>
            {data && data.map((item) => {
                return (
                    <div key={item.id} className='flex justify-between mb-2 border-b-2 border-slate-200 '>
                        <div className=''>{`${data.indexOf(item) + 1}. ${item.type || item.account}`}</div>
                        <div className=''>{item.sum}р.</div>
                    </div>
                )
            })}
        </div>
    )
}

export default OperationsInfo