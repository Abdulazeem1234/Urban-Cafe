const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'zubbi216@gmail.com',
    pass: 'pcpf msyb jnby wgrb'
  }
};

// Create transporter
const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: emailConfig.auth
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter configuration error:', error);
  } else {
    console.log('Email transporter is ready to send emails');
    
    // Send test email
    const mailOptions = {
      from: emailConfig.auth.user,
      to: 'zubbi216@gmail.com',
      subject: 'Test Email from Urban-Cafe',
      text: 'This is a test email to verify email functionality.'
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Error sending test email:', err);
      } else {
        console.log('Test email sent successfully:', info.messageId);
      }
    });
  }
});
