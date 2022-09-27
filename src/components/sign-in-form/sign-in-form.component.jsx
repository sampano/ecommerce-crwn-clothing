import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defualtFormFields = {
  email: "",
  password: "",
}; // defaultFormFields value will be the value of useState which is the defalt value of formFields

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { email, password } = formFields; // desctructure formFields value

  // reset form fields
  const resetFormFields = () => {
    setFormFields(defualtFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup(); //desctructure off response
    await createUserDocumentFromAuth(user);
  };

  const handleSumbmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
      // if (error.code === "auth/wrong-password") {
      //   alert("incorrect password for email");
      // }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value }); // spread the object using ...formFields
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSumbmit}>
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
        <div className="buttons-container">
          <Button buttonType="default" type="submit">
            Sign In
          </Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google sign in
          </Button>
          {/* when this button is click the onSubmit callback will run */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
