const connection = require("../connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login_user", async (req, res) => {
  try {
    var response = { status: true, message: "" };
    var storeProcedure = "";
    if (req.body.userType === 1) {
      storeProcedure = "CALL LOGIN_USER_BY_USERNAME_AND_PASSWORD(?,?)";
    } else if (req.body.userType === 2) {
      storeProcedure = "CALL SP_LOGIN_CUSOMER_BY_USERNAME_PASSWORD(?,?)";
    }
    // console.log(storeProcedure);
    // console.log(req.body);

    connection.query(
      storeProcedure,
      [req.body.username, req.body.password],
      function (error, result) {
        if (error) {
          console.log(error);
        } else {
          if (result.length === undefined || result[0].length === 0) {
            response.status = false;
            response.message = "No user found with this credentials.";
            response.data = null;
            res.send(JSON.stringify(response));
          } else {
            const token = jwt.sign(
              req.body.userType === 2
                ? { ...result[0][0], role_id: 0, role_name: "Customer" }
                : result[0][0],
              "jwtPrivateKey"
            );
            response.status = true;
            response.message = "Welcome User.";
            response.data = token;
            res.send(JSON.stringify(response));
          }
        }
      }
    );
  } catch (exceptionError) {
    console.log(exceptionError);
  }
});

module.exports = router;
