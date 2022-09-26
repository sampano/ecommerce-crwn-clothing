import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.components";
import Authentication from "./routes/authentication/authentication.component.jsx";

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* index attribute tells route when the link matches the parent path then render chil Home component */}
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        {/* {/> when the path is equals to /home its gonna render the element in this case Home component} */}
      </Route>
    </Routes>
  );
};

export default App;
