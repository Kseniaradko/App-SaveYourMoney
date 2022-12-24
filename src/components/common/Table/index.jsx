import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Loader from '../Loader'


const Table = ({columns, children, data, onDelete}) => {
    if (!data) return <div className='items-center'><Loader/></div>
    return (
        <table className='border-collapse table-auto w-full text-sm'>
            {children || (
                <>
                    <TableHeader {...{columns}}/>
                    <TableBody {...{columns, data}}/>
                </>
            )}
        </table>
    )
}

export default Table