import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function App() {
  const [url, setUrl] = useState(window.location.origin);

  const cookie = Cookies.get("token");

  const getToken = async () => {
    window.location.href = `http://localhost:3050/?redirectURL=${url}`;
  };

  const checkToken = async () => {
    const res = await axios.post("http://localhost:3000/valid-token", {
      url: url,
      token: cookie,
    });
    console.log(res.data);
    if (res.data.message !== "token Validated") {
      await getToken();
    }
  };

  useEffect(async () => {
    cookie === undefined ? await getToken() : await checkToken();
  }, []);

  return (
    <>
      <h1>Sso-Consumers </h1>

      <button>TEST</button>
      <button>Change token</button>
    </>
  );
}
