import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import NavBar from './components/Navigations'
import Login from './components/Login'
import Account from './components/Account'


function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  useEffect(()=> {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(()=>{
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>

      {/* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

      <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */}

    <NavBar token={token} logout={logout} />

    <Routes>
      <Route path="/" element={<Books token={token}/>}/>
      <Route path="/single/:id" element={<SingleBook token={token}/>}/>
      <Route path="/login" element={<Login isLoggedIn={true} setToken={setToken} setUser={setUser}/>} />
      <Route path="/register" element={<Login isLogin={false} setToken={setToken} setUser={setUser}/>}/>
      <Route path="/account" element={<Account token={token} />}/>
    </Routes>

    </>
  )
}

export default App
