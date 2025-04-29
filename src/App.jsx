import { useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import { Routes, Route, Link } from 'react-router-dom'
import SingleBook from './components/SingleBook'
import NavBar from './components/Navigations'
import Login from './components/Login'


function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>

      {/* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

      <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */}

    <nav>
      {
        NavBar()
      }
    </nav>

    <Routes>
      <Route path="/" element={<Books/>}/>
      <Route path="/single/:id" element={<SingleBook />}/>
    </Routes>

    </>
  )
}

export default App
