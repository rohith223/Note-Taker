import axios from "axios";
import { env } from "../env";
import bcrypt from "bcryptjs";

export const loginUser = async (email, password) => {
  const response = await axios
    .post(`${env.REACT_APP_API}/users/login`, {
      email,
      password,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const signupUser = async (values) => {
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(values.password, salt);
  let response = await axios
    .post(`${env.REACT_APP_API}/users/signup`, {
      fullName: values.fName,
      email: values.email.toLowerCase(),
      password: encryptPassword,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
