import React from "react";
const axios = require("axios");

export const LogIn = ({ setLoggedIn }) => {
  function onSuccess(googleUser) {
    //console.log(googleUser.getBasicProfile());
    setLoggedIn(true);
    var id_token = { id_token: googleUser.getAuthResponse().id_token };
    console.log("test");

    axios
      .post("https://localhost:5000/tokensignin", id_token)
      .then((res) => console.log(res.data));
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
