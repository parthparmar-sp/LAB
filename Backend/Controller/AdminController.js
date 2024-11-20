const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const admn = await Admin.create(req.body);
    res.json(admn);
  } catch (error) {
    throw new Error(error);
  }
  //   try {
  //     const { fullname, email, password } = req.body;

  //     if (!fullname || !email || !password) {
  //       return res.status(400).json({
  //         message: "something missing",
  //         success: false,
  //       });
  //     }
  //     const admin = await Admin.findOne({ email });
  //     if (admin) {
  //       return res.status(400).json({
  //         message: "user already exists",
  //         success: false,
  //       });
  //     }
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     await Admin.create({
  //       fullname,
  //       email,
  //       password: hashedPassword,
  //     });
  //     return res.status(201).json({
  //       message: "Account Created successfully",
  //       success: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
};

//  const login = async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res.status(400).json({
//           error: "something missing",
//           success: false,
//         });
//       }
//       let admin = await Admin.findOne({ email });

//       if (!admin) {
//         return res.status(400).json({
//           error: "Incorrect email or password",
//           success: false,
//         });
//       }
//       const isPasswordmatch = await bcrypt.compare(password, Admin.password);
//       if (!isPasswordmatch) {
//         return res.status(400).json({
//           error: "Incorrect email or password",
//           success: false,
//         });
//       }

//       const tokenData = {
//         adminId: Admin._id,
//       };
//       const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
//         expiresIn: "1d",
//       });
//       admin = {
//         _id: Admin._id,
//         name: Admin.fullname,
//         email: Admin.email,

//       };
//       return res.status(200)
//         .cookie("token", token, {
//           maxAge: 1 * 24 * 60 * 60 * 1000,
//           httpOnly: true,
//           sameSite: "strict",
//         })
//         .json({
//           message: `Welcome Back ${Admin.name}`,
//           Admin,
//           success: true,
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findAdmin = await Admin.findOne({ email: email });
        if (!findAdmin) {
            return res.status(404).json({
                message: "Admin not found",
                success: false,
            });
        }

        // Directly compare the provided password with the password in the database
        if (password !== findAdmin.password) {
            return res.status(400).json({
                message: "Wrong password",
                success: false,
            });
        }

        // If password is correct, send a welcome message
        return res.status(200).json({
            message: `Welcome Back ${findAdmin.fullname}`,
            success: true,
        });
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = {
  register,
  login,
};
