import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import GoogleAuth from "../GoogleAuth";
import "../../assets/css/user.css";

const Login = ({ setUserName }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://localhost:44396/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    //localStorage.setItem("user", "testing");
    // .then((user) => {
    //     localStorage.setItem("user", JSON.stringify(user));

    //console.log(response.headers.get('set-cookie'));
    const username = response.json();

    setRedirect(true);
    setUserName(username.name);

    //history.push("/")
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUser({ ...user, [name]: value });
  };

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <div className="form-floating">
          <h1 className="h3 mb-3 fw-normal">Sign In with google</h1>
        </div>
      </form>
    </main>
  );
};

export default Login;
