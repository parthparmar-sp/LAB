
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/login';
import Complain from './pages/Complain/Complain';
import Index from './pages/components';
import Register from './pages/Auth/register';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} /> {/* Default home route */}
        <Route path="/header" element={<Index />} /> {/* Correct lowercase path */}
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} /> 
        <Route path='/complain' element={<Complain/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
