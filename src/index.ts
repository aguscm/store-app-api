import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Init
export const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Start point
app.get("/", function (req, res) {
  let response = {
    error: false,
    code: 200,
    message: "API REST working",
  };
  res.status(response.code).send(response);;
});

// Routes
require("./routes")(app);

// Listen port
app.listen(port, () => {
  console.log("Server started. Port 3000");
});
