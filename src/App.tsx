import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Card from '@pages/Card'
import Home from '@pages/Home'
import Test from '@pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/card/:id" Component={Card} />
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
