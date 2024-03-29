import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Card from '@pages/Card'
import Home from '@pages/Home'
import Test from '@pages/Test'
import ScrollToTop from '@shared/ScrollToTop'
import Signin from '@pages/Signin'
import Signup from '@pages/Signup'
import Navbar from '@shared/Navbar'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/card/:id" Component={Card} />
        <Route path="/test" Component={Test} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
