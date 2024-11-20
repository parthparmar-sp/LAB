import Header from "../components/header/header";
import Featurecard from "../components/feature-card/featurecard";
import { useState } from "react";
import { toast } from "sonner";
import { SIGNUP_URL } from "@/utils/constatns";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Register() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);  // Track loading state
  const navigate = useNavigate(); // Create navigate function

  const handleRegister = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!Email || !Password || !ConfirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (Password !== ConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Prepare the data for the request
    const data = {
      email: Email.trim(), // Use lowercase 'email' to match server expectations
      password: Password.trim(),
    };

    try {
      setLoading(true);  // Set loading to true when request is being processed
      const response = await axios.post(SIGNUP_URL, data, { withCredentials: true });

      // Check for successful response
      if (response.status === 201) { 
        toast.success("Registration successful.");
        navigate('/auth'); // Navigate to the login page
      }
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
      
      // Display a user-friendly error message
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Registration failed. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);  // Reset loading state after request completion
    }
  };

  return (
    <>
      <Header />
      <section id="register" className='py-16 bg-blue-900 text-black '>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-bold mb-6 text-teal-700'>Register as Student</h2>
          <form className='bg-white shadow-xl rounded-xl p-8 max-w-lg mx-auto' onSubmit={handleRegister}>
            <div className='mb-6'>
              <label className='block text-left text-gray-700 font-semibold mb-2'>Email</label>
              <input 
                type='email' 
                className='w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500' 
                placeholder='Enter your email' 
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label className='block text-left text-gray-700 font-semibold mb-2'>Password</label>
              <input 
                type='password' 
                className='w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500' 
                placeholder='Enter your password' 
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label className='block text-left text-gray-700 font-semibold mb-2'>Confirm Password</label>
              <input 
                type='password' 
                className='w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500' 
                placeholder='Enter your password' 
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className='w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600' 
              disabled={loading}  // Disable button while loading
            >
              {loading ? "Registering..." : "Register"} {/* Display loading text */}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
