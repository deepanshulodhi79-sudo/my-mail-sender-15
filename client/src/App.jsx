import { useEffect, useState } from "react";
import axios from "axios";

const API =
 "https://my-mail-sender-15.onrender.com";

function App() {

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {

    const hash = window.location.hash;

    if (hash) {

      const params =
        new URLSearchParams(
          hash.substring(1)
        );

      const token =
        params.get("access_token");

      if (token) {

        localStorage.setItem(
          "token",
          token
        );

        alert("Login Success");
      }
    }

  }, []);

  const login = async () => {

    const res = await axios.get(
      `${API}/auth/url`
    );

    window.location.href =
      res.data.url;
  };

  const sendMail = async () => {

    try {

      const accessToken =
        localStorage.getItem("token");

      if (!accessToken) {

        alert("Login First");

        return;
      }

      await axios.post(
        `${API}/send`,
        {
          accessToken,
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

      <button onClick={login}>
        Login With Google
      </button>

      <input
        type="email"
        placeholder="Client Email"
        onChange={(e)=>
          setTo(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Subject"
        onChange={(e)=>
          setSubject(e.target.value)
        }
      />

      <textarea
        placeholder="Message"
        onChange={(e)=>
          setMessage(e.target.value)
        }
      />

      <button onClick={sendMail}>
        Send Email
      </button>

    </div>
  );
}

export default App;
