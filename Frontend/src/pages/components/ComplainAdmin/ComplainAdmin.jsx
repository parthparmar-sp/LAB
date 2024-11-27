import { FaLaptop } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

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
          <li className="cursor-pointer hover:text-lime-500 transition duration-200">
            <a href="/auth">Login</a>
          </li>
          <li className="cursor-pointer hover:text-lime-500 transition duration-200">
            <a href="/AdminLabSchedule">Lab Schedule</a>
          </li>
        </ul>

     
        <button
          onClick={() => navigate("/View-Complain")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          View Complain
        </button>
      </div>
    </header>
  );
}

export default Header;  
