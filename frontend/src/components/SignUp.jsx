import { useState } from "react";
import "../style/addtask.css";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate();
  const handleSignup = async () => {
    const response = await fetch("http://localhost:3200/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("login", userData.email);
      window.dispatchEvent(new Event("localStorage-change"));
      navigate("/");
    } else {
      alert('try after sometime');
    }
  }
  return (
    <div className="container">
      <h1>SignUp</h1>

      <label>Name</label>
      <input
        onChange={(event) =>
          setUserData({
            ...userData,
            name: event.target.value,
          })
        }
        type="text"
        name="name"
        placeholder="Enter user name"
      />

      <label>Email</label>
      <input
        onChange={(event) =>
          setUserData({
            ...userData,
            email: event.target.value,
          })
        }
        type="email"
        name="email"
        placeholder="Enter user email"
      />

      <label>Password</label>
      <input
        onChange={(event) =>
          setUserData({
            ...userData,
            password: event.target.value,
          })
        }
        type="password"
        name="password"
        placeholder="Enter user password"
      />

      <button onClick={handleSignup} className="submit">
        Sign Up
      </button>

      <Link className="link" to="/login">
        Login
      </Link>
    </div>
  );
}

export default SignUp;