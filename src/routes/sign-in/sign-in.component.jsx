import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";

const SignIn = () => {
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
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup(); //desctructure off response
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
