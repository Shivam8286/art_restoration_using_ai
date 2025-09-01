const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // Use different configurations based on environment
  if (process.env.NODE_ENV === 'production') {
    // Production email configuration (e.g., SendGrid, AWS SES)
    return nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Development email configuration
    return nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
};

// Send email function
const sendEmail = async ({ email, subject, message, attachments = [] }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'AI Art Restoration',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER
      },
      to: email,
      subject: subject,
      html: message,
      attachments: attachments
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send bulk email function
const sendBulkEmail = async (emails, subject, message) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'AI Art Restoration',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER
      },
      to: emails.join(', '),
      subject: subject,
      html: message
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Bulk email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Bulk email sending failed:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to AI Art Restoration!',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ed7514;">Welcome to AI Art Restoration!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for joining our community of art restoration enthusiasts. We're excited to help you restore your precious artworks using cutting-edge AI technology.</p>
        <p>Here's what you can do with your account:</p>
        <ul>
          <li>Submit restoration requests</li>
          <li>Track your restoration progress</li>
          <li>View our portfolio of completed works</li>
          <li>Connect with our team of expert artists</li>
        </ul>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br>AI Art Restoration Team</p>
      </div>
    `
  }),

  restorationStarted: (name, title) => ({
    subject: 'Your Restoration Project Has Started!',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ed7514;">Restoration Project Started</h2>
        <p>Dear ${name},</p>
        <p>Great news! We've started working on your restoration project: <strong>${title}</strong></p>
        <p>Our team of expert artists and AI specialists are now analyzing your artwork and developing the best restoration strategy.</p>
        <p>You can track the progress of your restoration by logging into your account.</p>
        <p>We'll keep you updated throughout the process.</p>
        <p>Best regards,<br>AI Art Restoration Team</p>
      </div>
    `
  }),

  restorationCompleted: (name, title) => ({
    subject: 'Your Restoration Project is Complete!',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ed7514;">Restoration Project Complete!</h2>
        <p>Dear ${name},</p>
        <p>Excellent news! Your restoration project <strong>${title}</strong> has been completed successfully!</p>
        <p>Our team has worked meticulously to restore your artwork to its original glory using advanced AI technology and traditional restoration techniques.</p>
        <p>You can now view the results in your account and download the high-resolution restored image.</p>
        <p>Thank you for trusting us with your precious artwork.</p>
        <p>Best regards,<br>AI Art Restoration Team</p>
      </div>
    `
  }),

  passwordReset: (name, resetLink) => ({
    subject: 'Password Reset Request - AI Art Restoration',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ed7514;">Password Reset Request</h2>
        <p>Dear ${name},</p>
        <p>You requested a password reset for your AI Art Restoration account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #ed7514; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>This link will expire in 10 minutes for security reasons.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>AI Art Restoration Team</p>
      </div>
    `
  }),

  contactConfirmation: (name, subject) => ({
    subject: 'Thank you for contacting AI Art Restoration',
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ed7514;">Thank you for your message!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry regarding: <strong>${subject}</strong></p>
        <p>Our team will review your message and get back to you within 24-48 hours.</p>
        <p>If you have any urgent questions, please don't hesitate to call us.</p>
        <p>Best regards,<br>AI Art Restoration Team</p>
      </div>
    `
  })
};

// Send templated email
const sendTemplatedEmail = async (email, templateName, data) => {
  try {
    const template = emailTemplates[templateName];
    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    const { subject, message } = typeof template === 'function' ? template(data) : template;
    
    return await sendEmail({
      email,
      subject,
      message
    });
  } catch (error) {
    console.error('Templated email sending failed:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration is invalid:', error.message);
    return false;
  }
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  sendTemplatedEmail,
  emailTemplates,
  testEmailConfig
};
