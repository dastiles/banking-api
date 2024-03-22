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
      html: `<h1>Hi <strong>${name}</strong></h1>,
      \n\n\n
      <p>Congratulations on joining Access A CPA. We can help you find high-quality Accounting leads in moments to grow your business to help you earn more.</p>
      \n\n\n
      <ul>
      <li>You get leads sent over for free</li>
      <li>Only pay for those you contact</li>
      <li>Customer contact details verified for you</li> 
      <li>There's 20% off your first pack and you can start contacting customers straight away.</li>
      </ul>
      \n\n\n
      <p>If you have questions please reply to my email or call on 6305444869</p>
      \n\n\n
      <p>Get started here</p>
      \n\n\n
      <p><strong>Thalenta Ncube</strong></p> `,
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
      subject: "Welcome to Access A CPA",
      text: "Welcome to Access A CPA",
      html: `<h1>Hi <strong>${fullname}</strong></h1>,
       \n\n\n
      <p>Congratulations on joining Access A CPA. We can help you find high-quality Accountants</p> 
      \n\n\n
      <p>If you have questions please reply to my email or call on +442036970265</p>
      \n\n\n
      <p>Get started here</p>
      \n\n\n
      <p><strong>Thalenta Ncube</strong></p>`,
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
        subject: "Welcome to Access A CPA",
        text: "Welcome to Access A CPA",
        html: `<h1>Hi <strong>${fullname}</strong></h1>,
        \n\n\n
       <p>Congratulations on joining Access A CPA. We can help you find high-quality Accountants</p> 
       \n\n\n
       <p>If you have questions please reply to my email or call on +442036970265</p>
       \n\n\n
       <p>Get started here</p>
       \n\n\n
       <p><strong>Thalenta Ncube</strong></p>`,
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

  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if the user already exists
  const userExits = await User.findOne({ email });

  console.log(userExits.password);
  if (userExits && (await bcrypt.compare(password, userExits.password))) {
    const { id, role } = userExits;
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
