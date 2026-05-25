require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/auth/url", (req, res) => {

  const url =
    oauth2Client.generateAuthUrl({

      access_type: "online",

      response_type: "token",

      scope: [
        "https://www.googleapis.com/auth/gmail.send"
      ]
    });

  res.json({ url });
});

app.post("/send", async (req, res) => {

  try {

    const {
      accessToken,
      to,
      subject,
      message
    } = req.body;

    oauth2Client.setCredentials({
      access_token: accessToken
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client
    });

    const mail = [
      `To: ${to}`,
      "Content-Type: text/html; charset=UTF-8",
      "MIME-Version: 1.0",
      `Subject: ${subject}`,
      "",
      message
    ].join("\n");

    const encodedMail = Buffer
      .from(mail)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMail
      }
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
