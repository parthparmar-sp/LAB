import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { LOGIN_ROUTES } from "@/utils/constatns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Auth() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!Email || !Password) {
      toast.error("Enter all fields.");
      return;
    }

    try {
      const data = { email: Email.trim(), password: Password.trim() };
      const response = await axios.post(LOGIN_ROUTES, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data && response.data.student && response.data.student.role) {
        const { student } = response.data;
        localStorage.setItem("studentId", student._id);

        if (response.status === 200) {
          toast.success("Login Successful.");
          navigate(student.role === "admin" ? "/admin" : "/");
        }
      } else {
        toast.error("Login failed: Invalid response data.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gradient-to-r from-gray-900 to-teal-800">
      <div className="h-[80vh] bg-white border-2 border-white shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 overflow-hidden">
        <div className="flex flex-col gap-8 items-center justify-center bg-gradient-to-br from-gray-800 to-teal-700 text-white p-10">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
          </div>
          <p className="font-medium text-lg text-center">
            I am your personal computer lab assistant.
          </p>
        </div>

        <div className="flex flex-col items-start justify-start w-full p-10 space-y-6">
          <Tabs className="w-full" defaultValue="login">
            <TabsList className="flex justify-start w-full bg-gray-100 rounded-2xl p-2">
              <TabsTrigger
                value="login"
                className="w-full p-3 rounded-2xl text-lg font-medium text-gray-700 transition-all duration-300 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              <Input
                placeholder="Enter Your Email"
                className="rounded-2xl p-4 border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-all duration-300"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Enter Your Password"
                type="password"
                className="rounded-2xl p-4 border border-gray-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-all duration-300"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
          
              
              <button
                className="w-full mt-4 p-4 bg-blue-800 text-white rounded-2xl font-semibold hover:bg-blue-900 transition-all duration-300"
                onClick={handleLogin}
              >
                Login
              </button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Auth;
