const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'charlesmadhuku11@gmail.com',
    pass: '199711sunday',
  },
});


const sendEmail = () => {
    const mailOptions = {
        from: 'charlesmadhuku11@gmail.com',
        to: 'dastilesforever@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there!</b><br>This is our first message sent with Nodemailer<br/>',
      };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
         throw new Error(error)
        } else {
          console.log('Email sent: ' + info.response);
          return info.response;
        }
      });
}

module.exports = sendEmail;