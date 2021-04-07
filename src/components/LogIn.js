import React from "react";

export const LogIn = ({ setLoggedIn }) => {
  function onSuccess(googleUser) {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
    setLoggedIn(true);
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    window.gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  }

  renderButton();
  return (
    <div className="wrapper">
      <h1> React Habit Tracker </h1>
      <div className="signInBox">
        <h3> Sign in to keep track of your habits: </h3>

        <center>
          <div id="my-signin2"></div>
        </center>

        <br></br>
        <button className="buttonLink" onClick={() => setLoggedIn(true)}>
          ...or try it out as a guest
        </button>
      </div>
    </div>
  );
};
