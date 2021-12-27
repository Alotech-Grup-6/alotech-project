import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import sha256 from "js-sha256";
import Cookies from "js-cookie";


export default function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirectURL, setRedirectURL] = useState("");
  const [urls, setUrls] = useState([]);
  const [params, setParams] = useState(false);

  const cookie = Cookies.get("token");

  const checkToken = async () => {
    if (redirectURL !== undefined) {
      console.log(redirectURL);
      try {
        const res = await axios.post("http://localhost:3000/valid-token", {
          url: redirectURL,
          token: cookie,
        });
        console.log(res.data);
        if (res.data.message === "token Validated") {
          await goToBack();
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const getParams = async () => {
    setRedirectURL(window.location.search.split("?")[1].split("=")[1]);
    urls.includes(redirectURL) ? setParams(true) : setParams(false);
  };

  const getUrl = async () => {
    const res = await axios.get("http://localhost:3000/urls");
    const url = res.data.urls;
    setUrls(url.map((i) => i.url));
  };

  const goToBack = async () => {
    window.location.href = redirectURL;
  };

  useEffect(async () => {
    await getParams();
    cookie !== undefined && checkToken();
  });

  useEffect(() => {
    getUrl();
  }, []);

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          username: userName,
          user_password: password,
        },
        {
          params: {
            redirectURL: redirectURL,
          },
        }
      );
      console.log(res.data.ttl);
      Cookies.set("token", res.data.token, { secure: true });
      goToBack();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="App">
      {params && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-group-pass">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="butt">
            <button className="button">LOGIN</button>
          </div>
        </form>
      )}

      {!params && <h1>YOU CANT SEE THİS PAGE</h1>}
    </div>
  );
}
