import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Card from '@pages/Card'
import Home from '@pages/Home'
import Test from '@pages/Test'
import ScrollToTop from '@shared/ScrollToTop'
import Signin from '@pages/Signin'
import Signup from '@pages/Signup'
import Navbar from '@shared/Navbar'
import PrivateRoute from './components/auth/PrivateRoute'
import ApplyPage from './pages/Apply'
import ApplyDone from './pages/ApplyDone'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/card/:id" Component={Card} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
