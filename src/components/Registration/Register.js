import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Logo from "../../assets/audiophile.svg";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../app-redux/features/User";
import { LoadingButton } from "@mui/lab";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      background: 500,
    },
    margin: {
      margin: theme.spacing(0),
    },
  })
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#d87d4a",
    },
  },
});

const controller = new AbortController();

function Register() {
  const classes = useStyles();
  const [userLogin, setUserLogin] = useState({
    lg_email: "ashakur@gmail.com",
    lg_password: "testing@12345",
  });
  const [userRegister, setUserRegister] = useState({
    rg_name: "",
    rg_email: "",
    rg_password: "",
  });

  const user = useSelector((state) => state.user.user);

  const [state, setState] = useState(true);
  const [rg_show, setRgShow] = useState(false);
  const [lg_show, setLgShow] = useState(false);
  const [lg_loading, setLgLoading] = useState(false);
  const [rg_loading, setRgLoading] = useState(false);

  const isProduction = process.env.NODE_ENV === "production";

  const dispatch = useDispatch();

  const toastifyError = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      closeButton: true,
    });
  };

  const toastifyInfo = (
    info,
    func = () => { },
    autoClose = 3000,
    position = "top-center"
  ) => {
    toast.info(info, {
      position: position,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: func,
    });
  };

  const handleLogin = (name) => (e) => {
    setUserLogin({ ...userLogin, [name]: e.target.value });
  };

  const handleRegister = (name) => (e) => {
    setUserRegister({ ...userRegister, [name]: e.target.value });
  };

  const { lg_email, lg_password } = userLogin;
  const { rg_name, rg_email, rg_password } = userRegister;

  const handleSubmitLogin = (e) => {
    e?.preventDefault();
    setLgLoading(true);
    // axios
    //   .post("/user/login", userLogin)
    //   .then(({ data }) => {
      const data = { name: "Ashakur", email: "ashakur.js24@gmail.com", token: "ey" }
      sessionStorage.setItem("token", data.token);
    toastifyInfo(`Welcome ${data.name}!`);
    setLgLoading(false);
    dispatch(loadUser(data));
    // })
    // .catch(({ response }) => {
    // });
  };

  const handleSubmitRegister = (e) => {
    e?.preventDefault();
    setRgLoading(true);

    axios
      .post("/user/register", userRegister)
      .then((response) => {
        const data = response.data;
        setRgLoading(false);
        sessionStorage.setItem("token", data.token);
        toastifyInfo(`Welcome ${data.name}!`);
        dispatch(loadUser(data));
      })
      .catch((error) => {
        setRgLoading(false);
        toastifyError(error.response?.data);
      });
  };

  const navigate = () =>
  (window.location.href = isProduction
    ? "https://audiophile-e-commerce.herokuapp.com/auth/google"
    : "http://localhost:5010/auth/google");

  return (
    <div className="register">
      <header>
        <div className="container">
          <img src={Logo} alt="" />
          <h6>Powered by Audiophile</h6>
        </div>
      </header>
      <ThemeProvider theme={theme}>
        <div className="register-body">
          <div className="container">
            {state ? (
              <form onSubmit={handleSubmitLogin}>
                <h1>Login</h1>
                <TextField
                  className={`${classes} a`}
                  label="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input-email"
                  type="email"
                  required
                  onChange={handleLogin("lg_email")}
                  value={lg_email}
                />
                <TextField
                  className={`${classes} a`}
                  label="Password"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input-password"
                  type={lg_show ? "text" : "password"}
                  required
                  onChange={handleLogin("lg_password")}
                  value={lg_password}
                />

                <div className="checkbox">
                  <input type="checkbox" onChange={() => setLgShow(!lg_show)} />
                  <label>{lg_show ? "Hide" : "Show"} password</label>
                </div>

                <p>
                  Don't have an account?{" "}
                  <em onClick={() => setState(false)}>Register here</em>
                </p>

                <LoadingButton
                  type="submit"
                  loading={lg_loading}
                  variant="outlined"
                >
                  Login
                </LoadingButton>

              </form>
            ) : (
              <form onSubmit={handleSubmitRegister}>
                <h1>Register</h1>
                <TextField
                  className={`${classes} a`}
                  label="Name"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type="text"
                  required
                  onChange={handleRegister("rg_name")}
                  value={rg_name}
                />
                <TextField
                  className={`${classes} a`}
                  label="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type="email"
                  required
                  onChange={handleRegister("rg_email")}
                  value={rg_email}
                />
                <TextField
                  className={`${classes} a`}
                  label="Password"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  type={rg_show ? "text" : "password"}
                  required
                  error={false}
                  onChange={handleRegister("rg_password")}
                  value={rg_password}
                />

                <div className="checkbox">
                  <input type="checkbox" onChange={() => setRgShow(!rg_show)} />
                  <label>{rg_show ? "Hide" : "Show"} password</label>
                </div>
                <p>
                  Already have an account?
                  <em onClick={() => setState(true)}> Login here</em>
                </p>

                <LoadingButton
                  loading={rg_loading}
                  variant="outlined"
                  type="submit"
                >
                  Register
                </LoadingButton>


              </form>
            )}
          </div>
        </div>
      </ThemeProvider>
      <Navigate to={user ? "/" : "/register"} />
    </div>
  );
}

export default Register;
