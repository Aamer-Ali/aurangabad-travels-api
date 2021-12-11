const connection = require("../connection");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.send("DataTransfer success.");
    console.log(req.body.travelingDate.toISOString());
    // var d = new Date(req.body.travelingDate.toString());
    // console.log(d.getDate()); //
    // console.log(d.getMonth()); //
    // console.log(d.getFullYear());
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/list", async (req, res, next) => {
  try {
    connection.query("CALL SP_GET_ENQUIRY_LIST()", function (error, result) {
      if (error) {
        console.log(error);
      } else {
        res.send(JSON.stringify(result[0]));
        console.log(result[0]);
      }
    });
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;

// }
// {
//   customerName: 'Aamer Ali Sayyed',
//   email: 'aamer@gmail.com',
//   mobile: '9028030984',
//   address: 'Kat Kat Gate',
//   numberOfSeats: 1,
//   modeOfTransport: 3,
//   locationTo: { value: 3, name: 'Pune' },
//   locationFrom: { value: 1, name: 'Aurangabad' },
//   travelingDate: '2021-12-17T18:30:00.000Z',
//   enquiryDate: '2021-12-11T12:47:50.799Z'
// }
