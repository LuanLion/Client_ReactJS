import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { DoctorDetail } from "./Homepage/Center/DoctorDetail";
// import Booking from "./Homepage/Center/Booking";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./LAR/Login";
// import Header from "./System/Header/Header";
import System from "../routes/System";

import CustomScrollbars from "../components/CustomScrollbars";

import HomePage from "./Homepage/HomePage.js";
import LoginClient from "./Homepage/Center/LoginClient";
// import CustomToastCloseButton from "../components/CustomToast";

// import ConfirmModal from "../components/ConfirmModal";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* <ConfirmModal /> */}
            <span className="content-container">
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DOCTOR} exact component={DoctorDetail} />
                  {/* <Route path={path.BOOKING} exact component={Booking} /> */}
                  <Route
                    path={path.LOGINCLIENT}
                    exact
                    component={LoginClient}
                  />
                </CustomScrollbars>
              </Switch>
            </span>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
