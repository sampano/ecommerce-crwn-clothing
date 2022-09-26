import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defualtFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}; // defaultFormFields value will be the value of useState which is the defalt value of formFields

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { displayName, email, password, confirmPassword } = formFields; // desctructure formFields value

  // reset form fields
  const resetFormFields = () => {
    setFormFields(defualtFormFields);
  };

  const handleSumbmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value }); // spread the object using ...formFields
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an accont?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSumbmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType="default" type="submit">
          Sign Up
        </Button>
        {/* when this button is click the onSubmit callback will run */}
      </form>
    </div>
  );
};

export default SignUpForm;
