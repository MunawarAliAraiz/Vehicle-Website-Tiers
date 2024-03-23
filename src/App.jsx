import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import DefaultSidebar from "./components/DefaultSidebar";
import Orders from "./pages/Orders";
import Credentials from "./pages/Credentials";
import CarDetail from "./pages/CarDetail";
import BlogDetail from "./pages/BlogDetail";
import ManageCar from "./pages/ManageCar";
import ManageBlog from "./pages/ManageBlog";
import CarForm from "./pages/CarForm";
import BlogForm from "./pages/BlogForm";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cookies from 'js-cookie';
import "./App.css";
import { serverUrl } from "./utils/serverUrl";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current route is the login route
  const isLoginRoute = location.pathname === "/";


  useEffect(() => {
    // Check if 'adminToken' cookie exists
    const adminToken = Cookies.get('adminToken');
    
    if (adminToken) {
      // If token exists, verify admin status
      fetch(`${serverUrl}/api/users/isadmin`, {
        method: 'GET',
        headers: {
          'Authorization': adminToken,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // If the user is an admin, navigate to the dashboard
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error('Error during admin verification:', error.message);
      });
    }
  }, []);


  return (
        <div className="flex flex-col md:flex-row">
          {isLoginRoute ? null : <DefaultSidebar />}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/manage-cars" element={<ManageCar />} />
            <Route path="/add-car" element={<CarForm />} />
            <Route path="/edit-car/:carId" element={<CarForm />} />
            <Route path="/manage-blogs" element={<ManageBlog />} />
            <Route path="/add-blog" element={<BlogForm />} />
            <Route path="/edit-blog/:blogId" element={<BlogForm />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/car/:_id" element={<CarDetail />} />
            <Route path="/blog/:_id" element={<BlogDetail />} />
          </Routes>
        </div>
  );
}

export default App;
