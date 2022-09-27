import { Fragment, useContext } from "react"; // its a component that renders nothing when get mounted in the dom
import { Outlet, Link } from "react-router-dom"; // telling where we want react-router-dom to render the nested matching element
//Link component approriately and dynamically uses the correct browser that we installed which in this case BrowserRouter in App.js

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"; // importing logo as a component
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext); //useContext as a hook tells the userContext component whenever a value use in userContext update re-render this component
  //as long as the component is hook into useContext it will re-render
  const { isCartOpen } = useContext(CartContext);

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
          {/* if there is currentUser then show SIGN OUT if currentUser does not exist show SIGN IN */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              {/*  to property is telling the link where you wanna go */}
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
        {/* && short circuit operator try to evaluate the truthyness  */}
      </div>
      <Outlet /> {/*{outlet will render the child element of route} */}
    </Fragment>
  );
};

export default Navigation;
