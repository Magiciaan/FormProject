import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import routes from "../routes/v1/index";

const app = express();
app.use(cors()); // allows requests from all IPs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("UploadedFiles"));

app.use(routes);

app.listen(process.env.PORT, () => console.log("server running on port 3000"));
