import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainPage from "./layout/MainPage";
import Dashboard from "./pages/Dashboard";
import { Route, Switch } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
    return (
        <div className='flex flex-col justify-between h-screen'>
            <Header/>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login" component={LoginPage} />
                <Route path='/signup' component={SignupPage} />
                <Route path="/dashboard" component={Dashboard}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
