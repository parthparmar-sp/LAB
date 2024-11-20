import { FaLaptop } from 'react-icons/fa6';

function Header() {
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
            <a href="/lab-schedule">Lab Schedule</a>
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
