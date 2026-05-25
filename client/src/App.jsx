import { useState } from "react";
import axios from "axios";

const API =
 "https://my-mail-sender-15.onrender.com";

function App() {

  const [email, setEmail] =
    useState("");

  const [appPassword,
    setAppPassword] =
    useState("");

  const [to, setTo] =
    useState("");

  const [subject,
    setSubject] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const sendMail = async () => {

    try {

      await axios.post(
        `${API}/send`,
        {
          email,
          appPassword,
          to,
          subject,
          message
        }
      );

      alert("Mail Sent");

    } catch (err) {

      console.log(err);

      alert("Mail Failed");
    }
  };

  return (

    <div className="container">

      <h1>Mail Sender</h1>

      <input
        type="email"
        placeholder="Your Gmail"
        onChange={(e)=>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="App Password"
        onChange={(e)=>
          setAppPassword(
            e.target.value
          )
        }
      />

      <textarea
        placeholder={
`Client Emails
(one per line)`
        }

        onChange={(e)=>
          setTo(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Subject"

        onChange={(e)=>
          setSubject(
            e.target.value
          )
        }
      />

      <textarea
        placeholder="Message"

        onChange={(e)=>
          setMessage(
            e.target.value
          )
        }
      />

      <button onClick={sendMail}>
        Send Email
      </button>

    </div>
  );
}

export default App;
