import React from 'react'

const TableBody = ({data, columns}) => {
    return (
        <tbody className='bg-white dark:bg-slate-800'>
        {data.map((item) => (
            <tr key={item._id}>
                {Object.keys(columns).map((column) => (
                    <td
                        key={`${item._id} - ${column}`}
                        className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 text-center dark:text-slate-400'
                    >
                        {columns[column].component ? columns[column].component(item) : item[column]}
                    </td>
                ))}
            </tr>
        ))}
        </tbody>
    )
}

export default TableBody
