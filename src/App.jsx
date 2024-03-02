// App.js
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultSidebar from './components/DefaultSidebar';
import Orders from './pages/Orders';
import Credentials from './pages/Credentials';
import CarDetail from './pages/CarDetail';
import BlogDetail from './pages/BlogDetail';
import ManageCar from './pages/ManageCar';
import ManageBlog from './pages/ManageBlog';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className='flex flex-col md:flex-row'>
        <DefaultSidebar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/manage-car' element={<ManageCar />} />
          <Route path='/manage-blogs' element={<ManageBlog />} />
          <Route path='/credentials' element={<Credentials />} />
          <Route path='/car/:id' element={<CarDetail />} />
          <Route path='/blog/:id' element={<BlogDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
