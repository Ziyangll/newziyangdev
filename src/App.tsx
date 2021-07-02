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
            <div className='btn'>Z</div>
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
      <h2>Blog</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Blog page has its own <Switch> with more routes
          that build on the /blog URL path. You can think of the
          2nd <Route> here as an "index" page for all blogs, or
          the page that is shown when no blog is selected */}
      <Switch>
        <Route path={`${match.path}/:blogId`}>
          <Blog />
        </Route>
        <Route path={match.path}>
          <h3>My blogs</h3>
        </Route>
      </Switch>
    </div>
  );
}
