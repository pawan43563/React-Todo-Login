import {  Switch, Route , BrowserRouter} from 'react-router-dom';
import Register from "./components/Register/Register"
import Login from './components/Login/Login'
import Todos from './components/Task/Todos';
import Home from './components/Home/Home'
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer'
import './App.css'
import { useEffect, useState } from 'react';
function App() {

  const [loggedin,setLoggedin]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setLoggedin(true)
    }
  },[])

  const globalLogin=()=>{
    setLoggedin(true)
  }

  const globalLogout=()=>{
    setLoggedin(false)
  }

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar islogin={loggedin} islogout={globalLogout} />
			<Switch className="body">
				<Route path="/" exact component={Home} />
				<Route exact path="/login"  render={(props) => <Login islogin={globalLogin} {...props} /> } />
        <Route exact path="/register" component={Register} />
        <Route exact path="/todos" component={Todos} />
			</Switch>
			<Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
