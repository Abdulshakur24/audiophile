import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Logo from "../../assets/audiophile.svg";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../app-redux/features/User";
import { LoadingButton } from "@mui/lab";
import { Redirect } from "react-router-dom";
import { errorStatus } from "../../handleErrors/requests";
import { toast } from "react-toastify";

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d87d4a",
    },
  },
});

function Register() {
  const classes = useStyles();
  const [userLogin, setUserLogin] = useState({
    lg_email: "",
    lg_password: "",
  });
  const [userRegister, setUserRegister] = useState({
    rg_name: "",
    rg_email: "",
    rg_password: "",
  });
  const [state, setState] = useState(true);
  const [rg_show, setRgShow] = useState(false);
  const [lg_show, setLgShow] = useState(false);
  const [lg_loading, setLgLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const [rg_error, setRgError] = useState("");
  const [lg_error, setLgError] = useState("");
  const [rg_loading, setRgLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      const id = sessionStorage.getItem("id");
      axios
        .post("/token", { id }, { method: "POST" })
        .then((response) => {
          const data = response.data;
          sessionStorage.setItem("token", data?.token);
          toastifyInfo(`Welcome back ${data.name}!`);
          dispatch(loadUser(data));
        })
        .catch((error) => {
          if (typeof error.response.data === "string")
            return toastifyError(error.response.data);
          toastifyError(errorStatus(error));
        });
    }
    return;
  }, [dispatch]);

  const toastifyError = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
    });
  };

  const toastifyInfo = (info) => {
    toast.info(info, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
    });
  };

  const handleLogin = (name) => (e) => {
    setLgError("");
    setUserLogin({ ...userLogin, [name]: e.target.value });
  };
  const handleRegister = (name) => (e) => {
    setRgError("");
    setUserRegister({ ...userRegister, [name]: e.target.value });
  };
  const { lg_email, lg_password } = userLogin;
  const { rg_name, rg_email, rg_password } = userRegister;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLgLoading(true);
    axios
      .post("/user/login", userLogin)
      .then((response) => {
        const data = response.data;
        setLgLoading(false);

        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("token", data.token);
        toastifyInfo(`Welcome ${data.name}!`);
        dispatch(loadUser(data));
      })
      .catch((error) => {
        setLgLoading(false);
        toastifyError(errorStatus(error));
      });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setRgLoading(true);
    axios
      .post("/user/register", userRegister)
      .then((response) => {
        const data = response.data;
        setRgLoading(false);
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("token", data.token);
        toastifyInfo(`Welcome ${data.name}!`);
        dispatch(loadUser(data));
      })
      .catch((error) => {
        setRgLoading(false);
        toastifyError(errorStatus(error));
      });
  };

  return (
    <div className="register">
      <header>
        <div className="container">
          <img src={Logo} alt="" />
          <h6>Powered by Audiophile</h6>
        </div>
      </header>
      <ThemeProvider theme={theme}>
        <div className="body">
          <div>
            {state ? (
              <div
                className={`error-display ${lg_error ? "slideIn" : "slideOut"}`}
              >
                <p className="error">{lg_error}</p>
              </div>
            ) : (
              <div
                className={`error-display ${rg_error ? "slideIn" : "slideOut"}`}
              >
                <p className="error">{rg_error}</p>
              </div>
            )}
            <div className="container">
              <h1>{state ? "Login" : "Register"}</h1>
              {state ? (
                <form onSubmit={handleSubmitLogin}>
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
                    <input
                      type="checkbox"
                      onChange={() => setLgShow(!lg_show)}
                    />
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
                    <input
                      type="checkbox"
                      onChange={() => setRgShow(!rg_show)}
                    />
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
        </div>
      </ThemeProvider>
      <Redirect to={user ? "/" : "/register"} />
    </div>
  );
}

export default Register;
