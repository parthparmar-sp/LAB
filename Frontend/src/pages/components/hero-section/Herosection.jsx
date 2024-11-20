import { useNavigate } from "react-router-dom";

function Herosection() {
  const navigate = useNavigate();

  const onGetStarted = () => {
    navigate('/register');
  };

  return (
    <section className="bg-gray-900 text-white py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4 text-orange-500">
          Hello Buddy, I am your personal computer lab assistant
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          Manage your lab tasks effortlessly. Log in, check the lab schedule, or file a complaint.
        </p>
        <button
          onClick={onGetStarted}
          className="px-10 py-4 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transform transition-all duration-300 hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Herosection;
