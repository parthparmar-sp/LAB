import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewComplain = () => {
  const [allComplain, setAllComplain] = useState(null);

  const getComplain = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/auth/complain");
      setAllComplain(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/auth/complain/${id}`);
      // Update the local state to remove the deleted complaint
      setAllComplain(allComplain.filter((complain) => complain._id !== id));
      console.log(`Complaint with ID ${id} deleted.`);
    } catch (error) {
      console.error(`Error deleting complaint with ID ${id}:`, error);
    }
  };

  useEffect(() => {
    getComplain();
  }, []);

  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-teal-700 to-blue-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Complaints</h1>

      {allComplain && allComplain.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {allComplain.map((complain) => (
            <div
              key={complain._id}
              className="bg-white text-gray-900 rounded-lg shadow-lg p-6 space-y-4 border border-gray-300 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold">Lab: {complain.labnum}</h2>
              <h3 className="text-lg text-blue-700 font-medium">
                Computer: {complain.computernum}
              </h3>
              <p className="text-gray-600">Issue: {complain.copmplaindes}</p>
              <p className="text-sm text-gray-500 italic">
                Complained by: {complain.studentId?.email || "Unknown"}
              </p>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                onClick={() => handleApprove(complain._id)}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg font-semibold mt-12 text-gray-200">
          No complaints available
        </p>
      )}
    </div>
  );
};

export default ViewComplain;
  