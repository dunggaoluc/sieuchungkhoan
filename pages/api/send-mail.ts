const nodemailer = require("nodemailer");

export default function handler(req: any, res: any) {
  const message = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: process.env.GMAIL_TO,
    subject: req.body.subject,
    html: `<p>${req.body.html}</p>`,
  };

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  if (req.method === "POST") {
    console.time();
    transporter.sendMail(message, (err: any, info: any) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err.address}`,
        });
      } else {
        res.status(250).json({
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });
    console.timeEnd();
  }
}