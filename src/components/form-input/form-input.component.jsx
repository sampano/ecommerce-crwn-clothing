import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  // type, required, onChange, name and value properties will be using directly by spreading using ...otherProps
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {/* if otherProps is truthy or it exist then append shrink class other wise append empty string */}
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
