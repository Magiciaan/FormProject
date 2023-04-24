import bodyParser from "body-parser";
import express from "express";

import routes from "../routes/v1/index";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.listen(process.env.PORT, () => console.log("server running on port 3000"));
