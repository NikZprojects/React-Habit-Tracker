const router = require("express").Router();

const { OAuth2Client } = require("google-auth-library");
const keys = require("../oauth2keys_copy.json").web;

router.route("/").post((req, res) => {
  const token = req.body.id_token;
  console.log(token);
  const client = new OAuth2Client(keys.client_id);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: keys.client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
  }
  verify().catch(console.error);
});

module.exports = router;
