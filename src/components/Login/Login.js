import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const pwdReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = props => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  // const [consolMsg, setConsolMsg] = useState("");

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [pwdState, dispatchPwd] = useReducer(pwdReducer, {
    value: "",
    isValid: null,
  });
  // side effect function
  //if no dependency is given useEffect will run on each render
  // if [] is given as dependency useEffect will run just only on first render
  //[some variables] if one of dependent variable changes
  useEffect(() => {
    // setConsolMsg(prevState => prevState + "EFFECT running\n");
    console.log("Use Effect");
    const identifier = setTimeout(() => {
      // setConsolMsg(prevState => prevState + "checking validity\n");
      console.log("validating");
      setFormIsValid(emailState.isValid && pwdState.isValid);
    }, 500);
    // anonymous clean up function
    return () => {
      // setConsolMsg(prevState => prevState + "clearing timeout\n");
      clearTimeout(identifier);
    };
  }, [emailState, pwdState]);

  const emailChangeHandler = event => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    dispatchPwd({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPwd({ type: "INPUT_BLUR" });
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(emailState.value, pwdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pwdState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>

      {/* <p>{consolMsg}</p> */}
    </Card>
  );
};

export default Login;
