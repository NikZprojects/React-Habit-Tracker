import React from "react";
const axios = require("axios");

export const LogIn = ({ setUser }) => {
  function onSuccess(googleUser) {
    var id_token = { id_token: googleUser.getAuthResponse().id_token };

    axios
      .post("https://www.nikzprojects.com/apis/tokensignin", id_token)
      .then((res) => setUser(res.data));
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
        <button className="buttonLink" onClick={() => setUser("guest")}>
          ...or try it out as a guest
        </button>
      </div>
    </div>
  );
};
