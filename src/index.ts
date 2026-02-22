import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { setBaseUrl } from "./modules/products/data/index";

// Init
export const app = express();
const port = 3000;
const host = process.env.HOST || "localhost";
const protocol = process.env.PROTOCOL || "http";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure product image base URL
setBaseUrl(`${protocol}://${host}:${port}`);

// Serve static images
app.use("/images", express.static(path.join(__dirname, "modules", "products", "data", "images")));


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
