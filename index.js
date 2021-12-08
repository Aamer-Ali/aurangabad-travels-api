const express = require("express");
const cors = require("cors");
const enquiry = require("./routes/enquiry");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/enquiry", enquiry);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.listen(3000);
