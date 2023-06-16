import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Order from "./components/Order";
import Admin from "./components/Admin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { role: currentRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const ProtectedRoute = ({ isAllowed, redirectPath = "/home" }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Order App
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser && currentRole === 2 && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Manager Orders
                </Link>
              </li>
            </div>
          )}
          {currentUser && currentRole === 1 && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/order"} className="nav-link">
                  Order
                </Link>
              </li>
            </div>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            element={
              <ProtectedRoute isAllowed={!!currentRole && currentRole === 2} />
            }
          >
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route
            element={
              <ProtectedRoute isAllowed={!!currentRole && currentRole === 1} />
            }
          >
            <Route path="/order" element={<Order />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
