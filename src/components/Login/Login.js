import React, { useContext, useEffect, useReducer } from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

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

  const ctx = useContext(AuthContext);
  const { isEmailValid, isPwdValid } = state;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("validating");
      dispatch({ type: "FORM_CHECK" });
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [isEmailValid, isPwdValid]);

  const inputChangeHandler = (type, val = null) => {
    dispatch({ type: type, val: val });
  };

  const submitHandler = event => {
    event.preventDefault();
    ctx.onLogin(state.email, state.pwd);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={isEmailValid}
          type="email"
          value={state.email}
          changeHandler={inputChangeHandler}
          inputAction="EMAIL_INPUT"
          blurAction="EMAIL_CHECK"
        />
        <Input
          isValid={isPwdValid}
          type="password"
          value={state.pwd}
          changeHandler={inputChangeHandler}
          inputAction="PWD_INPUT"
          blurAction="PWD_CHECK"
        />
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
