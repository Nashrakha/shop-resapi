
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TaskList from './Components/TaskList'
import Editshop from './Components/Editshop'
const PageNotFound =()=>{
  return(
    <div className='flex-col justify-center items-center'>
      <h1>Page Not Found</h1>
      <Link to={'/'} classname="text-red-800">Back</Link>
    </div>
  )
}

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<TaskList/>}/>
        <Route path='edit/:id' element={<Editshop/>}/>
        <Route path='*' element={<PageNotFound/>}/>

      </Routes>
     </Router>
    </>
  )
}

export default App
