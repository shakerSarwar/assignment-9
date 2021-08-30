import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Compoent/Home/Home'
import LogIn from './Compoent/LogIn/LogIn'
import Header from './Compoent/Header/Header'
import Destination from './Compoent/Destination/Destination'
import Blog from './Compoent/Blog/Blog'
import Contact from './Compoent/Contact/Contact'
import NoMatch from './Compoent/NoMatch/NoMatch'
import { createContext, useState } from 'react';
import PrivateRoute from './Compoent/PrivateRoute/PrivateRoute'
export const userContext = createContext();


function App() {
  const [logedInUser, setLogedInUser] = useState({})
  return (
    <userContext.Provider value={[logedInUser, setLogedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <PrivateRoute path="/destination/:typeOfRides/">
            <Destination />
          </PrivateRoute>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
