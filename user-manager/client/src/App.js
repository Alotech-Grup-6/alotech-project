import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function App() {
  const [url, setUrl] = useState(window.location.origin);
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = Cookies.get("token");

  const getToken = async () => {
    window.location.href = `http://localhost:3050/?redirectURL=${url}`;
  };

  const checkToken = async () => {
    const res = await axios.post("http://localhost:3000/valid-token", {
      url: url,
      token: cookie,
    });
    res.data.type === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    if (res.data.message !== "token Validated") {
      await getToken();
    }
  };

  return (
  <>
  <h1>User Manager</h1>
  </>
  )
}
