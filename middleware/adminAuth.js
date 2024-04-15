const express = require('express');
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/authModels')
const bcrypt = require("bcryptjs");

const addAdmin = expressAsyncHandler(async (req, res, next) => {
    const existingUser = await User.findOne({ email: 'accessacpa@gmail.com' });
    if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('%$Pass123', salt);
        const user = await User.create({
          name: "accessacpa",
          role: true,
          email:'accessacpa@gmail.com',
          password: hashedPassword,
        });
    }
    next();
})
  
const router = express.Router();

router.use(addAdmin); 

module.exports = router;