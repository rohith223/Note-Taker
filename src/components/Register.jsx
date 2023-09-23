import React, { useState } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { sign_upSchema } from "../Validation/yupschema";
import { signupUser } from "../Service/LoginSignupService";
const Signup = () => {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false);
  const [showIcon1, setShowIcon1] = useState(false);

  const onSubmit = async (values, actions) => {
    console.log(values);

    let signup = await signupUser(values);
    console.log("signup");
    if (signup.status === 200) {
      toast.success(signup.data.message, {
        autoClose: 2000,
      });
      setTimeout(() => {
        actions.resetForm();
        navigate("/");
      }, 3000);
    } else {
      console.log(signup);
      toast.error(signup.data.message, {
        autoClose: 2000,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      fName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: sign_upSchema,
    onSubmit: onSubmit,
  });
  return (
    <div className="main">
    <div className="form-container">
      <h2>Sign Up</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="form  Signup"
        autoComplete="off"
      >
        <label>Full Name </label>
        <input
          type="text"
          className="signup__input"
          id="fName"
          value={formik.values.fName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Full Name"
        />
        {formik.errors.fName && formik.touched.fName && (
          <div className="error">{formik.errors.fName}</div>
        )}{" "}
        
        <label>Email</label>
        <input
          type="text"
          className="signup__input"
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
          className="signup__input"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="error password-error">{formik.errors.password}</div>
        )}
        <label>Confirm Password</label>
        <input
          type={showIcon1 ? "text" : "password"}
          className="signup__input"
          id="cPassword"
          value={formik.values.cPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirm Password"
        />
        {formik.errors.cPassword && formik.touched.cPassword && (
          <div className="error">{formik.errors.cPassword}</div>
        )}
        <button
          className="button signup__submit"
          disabled={formik.isSubmitting}
          type="submit"
        >
          Sign Up
        </button>
        <p>
          Already have an account?<Link to="/">Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Signup;