import React from "react"

const Pagination = ({onPageNext, onPagePrevious, totalPages, disabledNext, disabledPrevious}) => {
    if (totalPages === 1) return null

    return (
        <div className="flex justify-center mt-1 mb-1">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className='page-item' key='page_previous'>
                        <button
                            className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-slate-600 ${disabledPrevious ? '' : 'hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'}`}
                            disabled={disabledPrevious}
                            onClick={onPagePrevious}
                        >
                            Предыдущая
                        </button>
                    </li>
                    <li className='page-item' key='page_next'>
                        <button
                            className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-slate-600 ${disabledNext ? '' : 'hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'}`}
                            disabled={disabledNext}
                            onClick={onPageNext}
                        >
                            Следующая
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination