const connection = require("../connection");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    var response = { status: true, message: "" };
    // console.log(req.body);

    var rawTravelingDate = new Date(req.body.travelingDate);
    travelingDate =
      rawTravelingDate.getFullYear() +
      "-" +
      rawTravelingDate.getMonth() +
      "-" +
      rawTravelingDate.getDate();

    var rawEnquiryDate = new Date(req.body.enquiryDate);
    enquiryDate =
      rawEnquiryDate.getFullYear() +
      "-" +
      rawEnquiryDate.getMonth() +
      "-" +
      rawEnquiryDate.getDate();
    // let travelingDate = JSON.stringify(rawTravelingDate);
    // travelingDate = travelingDate.slice(1, 11);

    // var rawEnquiryDate = new Date(req.body.enquiryDate);
    // let enquiryDate = JSON.stringify(rawEnquiryDate);
    // enquiryDate = enquiryDate.slice(1, 11);

    // console.log(travelingDate);
    // console.log(enquiryDate);

    console.log(req.body.user_id);
    console.log(req.body.numberOfSeats);
    console.log(req.body.modeOfTransport);
    console.log(req.body.locationFrom.value);
    console.log(req.body.locationTo.value);
    console.log(travelingDate);
    console.log(enquiryDate);

    connection.query(
      "CALL SP_INSERT_ENQUIRY_DATA(?,?,?,?,?,?,?,@enquiryId) ; SELECT @enquiryId",
      [
        // req.body.customerName,
        // req.body.email,
        // req.body.mobile,
        // req.body.address,
        req.body.user_id,
        req.body.numberOfSeats,
        req.body.modeOfTransport,
        req.body.locationFrom.value,
        req.body.locationTo.value,
        travelingDate,
        enquiryDate,
      ],
      function (error, result) {
        console.log(result);

        // if (result[1][0]["@enquiryId"] !== 0) {
        //   response.status = true;
        //   response.message = "Enquiry Submitted.";
        //   response.data = null;
        //   res.send(JSON.stringify(response));
        // } else {
        //   response.status = false;
        //   response.message = "Enquiry Submission Fail.";
        //   response.data = null;
        //   res.send(JSON.stringify(response));
        // }
      }
    );
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/list", async (req, res, next) => {
  try {
    var response = { status: true, message: "" };
    connection.query(
      "SELECT * FROM tbl_ModeOfTransport ORDER BY mode_id",
      function (error, result) {
        if (error) {
          console.log(error);
        } else {
          if (result.length === undefined || result[0].length === 0) {
            response.status = false;
            response.message = "No Record Found For You.";
            response.data = null;
            res.send(JSON.stringify(response));
          } else {
            response.status = true;
            response.message = "Enquiries Found.";
            response.data = result;
            res.send(JSON.stringify(response));
          }

          //   console.log(result);
        }
      }
    );
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/list/:id", async (req, res, next) => {
  try {
    var response = { status: true, message: "" };
    connection.query(
      "CALL SP_GET_ENQUIRY_LIST_BY_CUSTOMER_ID(?)",
      [req.params.id],
      function (error, result) {
        if (error) {
          console.log(error);
        } else {
          if (result.length === undefined || result[0].length === 0) {
            response.status = false;
            response.message = "No Record Found For You.";
            response.data = null;
            res.send(JSON.stringify(response));
          } else {
            response.status = true;
            response.message = "Enquiries Found.";
            response.data = result[0];
            res.send(JSON.stringify(response));
          }
        }
      }
    );
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
