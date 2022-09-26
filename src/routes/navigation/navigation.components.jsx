import { Fragment } from "react"; // its a component that renders nothing when get mounted in the dom
import { Outlet, Link } from "react-router-dom"; // telling where we want react-router-dom to render the nested matching element
//Link component approriately and dynamically uses the correct browser that we installed which in this case BrowserRouter in App.js
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; // importing logo as a component
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            {/*  to property is telling the link where you wanna go */}
            SHOP
          </Link>

          <Link className="nav-link" to="/auth">
            {/*  to property is telling the link where you wanna go */}
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet /> {/*{outlet will render the child element of route} */}
    </Fragment>
  );
};

export default Navigation;
