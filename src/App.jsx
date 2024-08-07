import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './componants/Home'
import "bootstrap/dist/css/bootstrap.min.css"
import Disease from './componants/Disease'
import BloodDisease from './componants/BloodDisease'
import AboutDiseases from './componants/AboutDiseases'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/disease-predection-frontend/' element={<Home />} />
        <Route path='/disease-predection-frontend/disease' element={<Disease /> } /> 
        <Route path='/disease-predection-frontend/blood-disease' element={<BloodDisease /> } />  
      </Routes>
     </BrowserRouter>
  )
}

export default App
