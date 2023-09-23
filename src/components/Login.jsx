import React, { useState } from "react";
// import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../Service/LoginSignupService";
import { useFormik } from "formik";
import { loginSchema } from "../Validation/yupschema";
const Login = () => {
  const navigate = useNavigate();

  const [showIcon, setShowIcon] = useState(false);
  const onSubmit2 = async (values, actions) => {
    let login = await loginUser(values.email, values.password);
    console.log(login);
    if (login.status === 200) {
      toast.success(login.data.message, {
        autoClose: 2000,
      });
      sessionStorage.setItem("email",values.email)
      sessionStorage.setItem("token",login.data.token)
      setTimeout(() => {
        actions.resetForm();
        navigate("/home");
      }, 3000);
    } else {
      toast.error(login.data.message, {
        autoClose: 2000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: onSubmit2,
  });

  return (
    <div className="main">

    <div className="form-container">
      <h2>Login</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="form login"
        autoComplete="off"
      >
        <label>Email</label>
        <input
          type="text"
          className="login__input"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="error">{formik.errors.email}</div>
        )}
        <label>Password</label>
        <input
          type={showIcon ? "text" : "password"}
          className="login__input"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        <button
          className="button login__submit"
          disabled={formik.isSubmitting}
          type="submit"
        >
          Login
        </button>
        <p>
          New to JChat?<Link to="/signup">Signup</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Login;