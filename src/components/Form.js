import React, { useRef, useState } from "react";

import useInput from "./hooks/use-input";

import "./Form.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const Form = (props) => {
  const {
    value: EnteredEmail,
    isValid: EmailIsValid,
    hasError: EmailError,
    valueChangeHandler: EmailChangeHandler,
    valueBlurHandler: EmailBlurHandler,
    reset: EmailReset,
  } = useInput(isEmail);

  const {
    value: EnteredName,
    isValid: NameIsValid,
    hasError: NameError,
    valueChangeHandler: NameChangeHandler,
    valueBlurHandler: NameBlurHandler,
    reset: NameReset,
  } = useInput(isNotEmpty);

  const {
    value: EnteredPassword,
    isValid: PasswordIsValid,
    hasError: PasswordError,
    valueChangeHandler: PasswordChangeHandler,
    valueBlurHandler: PasswordBlurHandler,
    reset: PasswordReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (EmailIsValid && NameIsValid && PasswordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    alert("Success Registration");

    EmailReset();
    NameReset();
    PasswordReset();
  };

  const emailInputClasses = EmailError ? "control invalid" : "control";
  const nameInputClasses = NameError ? "control invalid" : "control";
  const passwordInputClasses = PasswordError ? "control invalid" : "control";

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={EmailChangeHandler}
          onBlur={EmailBlurHandler}
          value={EnteredEmail}
        />
        {EmailError && (
          <div>
            <p className="error-text">Email must have @ in value!</p>
          </div>
        )}
      </div>

      <div className={nameInputClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={NameChangeHandler}
          onBlur={NameBlurHandler}
          value={EnteredName}
        />
        {NameError && <p className="error-text">Can't be empty</p>}
      </div>

      <div className={passwordInputClasses}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="***"
          id="password"
          onChange={PasswordChangeHandler}
          onBlur={PasswordBlurHandler}
          value={EnteredPassword}
        />
        {PasswordError && <p className="error-text">Can't be empty</p>}
      </div>

      <div className="actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default Form;
