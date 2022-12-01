import React from "react";

const TableHeader = ({ columns }) => {
    return (
        <thead className='bg-slate-100'>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        scope='col'
                        className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-4 pb-4 text-slate-600 dark:text-slate-200 text-center'
                    >
                        {columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader