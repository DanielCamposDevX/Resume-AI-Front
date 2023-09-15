import Home from "./pages/homePage"
import { Login } from "./pages/loginPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from "./pages/signupPage"

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
