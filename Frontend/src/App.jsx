
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/login';
import Complain from './pages/Complain/Complain';
import Index from './pages/components';
import Register from './pages/Auth/register';
import Admin from './pages/Admin';
import ViewComplain from './pages/components/ViewComplain';
import Labschedule from './pages/Labschedule/Labschedule';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} /> 
        <Route path="/header" element={<Index />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} /> 
        <Route path='/complain' element={<Complain/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/View-Complain' element={<ViewComplain/>}></Route>
        <Route path='/Labschedule' element={<Labschedule/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
