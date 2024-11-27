import Header from "../components/header/header";
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
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

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

    const data = {
      email: Email.trim(),
      password: Password.trim(),
    };

    try {
      setLoading(true); 
      const response = await axios.post(SIGNUP_URL, data, {
        withCredentials: true,
      });

      
      if (response.status === 201) {
        toast.success("Registration successful.");
        navigate("/auth"); 
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : error.message
      );

      
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Registration failed. Please try again."
        );
      } else {
        toast.error(
          "An unexpected error occurred. Please try again later."
        );
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Header />
      <section id="register" className="py-16 bg-gradient-to-br from-gray-900 via-teal-700 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gold-500">Register as Student</h2>
          <form
            className="bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-lg mx-auto space-y-6"
            onSubmit={handleRegister}
          >
            <div className="mb-6">
              <label className="block text-left text-gold-400 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-4 border border-gold-400 rounded-md text-white bg-transparent focus:ring-2 focus:ring-gold-500"
                placeholder="Enter your email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-left text-gold-400 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-4 border border-gold-400 rounded-md text-white bg-transparent focus:ring-2 focus:ring-gold-500"
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-left text-gold-400 font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-4 border border-gold-400 rounded-md text-white bg-transparent focus:ring-2 focus:ring-gold-500"
                placeholder="Confirm your password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gold-600 text-white py-2 rounded-md hover:bg-gold-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <p className="text-sm mt-4 text-gray-300">
            Already have an account?{" "}
            <a href="/auth" className="text-gold-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
