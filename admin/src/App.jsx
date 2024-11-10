import { React, useState, useEffect } from "react";
import Header from "./components/header/Header";
import Admin from "./templates/admin/Admin";
import LoginSignUp from './templates/admin/login-signup'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div>
      <Header />
      {isAuthenticated ? <Admin /> : <LoginSignUp />}
    </div>
  )
}

export default App;