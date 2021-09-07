import {  Switch, Route ,BrowserRouter,Redirect} from 'react-router-dom';
import Register from "./components/Register/Register"
import Login from './components/Login/Login'
import Todos from './components/Task/Todos';
import Home from './components/Home/Home'
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer'
import './App.css'
import { useEffect, useState } from 'react';

function ProtectedRoute(props) {
  // ideally this state will be common shared state
  let isUserLoggedIn = false;
  if(localStorage.getItem('token')){
    isUserLoggedIn = true
  }
  if (!isUserLoggedIn) {
    return <Redirect to="/" />;
  }
  return <Route path={props.path}> {props.children}</Route>;
}

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
      <div className="body1">
      <Switch >
				<Route path="/" exact component={Home} />
				<Route exact path="/login" >
          <Login islogin={globalLogin} />
        </Route> 
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/todos" >
          <Todos />
        </ProtectedRoute>
			</Switch>
      </div>
			<Footer />
    </div>
    </BrowserRouter>    
  );
}

export default App;
