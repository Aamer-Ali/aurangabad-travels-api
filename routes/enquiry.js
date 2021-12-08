const connection = require("../connection");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.send("DataTransfer success.");
    // var d = new Date(req.body.travelingDate.toString());
    // console.log(d.getDate()); //
    // console.log(d.getMonth()); //
    // console.log(d.getFullYear());
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
