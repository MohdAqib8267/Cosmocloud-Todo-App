import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeList from './Pages/EmployeList/EmployeList'
import EmployeDetail from './Pages/EmployeDetail/EmployeDetail';
import AddEmploye from './Pages/AddEmploye/AddEmploye';

function App() {


  return (
    <Router>
      <div className="App">
        {/* <h1>TODO APP</h1> */}
        <Routes>
          <Route path="/" element={<EmployeList />} />
          <Route path="/employee/:id" element={<EmployeDetail />} />
          <Route path="/add" element={<AddEmploye />} />
          <Route path='/add/:id' element={<AddEmploye />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
