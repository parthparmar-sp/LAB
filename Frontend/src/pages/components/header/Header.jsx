import { LOGOUT_ROUTES } from '@/utils/constatns';
import axios from 'axios';
import { FaLaptop } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      setIsLoggedIn(true);
    }
  }, []);

  const logouthandle = async () => {
    try {
      const response = await axios.post(LOGOUT_ROUTES, {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem("studentId");
        setIsLoggedIn(false); // Update login status
        toast.success("Logout successful");
        navigate('/auth');
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="h-16 shadow-lg bg-gray-900 text-white">
      <div className="h-full container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <FaLaptop className="h-12 w-12 text-orange-500 animate-spin-slow" />
          <div className="ml-4">
            <h1 className="text-3xl font-bold tracking-wide">Lab Assistant</h1>
            <p className="text-sm text-gray-400 italic">What can I help with today?</p>
          </div>
        </div>
        <ul className="flex space-x-8 text-lg font-semibold">
          {!isLoggedIn ? (
            <li className="cursor-pointer hover:text-lime-500 transition duration-200">
              <a href="/auth">Login</a>
            </li>
          ) : (
            <li className="cursor-pointer hover:text-lime-500 transition duration-200">
              <a href="/" onClick={logouthandle}>Logout</a>
            </li>
          )}
          <li className="cursor-pointer hover:text-lime-500 transition duration-200">
            <a href="/Labschedule">Lab Schedule</a>
          </li>
          <li className="cursor-pointer hover:text-lime-500 transition duration-200">
            <a href="/complain">Complain</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;