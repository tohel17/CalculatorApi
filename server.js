const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var options = {
  type: "application/json",
};
app.use(bodyParser.raw(options));

app.post("/calculate", async (req, res) => {
  try {
    let value;
    let data = Buffer.from(req.body, "base64").toString("ascii");
    data = JSON.parse(data);
    if (data.firstNum && data.secondNum && data.operation) {
      switch (data.operation) {
        case "Addition":
          value = parseFloat(data.firstNum) + parseFloat(data.secondNum);
          break;
        case "Subtract":
          value = parseFloat(data.firstNum) - parseFloat(data.secondNum);
          break;
        case "Multiply":
          value = parseFloat(data.firstNum) * parseFloat(data.secondNum);
          break;
        default:
          value = "No operation defined";
      }
      if (typeof value !== "string") {
        res.json({
          result: true,
          value: value,
        });
      } else {
        res.json({
          result: false,
          value: value,
        });
      }
    } else {
      res.json({
        result: false,
        value: "Numbers not defined properly",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({
      result: false,
      value: "Something went wrong,Please tray again later.",
    });
  }
});
app.get("/", (req, res) => {
  res.send("This is Calculator API.");
});
app.listen(8000, () => {
  console.log("server started on local host and port 8000!");
});
