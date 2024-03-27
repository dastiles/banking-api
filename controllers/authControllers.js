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
      <pCongratulations on joining Access A CPA! We're excited to help you grow your business by connecting you with high-quality Accounting leads.</p>
      \n\n\n
      <p>Here's how Access A CPA can benefit you:</p>
      \n\n\n
      <ul>
      <li><strong>Free Leads:</strong> Get leads sent to you at no cost.</li>
      <li><strong>Pay for Results:</strong> Only pay for the leads you choose to contact.</li>
      <li><strong>Verified Contact Details:</strong> Customer contact details are verified for you, saving you time and effort.</li> 
      </ul>
      \n\n\n
      <p>If you have any questions or need assistance, please don't hesitate to reply to this email or give us a call at 6305444869. Our team is here to support you in every way possible.</p>
      \n\n\n
      <p>To get started, simply click <a href="https://accessacpa.vercel.app/">Here</a> to explore our services and find the perfect leads for you.</p>
      <p>Thank you for choosing Access A CPA. We're committed to helping you succeed and achieve your business goals.</p>
      \n\n\n
      <p>Best regards,</p>
      \n\n\n
      <p><strong>Thalenta Ncube</strong></p>
      \n\n\n
      <p>Access A CPA Team</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log("Email sent: " + info.response);
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
    name,
    summary,
    phone,
    issue,
    password,
    requirements,
    deadline,
    contact,
    issueArray,
  } = req.body;
  if (
    !name ||
    !email ||
    !summary ||
    !issue ||
    !issueArray ||
    !contact ||
    !requirements ||
    !password
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExits = await User.findOne({ email });
  if (userExits) {
    const { userId } = userExits;
    await User.findByIdAndUpdate(userId, { role: false });
    const newUser = await User.findOne({ email });
    const { id, role } = newUser;
    const leads = await Leads.create({
      user: id,
      summary,
      issue,
      requirements,
      deadline,
      contact,
      issues: issueArray,
    });

    console.log(leads);
    const mailOptions = {
      from: "charlesmadhuku11@gmail.com",
      to: email,
      subject:
        "Welcome to Access A CPA - Your Source for High-Quality Accountants!",
      text: "Welcome to Access A CPA",
      html: `<h1>Hi <strong>${name}</strong></h1>,
       \n\n\n
      <p>We're thrilled to welcome you to Access A CPA, where we specialize in connecting you with top-notch Accountants who can meet your needs.</p> 
      \n\n\n
      <p>Whether you're looking for expert advice on tax planning, financial reporting, or any other accounting-related services, we've got you covered.</p>
      \n\n\n
      <p>If you have any questions or need assistance, please don't hesitate to reply to this email or give us a call at 0771315239. Our team is here to help you every step of the way.</p>
      \n\n\n
      <p>To get started, simply click <a href="https://accessacpa.vercel.app/">Here</a> to explore our services and find the perfect Accountant for you.</p>
      \n\n\n
      <p>Thank you for choosing Access A CPA. We look forward to assisting you with all your accounting needs</p>
      \n\n\n
      <p>Best Regards</p>
      \n\n\n
      <p>Thalenta Ncube</p>
      \n\n\n
      <p>Access A CPA Team</p>
      `,
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
    // harsh the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name: name,
      role: false,
      email,
      phone,
      password: hashedPassword,
    });
    if (user) {
      const { id, role } = user;
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
        to: email,
        subject:
          "Welcome to Access A CPA - Your Source for High-Quality Accountants!",
        text: "Welcome to Access A CPA",
        html: `<h1>Hi <strong>${name}</strong></h1>,
         \n\n\n
        <p>We're thrilled to welcome you to Access A CPA, where we specialize in connecting you with top-notch Accountants who can meet your needs.</p> 
        \n\n\n
        <p>Whether you're looking for expert advice on tax planning, financial reporting, or any other accounting-related services, we've got you covered.</p>
        \n\n\n
        <p>If you have any questions or need assistance, please don't hesitate to reply to this email or give us a call at 0771315239. Our team is here to help you every step of the way.</p>
        \n\n\n
        <p>To get started, simply click <a href="https://accessacpa.vercel.app/">Here</a> to explore our services and find the perfect Accountant for you.</p>
        \n\n\n
        <p>Thank you for choosing Access A CPA. We look forward to assisting you with all your accounting needs</p>
        \n\n\n
        <p>Best Regards</p>
        \n\n\n
        <p>Thalenta Ncube</p>
        \n\n\n
        <p>Access A CPA Team</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(201).json({
        id,
        role,
        token: generateToken(id, role),
      });
    } else {
      res.status(500);
      throw new Error("Please add all fields");
    }
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password ,role} = req.body;

  console.log(req.body)
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if the user already exists
  const userExits = await User.findOne({ email,role });

  console.log(userExits);
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
