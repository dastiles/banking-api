const expressAsyncHandler = require("express-async-handler");
const ProfessionalCpa = require("../models/professionalCpa");
const User = require("../models/authModels");
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
  
const getCpas = expressAsyncHandler(async (req, res) => {
    try {
        let cpa = await ProfessionalCpa.find({ user: req.user.id }).populate('user')
        console.log(cpa)
        res.status(200)
        res.json(cpa)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error(error)
    }
})

const getAllCpas = expressAsyncHandler(async (req, res) => {
    try {
        let cpa = await ProfessionalCpa.find() .populate({
            path: 'user',
            select: '-password' // Exclude the password field
         })
         .sort({ createdAt: -1 });
        console.log(cpa)
        res.status(200)
        res.json(cpa)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error(error)
    }
})


const updateCpas = expressAsyncHandler(async (req, res) => {
    const {name, miles,
        postCodes,
        size,
        website,
        service,
        phone,
        companyName } = req.body
    const cpaId = req.params.id
    console.log(cpaId)
    try {
        await User.findByIdAndUpdate(req.user.id,{name})
        let cpa = await ProfessionalCpa.findByIdAndUpdate(cpaId, {   postCodes,
            size,
            miles,
            website,
            service,
            phone,
            companyName })
        console.log(cpa)
        res.status(200)
        res.json(cpa)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error(error)
    }
})

const verifyCpas = expressAsyncHandler(async (req, res) => {
    const { lisencingState,lisencingRegistration} = req.body
    const cpaId = req.params.id
    try {
        let cpa = await ProfessionalCpa.findByIdAndUpdate(cpaId, { lisencingState, lisencingRegistration, accountStatus: 'INREVIEW' })

        if (cpa) {
            const mailOptions = {
                from: "charlesmadhuku11@gmail.com",
                to: req.user.email,
                subject: "Welcome to Access A CPA",
                text: "Access A CPA",
                html: `<h1>Hi <strong>${req.user.name}</strong></h1>,
                \n\n\n
                <p>This is to inform you that your account with Access A CPA is currently undergoing verification. Once the verification process is complete, you will receive a confirmation email from us.</p>
                \n\n\n
                <p>Thank you for your patience and understanding. If you have any questions or require further assistance, please don't hesitate to contact us at 0771315239</p>
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
        }
        res.status(200)
        res.json({
            message:'success'
        })
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error(error)
    }
})

const uploadCpasProfile = expressAsyncHandler(async (req, res) => {
    const { profileUrlId} = req.body
    const cpaId = req.params.id
    console.log('running astary')
    try {
        let cpa = await ProfessionalCpa.findByIdAndUpdate(cpaId, { profileUrlId })
        res.status(200)
        res.json({
            message:'success'
        })
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error(error)
    }
})

module.exports = {
    getCpas, updateCpas, verifyCpas, uploadCpasProfile,getAllCpas
}