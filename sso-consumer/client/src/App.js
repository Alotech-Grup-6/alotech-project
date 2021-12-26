import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function App() {
  const [url, setUrl] = useState(window.location.origin);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userType, setUserType] = useState("");

  const cookie = Cookies.get("token");

  const getUser = async () => {
    const res = await axios.get("http://localhost:3100/get-user", {
      headers: {
        Authorization: "Bearer " + cookie,
      },
      params: {
        user_id: 98,
      },
    });
    if (res.data.message === "invalid token") {
      getToken();
    } else {
      const data = res.data.result[0];
      setUserName(data.user_name);
      setUserSurname(data.user_surname);
      setUserType(data.user_type);
    }
  };

  const getToken = async () => {
    window.location.href = `http://localhost:3050/?redirectURL=${url}`;
  };

  const checkToken = async () => {
    const res = await axios.post("http://localhost:3000/valid-token", {
      url: url,
      token: cookie,
    });

    if (res.data.message !== "token Validated") {
      await getToken();
    } else {
      getUser();
    }
  };

  useEffect(async () => {
    cookie === undefined ? await getToken() : await checkToken();
  });

  return (
    <>
      <h1>Sso-Consumers </h1>

      <button>TEST</button>
      <button>Change token</button>
    </>
  );
}
