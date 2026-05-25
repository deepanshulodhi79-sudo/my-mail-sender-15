require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/send", async (req, res) => {

  try {

    const {
      email,
      appPassword,
      to,
      subject,
      message
    } = req.body;

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {
          user: email,
          pass: appPassword
        }
      });

    await transporter.sendMail({

      from: email,

      to,

      subject,

      text: message
    });

    res.json({
      success: true,
      message: "Mail Sent"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Mail Failed"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
