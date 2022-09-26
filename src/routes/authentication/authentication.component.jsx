import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";
import { async } from "@firebase/util";

const Authentication = () => {
  //user will use signWithGoogleRedirect, after choosing google user when the user comeback
  //application will remount and on mount useEffect will run once
  //inside call back will get the response for getRedirectResult
  //redirect happen based on the auth component
  // useEffect(() => {
  //   async function funcResponse() {
  //     const response = await getRedirectResult(auth);
  //     console.log(response.user);
  //     if (response) {
  //       createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   funcResponse();
  //   //if the response.user is null create user
  // }, []);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
