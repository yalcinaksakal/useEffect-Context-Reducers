import classes from "./Input.module.css";

const Input = props => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.type}>{props.type.toUpperCase()}</label>
      <input
        type={props.type}
        id={props.type}
        value={props.value}
        onChange={e => props.changeHandler(props.inputAction, e.target.value)}
        onBlur={() => props.changeHandler(props.blurAction)}
      />
    </div>
  );
};

export default Input;
