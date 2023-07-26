const nodemailer = require('nodemailer');
const crypto = require('crypto');

const { host, port, user, pass } = require('../config/smtp');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
});

// Function to send the email
const sendEmail = (to, subject, htmlContent) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: "Cannys Clone <verifycode@edgeconf.ir>",
            to,
            subject,
            html: htmlContent,
        }, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

const generateVerificationCode = () => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase()
  return code;
}

const sendVerifyCode = (req, res) => {
    const { email } = req.body;
    const subject = 'Verification Code';
    const code = generateVerificationCode();

    const htmlContent = `
    <h1>Hello!</h1>
    <h2>Your verification code is: ${code}</h2>
    <img src="https://articleabode.com/wp-content/uploads/2022/08/3-Best-Canny.io-alternatives-to-Try-right-now-1.png" style="width: 19rem" />
    `;

    try {
        sendEmail(email, subject, htmlContent);
        res.json({ message: 'Verification code sent successfully', verificationCode: code });
    } catch (error) {
        handleErrorResponse(res, error);
    }
}


// Function to handle error responses
const handleErrorResponse = (res, error) => {
    res.status(500).json({ message: error.message });
}

module.exports = {
    sendVerifyCode
}
