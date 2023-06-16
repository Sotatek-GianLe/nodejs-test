import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail, isMobilePhone } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vfirstname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The firstname must be between 3 and 20 characters.
      </div>
    );
  }
};

const vlastname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The lastname must be between 2 and 20 characters.
      </div>
    );
  }
};

const vphone = (value) => {
  if (!isMobilePhone(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        The phone invalid!.
      </div>
    );
  }
};

const vbanknumber = (value) => {
  if (value.length < 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The lastname must be less than 10 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [token_payment, setBankNumber] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };

  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeBankNumber = (e) => {
    const token_payment = e.target.value;
    setBankNumber(token_payment);
  };

  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const dataRegister = {
        username: username,
        email: email,
        first_name: firstname,
        last_name: lastname,
        phone: phone,
        password: password,
        token_payment: token_payment,
        role: role,
        is_active: 1,
      };
      dispatch(register(dataRegister))
        .then(() => {
          setSuccessful(true);
          navigate("/login");
          window.location.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeFirstname}
                  validations={[required, vfirstname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeLastname}
                  validations={[required, vlastname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={onChangePhone}
                  validations={[required, vphone]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="token_payment">Bank Number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="token_payment"
                  value={token_payment}
                  onChange={onChangeBankNumber}
                  validations={[required, vbanknumber]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <Select
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={onChangeRole}
                  validations={[required]}
                >
                  <option value="">Choose Role</option>
                  <option value="1">Client</option>
                  <option value="2">Admin</option>
                </Select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
