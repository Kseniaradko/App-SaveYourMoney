import React from "react";

const OperationsInfo = ({label, data, img}) => {
    return (
        <div className='border-dotted border-4 border-sky-300 rounded-md px-6 py-6 bg-cyan-50 shadow-xl'>
            <div className="text-lg font-semibold flex gap-1">
                {label}
                {img && <img className='w-5' src={img} alt='Loading'/>}
            </div>
            {data && data.map((item) => {
                return (
                    <div key={item.id}>{`${item.id}. ${item.title}: ${item.sum}`}</div>
                )
            })}
        </div>
    )
}

export default OperationsInfo