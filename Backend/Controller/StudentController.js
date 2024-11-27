const Student = require("../Models/Student");
const Complaint = require("../Models/Complaint");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const audit = require("../Models/audit");
const { request, response } = require("express");

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const stdu = await Student.create(req.body);
    res.json(stdu);
  } catch (error) {
    throw new Error(error);
  }
};

function generateToken(student) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const payload = {
    studentId: student._id,
    email: student.email,
    password: student.password,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
}

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required.");
    }
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res
        .status(401)
        .json({ message: "Student with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      email,
      password: hashedPassword,
    });

    await newStudent.save();
    const token = generateToken(newStudent);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res
      .status(201)
      .json({ message: "Student registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Invalid email or password." });
    }

    const token = generateToken(student);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({ message: "Login successful.", student });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const logout= async (req,res)=>{
  try {
      
    res.cookie("jwt","",{maxAge:1,secure:false, sameSite: 'lax',path:"/"});
      return res.status(200).json({ message: 'Logout successful' }); 
      
  } catch (error) {
      console.error(error); 
      return res.status(500).json({ message: 'Error during logout', error: error.message });
  }
}

  
const complainInfo = async (req, res) => {
  try {
    const { studentId, labnum, computernum, copmplaindes } = req.body;

    // Validate input fields
    if (!studentId || !labnum || !computernum || !copmplaindes) {
      return res.status(400).send("All fields are required.");
    }

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send("Student not found.");
    }

    // Create a new complaint record
    const complaint = new Complaint({
      studentId,
      labnum,
      computernum,
      copmplaindes,
    });

    // Save the record to the database
    await complaint.save();
    console.log(complaint);

    // Send success response
    return res.status(200).send("Complaint saved successfully.");
  } catch (error) {
    console.error("Error saving complaint:", error);

    // Send error response
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

const viewComplain = async (req,res)=>{
  try {
    console.log("in view complai");
    
    const complain = await Complaint.find().populate("studentId");
    return res.status(200).json(complain);
  } catch (error) {
    return new Error(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  signup,
  complainInfo,
  viewComplain
  // getAllstd
};
