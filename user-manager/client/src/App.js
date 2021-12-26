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

  const getUserList = async () => {
    const res = await axios.get("http://localhost:3100/get-users", {
      headers: {
        Authorization: "Bearer " + cookie,
      },
    });
    if (res.data.message === "invalid token") {
      getToken();
    } else {
      console.log(res.data.result);
    }
  };

  const getUser = async () => {
    const res = await axios.get("http://localhost:3100/get-user", {
      headers: {
        Authorization: "Bearer " + cookie,
      },
      params: {
        user_id: 64,
      },
    });
    if (res.data.message === "invalid token") {
      getToken();
    } else {
      console.log(res.data.result);
    }
  };

  const delUser = async () => {
    const res = await axios.delete("http://localhost:3100/delete", {
      headers: {
        Authorization: "Bearer " + cookie,
      },
      data: {
        user_id: 63,
      },
    });
    if (res.data.message === "invalid token") {
      getToken();
    } else {
      console.log(res.data);
    }
  };

  const createUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3100/create",
        {
          username: "test",
          user_name: "test",
          user_surname: "test",
          user_password: "test",
          user_email: "test@test.com",
          user_type: "admin",
        },
        {
          headers: {
            Authorization: "Bearer " + cookie,
          },
        }
      );
      if (res.data.message === "invalid token") {
        getToken();
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
  <>
  <h1>User Manager</h1>
  </>
  )
}
