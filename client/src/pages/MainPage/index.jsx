import React from "react";
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div className='max-w-screen-xl m-auto w-full flex justify-center'>
            <div className="text-center text-gray-800">
                <div className="block px-6 py-12">
                    <div className="tracking-tight mb-12">
                        <div
                            className='font-bold mt-3 text-5xl text-sky-500'>MoneySave
                        </div>
                        <div className='mt-6 text-2xl text-slate-500 font-light'>Мы поможем тебе легко управлять твоими
                            доходами и
                            расходами!
                        </div>
                        <br/>

                    </div>
                    <Link to='/login'
                          className="inline-block px-7 py-3 mb-2 md:mb-0 mr-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          data-mdb-ripple="true" data-mdb-ripple-color="light">Пооехали!</Link>
                </div>
            </div>
        </div>
    )
}

export default MainPage;