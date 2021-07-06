import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Resume from "./Pages/Resume";
import Blog from "./Pages/Blog";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <div className='header'>
          <Link to='/'>
            <div className='btn z-icon'>Z</div>
          </Link>
          <div className='header-right'>
            <Link to='/about'>
              <div className='btn'>About</div>
            </Link>
            <Link to='/resume'>
              <div className='btn'>Resume</div>
            </Link>
            <Link to='/blog'>
              <div className='btn'>Blog</div>
            </Link>
          </div>
        </div>

        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/resume'>
            <Resume />
          </Route>
          <Route path='/blog'>
            <Blogs />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Blogs() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:blogId`}>
          <div className='page-container'>
            <Link className='button' to={`${match.url}`}>
              &#60; &#60; &#60; &#60; &#60; &#60; &#60;
            </Link>
            <Blog />
          </div>
        </Route>
        <Route path={match.path}>
          <div className='page-container'>
            <h3 className='white'>Welcome to my blog!</h3>
            <div className='button blog-link'>
              <Link className='blue' to={`${match.url}/components`}>
                Components
              </Link>
            </div>
            <div className='button blog-link'>
              <Link className='blue' to={`${match.url}/props-v-state`}>
                Props v. State
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
