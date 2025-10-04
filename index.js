const http = require("http");
const nodemailer = require("nodemailer");

// Hardcoded SMTP credentials
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: "9816d1002@smtp-brevo.com", // SMTP username
    pass: "MthWjqCz76OG2R5y", // SMTP password/API key
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: "info@ekalavya.co.in",
      to: to,
      subject: subject,
      text: text,
    });

    console.log("✅ Message sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return { success: false, error: err.message };
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/send") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const result = await sendEmail(data.to, data.subject, data.text);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

// Listen on all IPs
const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
