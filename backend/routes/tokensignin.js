const router = require("express").Router();
let User = require("../models/user.model");

const { OAuth2Client } = require("google-auth-library");
const keys = require("../oauth2keys_copy.json").web;

router.route("/").post((req, res) => {
  const token = req.body.id_token;
  const client = new OAuth2Client(keys.client_id);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: keys.client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    User.find().then((users) => {
      let user = users.find((user) => user.userid === userid);
      if (user) {
        res.json(user);
      } else {
        const name = payload["name"];
        const email = payload["email"];
        const picture = payload["picture"];
        const habitData = userid;

        const newUser = new User({
          userid,
          name,
          email,
          picture,
          habitData,
        });

        newUser.save().then((user) => {
          res.json(user);
        });
      }
    });
  }
  verify().catch(console.error);
});

module.exports = router;
