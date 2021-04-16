import React, { useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        ...state,
        email: action.val,
        isEmailValid: action.val.includes("@"),
      };
    case "EMAIL_CHECK":
      return { ...state, isEmailValid: state.email.includes("@") };
    case "PWD_INPUT":
      return {
        ...state,
        pwd: action.val,
        isPwdValid: action.val.trim().length > 6,
      };
    case "PWD_CHECK":
      return { ...state, isPwdValid: state.pwd.trim().length > 6 };
    case "FORM_CHECK":
      return { ...state, isFORMValid: state.isEmailValid && state.isPwdValid };
    default:
      return {
        email: "",
        pwd: "",
        isPwdValid: null,
        isEmailValid: null,
        isFORMValid: null,
      };
  }
};

const Login = props => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    pwd: "",
    isPwdValid: null,
    isEmailValid: null,
    isFormValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch({ type: "FORM_CHECK" });
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [state.pwd, state.email]);

  const inputChangeHandler = (type, val) => {
    dispatch({ type: type, val: val });
  };

  const inputValidateHandler = type => {
    dispatch({ type: type });
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(state.email, state.pwd);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.isEmailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={e => inputChangeHandler("EMAIL_INPUT", e.target.value)}
            onBlur={() => inputValidateHandler("EMAIL_CHECK")}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.isPwdValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.pwd}
            onChange={e => inputChangeHandler("PWD_INPUT", e.target.value)}
            onBlur={() => inputValidateHandler("PWD_CHECK")}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!state.isFORMValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
