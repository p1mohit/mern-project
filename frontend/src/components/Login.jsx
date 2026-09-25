import { useState } from "react";
import "../style/addtask.css";
import { Link,useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await fetch("http://localhost:3200/login", {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (result.success) {
     localStorage.setItem("token", result.token);
     localStorage.setItem("login", userData.email);
      window.dispatchEvent(new Event('localStorage-change'))
      navigate("/");
    } else {
      alert("Try after sometime");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        onChange={(event) =>
          setUserData({
            ...userData,
            email: event.target.value,
          })
        }
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Enter user email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={(event) =>
          setUserData({
            ...userData,
            password: event.target.value,
          })
        }
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Enter user password"
      />

      <button onClick={handleLogin} className="submit">
        Login
      </button>

      <Link className="link" to="/signup">
        Sign Up
      </Link>
    </div>
  );
}

export default Login;
