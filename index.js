const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true, // use true only if port 465
  auth: {
    user: "9816d1002@smtp-brevo.com", // usually your Brevo email or API key
    pass: "MthWjqCz76OG2R5y", // SMTP key from Brevo
  },
  tls: {
    rejectUnauthorized: false, // <-- ignore self-signed cert errors
  },
});

async function sendEmail() {
  try {
    let info = await transporter.sendMail({
      from: "info@ekalavya.co.in",
      to: "u.pardhi@gmail.com",
      subject: "Hello from Brevo SMTP",
      text: "Test email via Brevo SMTPxcvxcvxcvxcvxcvxcvxcv",
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

sendEmail();
