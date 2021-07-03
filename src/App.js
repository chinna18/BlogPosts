import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './style.css';
import About from './About';
import Posts from './Posts';
import Home from './Home';
import ViewPost from './ViewPost';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid jumbotron">
        <nav className="navbar navbar-dark bg-light">
          <Link to="/home" className="btn btn-primary">
            Home
          </Link>

          <Link to="/posts" className="btn btn-primary">
            Posts
          </Link>

          <Link to="/about" className="btn btn-primary">
            About
          </Link>
        </nav>
      </div>

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/posts" component={Posts} />
        <Route path="/posts/edit/:1" component={Posts} />
        <Route exact path="/posts/view/:id" component={ViewPost} />
      </Switch>
    </BrowserRouter>
  );
}
