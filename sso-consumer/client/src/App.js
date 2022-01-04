import "./App.css";
import "./components/UserInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserInfo from "./components/UserInfo";

export default function App() {
  const [url, setUrl] = useState(window.location.origin);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState();
  const [userId, setUserId] = useState();

  const cookie = Cookies.get("token");

  // Get user info 
  const getUser = async () => {
    try {
      if (userId !== undefined) {
        const res = await axios.get("http://localhost:3100/get-user", {
          headers: {
            Authorization: "Bearer " + cookie,
          },
          params: {
            user_id: userId,
          },
        });
        console.log(res);
        if (res.data.message === "invalid token") {
          getToken();
        }
        {
          const data = res.data.result[0];
          setUserName(data.user_name);
          setUserSurname(data.user_surname);
          setUserEmail(data.user_email);
          setUserType(data.user_type);
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
    // go to login page if token is not existing
  const getToken = async () => {
    window.location.href = `http://localhost:3050/?redirectURL=${url}`;
  };
  // Check token if token is existing
  const checkToken = async () => {
    try {
      const res = await axios.post("http://localhost:3000/valid-token", {
        url: url,
        token: cookie,
      });

      if (res.data.message !== "token Validated") {
        await getToken();
      } else {
        setUserId(res.data.user_id);
        getUser();
      }
    } catch (error) {
      alert(error.response.data.message);
      getToken();
    }
  };

  useEffect(async () => {
    cookie === undefined ? await getToken() : await checkToken();
  }, [userId]);

  return (
    <div className="App">
      <UserInfo
        userName={userName}
        userSurname={userSurname}
        userType={userType}
        userEmail={userEmail}
      />
    </div>
  );
}
