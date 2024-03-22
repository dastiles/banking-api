const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/authModels");
const ProfessionalCpa = require("../models/professionalCpa");
const Leads = require("../models/leadsModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/mail");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "charlesmadhuku11@gmail.com",
    pass: "senb llfx izcx snak",
  },
});

// @desc Open new for a user
// @route POST /api/auth/open_account
// @access Public

const openCpaAccount = expressAsyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    miles,
    postCodes,
    companyName,
    website,
    size,
    service,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !miles ||
    !postCodes ||
    !size ||
    !service
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if the user already exists
  const userExits = await User.findOne({ email });
  console.log(userExits, "bembe");
  if (userExits) {
    res.status(400).json({ message: "Email Already registered" });
    throw new Error("Please add all fields");
  }
  // harsh the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    role: true,
    email,
    password: hashedPassword,
  });

  // Welcome to Bark, charles madhuku
  // We're excited to start helping you grow your business!

  // We'll now email you targeted leads from new customers. Ensure you get the right leads by confirming your lead preferences now.

  if (user) {
    const { id, role } = user;
    console.log(id);
    await ProfessionalCpa.create({
      user: id,
      miles,
      postCodes,
      size,
      website,
      service,
      phone,
      companyName,
    });

    const mailOptions = {
      from: "charlesmadhuku11@gmail.com",
      to: email,
      subject: "Welcome to Access A CPA",
      text: "Access A CPA",
      html: `<h1> Welcome to Access A CPA, ${name}</h1> \n <p>We're excited to start helping you grow your business!</p> \n\n <p>We'll now email you targeted leads from new customers. Ensure you get the right leads by confirming your lead preferences now</p> `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log("Email sent: " + info.response);
        info.response;
      }
    });

    res.status(201).json({
      id,
      role,
      token: generateToken(id, role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const openClientAccount = expressAsyncHandler(async (req, res) => {
  const {
    email,
    fullname,
    summary,
    phone,
    issue,
    requirements,
    deadline,
    contact,
    issueArray,
  } = req.body;
  console.log(req.body);
  if (
    !fullname ||
    !email ||
    !summary ||
    !issue ||
    !issueArray ||
    !contact ||
    !requirements
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExits = await User.findOne({ email });
  console.log(userExits, "bembe");
  if (userExits) {
    const { id } = userExits;
    const leads = await Leads.create({
      user: id,
      summary,
      issue,
      requirements,
      deadline,
      contact,
      issues: issueArray,
    });

    const mailOptions = {
      from: "charlesmadhuku11@gmail.com",
      to: "dastilesforever@gmail.com",
      subject: "Issue",
      text: "That was easy!",
      html: "<b>Hey there!</b><br>This is our first message sent with Nodemailer<br/>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log("Email sent: " + info.response);
        info.response;
      }
    });

    res.status(201);
    res.json(leads);
  } else {
    const user = await User.create({
      name: fullname,
      role: false,
      email,
      phone,
      password: "hashedPassword",
    });
    if (user) {
      const { id } = user;
      const leads = await Leads.create({
        user: id,
        summary,
        issue,
        requirements,
        deadline,
        contact,
        issues: issueArray,
      });

      const mailOptions = {
        from: "charlesmadhuku11@gmail.com",
        to: "dastilesforever@gmail.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        html: "<b>Hey there!</b><br>This is our first message sent with Nodemailer<br/>",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(201);
      res.json(leads);
    } else {
      res.status(500);
      throw new Error("Please add all fields");
    }
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if the user already exists
  const userExits = await User.findOne({ email });

  console.log(userExits.password)
  if (userExits && (await bcrypt.compare(password, userExits.password))) {
    const {
      id,
     role,
    } = userExits;
    res.status(201).json({
      id,
      role,
      token: generateToken(id, role),
    });
  } else {
    res.status(400);
    throw new Error("Account not found");
  }
});

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  openCpaAccount,
  loginUser,
  openClientAccount,
};
