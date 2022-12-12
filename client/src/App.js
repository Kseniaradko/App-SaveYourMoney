import React from "react";
import AuthContainer from "./layout/AuthContainer";
import AuthMainPage from "./layout/AuthMainPage";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <div className='flex flex-col justify-between h-screen'>
                <AuthContainer>
                    <AuthMainPage/>
                </AuthContainer>
            </div>
            <ToastContainer/>
        </>
    );
}

export default App;
