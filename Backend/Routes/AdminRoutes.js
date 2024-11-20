const express = require('express');
const { register, login } = require("../Controller/AdminController");
const Admin = require("../Models/Admin");
const router = express.Router()

router.post('/',register)
router.post('/Adminlo',login)

module.exports = router